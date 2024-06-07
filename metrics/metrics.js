const express = require("express");
const client = require("prom-client");
const logger = require("../logger/logger.js");

const app = express();
const port = 9100;

// Histograms
const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});

// Metrics server
function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-type", client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(port, () => {
    logger.info(`Metrics server running on port: ${port}`);
  });
}

module.exports = {
  startMetricsServer,
  restResponseTimeHistogram,
  databaseResponseTimeHistogram,
};
