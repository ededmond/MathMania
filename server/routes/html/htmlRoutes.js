const router = require('express').Router();

/////register page//////
module.exports = (db) => {
    router.get('/register', (req, res) => {
      if (req.isAuthenticated()) {
        res.redirect('/profile');
      } else {
        res.render('register');
      }
    });
  
////authenticated user///////
    router.get('/profile', (req, res) => {
      if (req.isAuthenticated()) {
        db.User.findOne({
          where: {
            id: req.session.passport.user.id
          }
        }).then(() => {
          const user = {
            userInfo: req.session.passport.user,
            isloggedin: req.isAuthenticated()
          };
          // console.log(user);
          res.render('profile', user);
        });
      } else {
        res.redirect('/');
      }
    });
  
/////home page///////    
    router.get('/', (req, res) => {
      if (req.isAuthenticated()) {
        const user = {
          user: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render('dashboard', user);
      } else {
        res.render('dashboard');
      }
    });

/////game page///////
  

 
/////user log out page////////
    router.get('/logout', (req, res, next) => {
      req.logout();
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.clearCookie('connect.sid', { path: '/' });
        res.redirect('/');
      });
    });
  
/////////////teachers page/////////////








  
    return router;
  };
  