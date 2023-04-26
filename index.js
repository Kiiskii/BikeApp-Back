const express = require("express");
const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World! I am fat.");
});

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.set("strictQuery", false);

const url = process.env.mongoURL;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const journeysSchema = new mongoose.Schema({
  Departure: String,
  Return: String,
  DepartureStationId: Number,
  DepartureStationName: String,
  ReturnStationId: Number,
  ReturnStationName: String,
  CoveredDistance: Number,
  Duration: Number,
});

const Journey = mongoose.model("Journeys", journeysSchema);

// journeysSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/journeys", async (req, res) => {
  const journeys = await Journey.find({}).limit(5);
  return res.status(200).json(journeys);
});

app.listen(3000, function () {
  console.log("App is running on Port 3000");
});
