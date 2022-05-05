const express = require('express');
const path = require('path')
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();


//setup ejs and view location
app.set("view engine", "ejs");
app.set('views',path.join(__dirname,"../templates"))


//setup statsis directory
app.use(express.static("public"));

app.get('/', (req,res)=>{
  res.render('index',{
    title: "weather",
    name: "riddhi",
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});





app.listen(3000,()=>console.log("server is running"))


