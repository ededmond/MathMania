const router = require("express").Router();
const questionController = require("../../controllers/questionController");

//Matches with 'api/questions'- posting calls to math.ly and then retrieving from our own api
router.route('/')
  .post(questionController.create)
  

module.exports = router;
