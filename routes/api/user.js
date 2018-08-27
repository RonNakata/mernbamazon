const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../passport/passport");
const db = require("../../models");



// Matches with "api/user"
router
  .route("/user")
  // .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/user/:id"
// router
//   .route("/:id")
//   .get(userController.findById)
//   .put(userController.update)
//   .delete(userController.remove);

// Matches with "api/signup"
router.post("/signup", (req, res) => {
  db.User.create(req.body)
    .then((results) =>{
      res.json("/login");
    })
});

// Matches with "api/login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

// Matches with "api/logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Matches with "api/getUser
router.get("/getUser", (req, res) => {
  if(req.user){
    res.json({ user: req.user });
  }else{
    res.json({user: null })
  }
});
module.exports = router;
