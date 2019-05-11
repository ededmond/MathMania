const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  getStudents: (req,res,next) => {
    if (req.user) {
      db.User.find({'teacherCode':req.user._id},(err,students) => {
        if (err) {
          res.json(err);
        } else {
          res.json(students);
        }
      })
    }
  },
  grade:(req,res) => {
    const difficulty = req.body.difficulty;
    const correct = req.body.correct;
    const grades = {};
    grades[difficulty] = {
      correct: correct ? req.user.grades[difficulty].correct + 1 : req.user.grades[difficulty].correct,
      total : req.user.grades[difficulty].total + 1
    }
    db.User.findByIdAndUpdate(req.user._id,{
      grades
    }).then(response => {
      res.json(response);
    }).catch(error => {
      console.log(error);
      res.json(error);
    })
  },
  register: (req, res) => {
    const { firstName, lastName, username, password, email,teacherCode,teacher} = req.body;
    // ADD VALIDATION
    db.User.findOne({ 'username': username }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `Sorry, already a user with the username: ${username}`
        });
      }
      const newUser = new db.User({
        'firstName': firstName,
        'lastName': lastName,
        'username': username,
        'password': password,
        'email': email,
        'teacherCode':teacherCode,
        'isTeacher':teacher === "teacher"
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    });
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
		console.log(req.body);
		console.log('================');
		next();
  },
  authenticate: (req, res) => {
		console.log('POST to /login');
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
	}
};