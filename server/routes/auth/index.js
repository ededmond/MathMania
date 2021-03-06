module.exports = io => {
const express = require('express');
const router = express.Router();
const passport = require('../../passport');
const userController = require("../../controllers/userController")(io);

// this route is just used to get the user basic info
router.get('/user', userController.getUser)
router.get('/students',userController.getStudents);
router.post('/students/:id',userController.changeLevel);
router.post('/grades',userController.grade);
router.post('/login', userController.auth, passport.authenticate('local'), userController.authenticate);
router.post('/logout', userController.logout);
router.post('/signup', userController.register);

 return router;

}