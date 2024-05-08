const express = require("express");
const bodyParser = require("body-parser");
const { routerUser } = require('./routes/routerUser');
const connectToDatabase = require('./database-config/dbConfig');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

app.use("/", routerUser);

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`App running on port: ${port}`);
    });
  } catch (err) {
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}

startServer()
