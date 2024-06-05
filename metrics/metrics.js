const express = require("express");
const client = require("prom-client");
const logger = require("../logger/logger.js");

const app = express();
const port = 9100;

function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics

  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-type", client.register.contentType);

    return res.send(await client.register.metrics());
  })

  app.listen(port, () => {
    logger.info(`Metrics server running on port: ${port}`);
  });
}

module.exports = { startMetricsServer };