const express = require("express");
const bodyParser = require("body-parser");
const { routerUser } = require("./routes/routerUser");
const { startMetricsServer } = require("./metrics/metrics.js");
const connectToDatabase = require("./database-config/dbConfig");
const logger = require("./logger/logger.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/health-check", (req, res) => {
  logger.info("Health check OK");
  res.status(200).send("OK");
});

app.use("/", routerUser);

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      logger.info(`App running on port: ${port}`);

      startMetricsServer(); // metrics server
    });
  } catch (err) {
    logger.error(err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}

startServer();