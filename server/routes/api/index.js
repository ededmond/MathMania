const router = require("express").Router();
const bookRoutes = require("./books");
const questionRoutes = require("./questions");

// Book routes
router.use("/books", bookRoutes);
router.use("/questions", questionRoutes);

module.exports = router;
