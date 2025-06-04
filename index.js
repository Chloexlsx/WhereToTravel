import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  
  try {
    //Fetch
    const URL = `https://restcountries.com/v3.1/region/asia`;
    const response = await axios.get(URL);
   
    //Get random country
    const list = response.data;
    const idx = Math.floor(Math.random() * list.length);
    const countryObj = list[idx];
    const country = countryObj.name.common;
    const capital =countryObj.capital[0];
    const languagekey = Object.keys(countryObj.languages || {})[0];
    const language = countryObj.languages[languagekey];
    const currencyKey = Object.keys(countryObj.currencies || {})[0];
    const currency = countryObj.currencies[currencyKey].name;
    console.log(country);
    console.log(capital);
    console.log(language);
    console.log(currency);
    const countryData = {country, capital, language, currency};

    //Render
    res.render("index.ejs", { data: countryData });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  
  }});

app.post("/", async (req, res) => {
  console.log(req.body);
  console.log(req.body.type);
  try {
    //Fetch
    var userRegion = req.body.type;
    const URL = `https://restcountries.com/v3.1/region/${userRegion}`;
    const response = await axios.get(URL);
   
    //Get random country
    const continent = req.body.type.slice(0, 1).toUpperCase() + req.body.type.slice(1);
    const list = response.data;
    const idx = Math.floor(Math.random() * list.length);
    const countryObj = list[idx];
    const country = countryObj.name.common;
    const capital =countryObj.capital[0];
    const languagekey = Object.keys(countryObj.languages || {})[0];
    const language = countryObj.languages[languagekey];
    const currencyKey = Object.keys(countryObj.currencies || {})[0];
    const currency = countryObj.currencies[currencyKey].name;
    console.log(country);
    console.log(capital);
    console.log(language);
    console.log(currency);
    const countryData = {continent, country, capital, language, currency};

    //Render
    res.render("index.ejs", { data: countryData });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
