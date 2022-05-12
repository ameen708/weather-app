const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define path for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partial");

//Setup static directory to serve
app.use(express.static(publicDirPath));

//Setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ameen",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "ameen",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ameen",
    email: "ameenullah708@gmail.com",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "No address is mention for forecast" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          address: req.query.address,
          forecast: forecastData,
          location,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "your query search term is not specified",
    });
  }

  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404 Page",
    message: "Help article not found",
    name: "ameen",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404 Page",
    message: "The page is not found",
    name: "Ameen",
  });
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
