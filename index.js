const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");
const res = require("express/lib/response");

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

app.get("/api/search/:searchquery", (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const offset = (page - 1) * PAGINATION_PAGELIMIT;
  const search = request.params.searchquery.toLowerCase();
  pool.query(
    "SELECT * FROM stations WHERE (LOWER(nimi) LIKE $1 OR LOWER(namn) LIKE $1 OR LOWER(name) LIKE $1) ORDER BY id ASC OFFSET $2 LIMIT $3",
    [`%${search}%`, offset, PAGINATION_PAGELIMIT],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
});

app.get("/api/details/:detailsid", async (request, response) => {
  const id = request.params.detailsid;
  const stationsResult = await pool.query(
    "SELECT * FROM stations WHERE fid = $1",
    [id]
  );
  const stationname = stationsResult.rows[0].nimi;

  const departureCountResult = await pool.query(
    "SELECT count(*) FROM journeys WHERE departure_station_name = $1",
    [stationname]
  );
  const returnCountResult = await pool.query(
    "SELECT count(*) FROM journeys WHERE return_station_name = $1",
    [stationname]
  );

  const stations = stationsResult.rows;
  const departurecount = departureCountResult.rows[0].count;
  const returncount = returnCountResult.rows[0].count;

  console.log(stations);
  console.log(departurecount);
  console.log(returncount);

  response.status(200).json({ stations, departurecount, returncount });
});

// app.get("/api/details/:detailsid", (request, response) => {
//   const id = request.params.detailsid;
//   console.log(id);
//   pool.query("SELECT * FROM stations WHERE fid = $1", [id], (error, result) => {
//     if (error) {
//       throw error;
//     }
//     let stationName = result.rows[0].nimi;
//     console.log(stationName);
//     response.status(200).json(result.rows);
//   });
//   pool.query(
//     "SELECT count(*) FROM journeys WHERE departure_station_name = $1",
//     [stationName],
//     (error, result) => {
//       if (error) {
//         throw error;
//       }
//       const count = result.rows;
//       console.log(count);
//       response.status(200).json(count);
//     }
//   );
// });

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
