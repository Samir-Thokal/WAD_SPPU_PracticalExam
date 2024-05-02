const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./schema");
// const dbConfig = require("./config");
// const config = require("./config");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })``
  .catch(() => {
    console.log("Could not connect to database", err);
    process.exit();
  });

app.use("/css", express.static(path.resolve(__dirname, "static/css")));
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/addmarks", (req, res) => {
  var myData = new Student(req.body);
  myData.save()
    .then((item) => {
      console.log("item saved to database");
      res.redirect("/getMarks");
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});
app.get("/getMarks", (req, res) => {
  console.log(req.query);
  Student.find(req.query)
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});
app.get("/dsbdaGreaterThan20", (req, res) => {
  Student.find({ dsbda_marks: { $gt: 20 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});
app.get("/wadgreterthan40",(req,res)=>{
    Student.find({wad_marks: {gtr:40}})
    .then((student)=>{
        res.render("table",{student:student})
    })
    .catch((err)=>{
        res.send("err")
    })
});
app.post("/deletestudent/:id",(req,res)=>{
    Student.findByIdAndDelete(req.params.id).then((student)=>{
        console.log("Deleted succesfully")
        res.redirect("/getmarks")
    })
});
app.listen(3000,(req,res)=>{
    console.log("Server listining on port 3000")
});

