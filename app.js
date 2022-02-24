const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const globalTo = "";
var globalAmount;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home");
});

app.post("/", function(req,res){
  const from = req.body.from.toLowerCase();
  const to = req.body.to.toLowerCase();
  const amount = req.body.amount;
  var globalAmount = amount;
  const globalTo = to;
  const baseURL1 = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
  const baseURL2 = "/";
  const baseURL3 = ".json";
  const finalURL = baseURL1 + from + baseURL2 + to + baseURL3;
  request(finalURL, function(error, response, body){
    const code = response.statusCode;
    if(error){
      res.render("failure", {code: code});
    }if(code!=200){
      res.render("failure", {code: code});
    }else{
      const data = JSON.parse(body);
      const date = data.date;
      const value = data[globalTo];
      const total = globalAmount*parseFloat(value);
      res.render("result", {date: date, value: value, total: total});
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.post("/result", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
