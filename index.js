const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "bikeapp",
  password: "postgres",
  port: 5432,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extneded: true,
  })
);
app.get("/api/journeys", (request, response) => {
  pool.query(
    "SELECT * FROM journeys FETCH FIRST 15 ROWS ONLY",
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
});

app.get("/api/stations", (request, response) => {
  pool.query(
    "SELECT * FROM stations FETCH FIRST 8 ROWS ONLY",
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
