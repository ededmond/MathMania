const router = require("express").Router();
const questionRoutes = require("./questions");

// Book routes
router.use("/questions", questionRoutes);

module.exports = router;
