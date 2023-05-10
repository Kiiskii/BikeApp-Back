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

const PAGINATION_PAGELIMIT = 10;

app.get("/api/journeys", (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const offset = (page - 1) * PAGINATION_PAGELIMIT;
  pool.query(
    "SELECT * FROM journeys ORDER BY id ASC OFFSET $1 LIMIT $2",
    [offset, PAGINATION_PAGELIMIT],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
});

app.get("/api/journeycount", (request, response) => {
  pool.query(
    "SELECT count(*) AS exact_count FROM journeys",
    (error, result) => {
      if (error) {
        throw error;
      }
      let pageCount = Math.trunc(
        result.rows[0].exact_count / PAGINATION_PAGELIMIT
      );
      response.status(200).json(pageCount);
    }
  );
});

app.get("/api/stations", (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const offset = (page - 1) * PAGINATION_PAGELIMIT;
  pool.query(
    "SELECT * FROM stations ORDER BY fid ASC OFFSET $1 LIMIT $2",
    [offset, PAGINATION_PAGELIMIT],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
});

app.get("/api/stationcount", (request, response) => {
  pool.query(
    "SELECT count(*) AS exact_count FROM stations",
    (error, result) => {
      if (error) {
        throw error;
      }
      let pageCount = Math.trunc(
        result.rows[0].exact_count / PAGINATION_PAGELIMIT
      );
      response.status(200).json(pageCount);
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
