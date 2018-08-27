const router = require("express").Router();
const userController = require("../../controllers/userController");

const passport = require("../../passport/passport");
const db = require("../../models");

// Matches with "/api/users"
router
  .route("/")
  .post(userController.create);

// Matches with "/api/users/:id"
// router
//   .route("/:id")
//   .get(userController.findById)
//   .put(userController.update)
//   .delete(userController.remove);

// Matches with "api/users/signup"
router.post("/signup", (req, res) => {
  db.User.create(req.body)
    .then((results) =>{
      res.json("/login");
    })
});

// Matches with "api/users/login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

// Matches with "api/users/logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Matches with "api/users/getUser
router.get("/getUser", (req, res) => {
  if(req.user){
    res.json({ user: req.user });
  }else{
    res.json({user: null })
  }
});

module.exports = router;
