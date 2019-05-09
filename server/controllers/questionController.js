//const db = require("../models");
const axios = require('axios');

module.exports = {
  create: (req, res) => {
    axios.get("https://math.ly/api/v1/arithmetic/fractions.json?difficulty=beginner")
      .then(response => {
        console.log(response.data)
        res.json(response.data)
      })
      .catch(err => res.status(422).json(err));
  },


}

