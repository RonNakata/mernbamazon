const db = require("../models");

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
 
// router.get('/google/callback', 
//     passport.authenticate('google', { 
//       successRedirect: "/", 
//       failureRedirect: '/login' 
//     })
// );
module.exports = {

// router.post("/signup", (req, res) => {
//   db.User.create(req.body)
//     .then((results) =>{
//       res.json("/login");
//     })
// });
create: function(req, res) {
  db.User
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
},
};

// router.post("/login", passport.authenticate("local"), (req, res) => {
//   res.json({ user: req.user });
// });

// router.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

// router.get("/getUser", (req, res) => {
//   if(req.user){
//     res.json({ user: req.user });
//   }else{
//     res.json({user: null })
//   }
// });

// module.exports = router;