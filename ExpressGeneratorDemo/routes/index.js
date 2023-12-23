var express = require("express");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express: Hello Tarun!!" });
});

router.get("/flash", function(req, res){
  req.flash("flash","This is a Flash Message");
  res.send("Message Created!!")
})

router.get("/check",function(req, res){
  console.log(req.flash("flash"));
  res.send("Check the console");
})


// router.post("/auth", async function (req, res, next) {
//   const username = req.body.username;
//   const password = req.body.password;

//   try {
//     const readUser = await userModel.findOne({ password: password });
//     console.log("Stored Username:", readUser.username);
//     console.log("Entered Username:", username);
//     console.log("Stored Password:", readUser.password);
//     console.log("Entered Password:", password);

//     if (readUser.username == username && readUser.password == password) {
//       console.log(
//         `Received form submission: Username - ${username}, Password - ${password}, Id - ${readUser._id} `
//       );
//       res.render("loggedIn", {
//         message: `Received form submission: Username - ${username}, Password - ${password}, Id - ${readUser._id} `,
//       });
//     } else {
//       console.log("Invalid credentials");
//       res.render("loggedIn", { message: "Invalid credentials" });
//     }
//     // res.send(readUser);
//   } catch (error) {
//     console.error("Error while processing authentication:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;