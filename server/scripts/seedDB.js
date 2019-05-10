const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist-auth");

const studentSeed = [
  {
    name: "Tim",
    email: "tim@gmail.com"
  },
  {
    name: "Andrew",
    email: "Andrew@gmail.com"
  },
  {
    name: "Robert",
    email: "rob@gmail.com"
  },
  {
    name: "Sarah",
    email: "sarah@gmail.com"
  }
];

db.Student
  .remove({})
  .then(() => db.Student.collection.insertMany(studentSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
