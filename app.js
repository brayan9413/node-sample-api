const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
