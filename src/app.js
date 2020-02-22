const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// const defaultGeoData = {
//   longtitude: null,
//   latitude: null,
//   location: null
// };

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Jad Baltaji"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Jad Baltaji"
  });
});

app.get("/Other_Projects", (req, res) => {
  res.render("Other_Projects", {
    Projects: "Visit my portfolio site for other projects!",
    title: "Other Projects",
    name: "Jad Baltaji",
    email:"jad_mohammad@hotmail.com"
  });
});

app.get("/weather", (req, res) => {
  address = req.query.search;
  if (!address) {
    return res.send({
      error: "Please enter address."
    });
  }

  geocode(address, (error, {latitude,longtitude,location}={}) => {
    //DESTRUCTURED DATA
    // const { latitude, longtitude, location } = geoData;
    if (error) {
      return res.send({
        error
      });
    }

    forecast(latitude, longtitude, (error, foreCastData) => {
      if (error) {
        return res.send({
          error: "error"
        });
      }
      res.send({
        forecast: foreCastData,
        location,
        address: address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jad Baltaji",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jad Baltaji",
    errorMessage: "Page not found."
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
