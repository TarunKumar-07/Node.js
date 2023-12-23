var express = require("express");
var router = express.Router();

const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/create", async function (req, res) {
  const userData = await userModel.create({
    username: "Taruna",
    password: "passpass",
    nickname: "TarunaExplorer",
    description: "Adventurous coder from India",
    category: [
      "html",
      "css",
      "javascript",
      "react",
      "node.js",
      "express.js",
      "mongoDB",
    ],
  });
  res.send(userData);
});

router.get("/findAll", async function (req, res) {
  const allUsers = await userModel.find();
  res.send(allUsers);
});

// 1. How can I perform a case-insensitive search in Mongoose?
/* 
var regex = new RegExp(search, flag)
^ - start with example: ^t, output: all the strings start with t like, 'Tiger'
$ - end with example: t$, output: all the strings end with t like, 'Start'
if you use both at a time like, ^tarun$  then it always find "tarun" nothing else, because tarun statr with tarun and end's with tarun.
*/
router.get("/caseFind", async function (req, res) {
  var regex = new RegExp("^tArUn$", "i");
  const user = await userModel.find({ username: regex }); // return array of objects
  // const user = await userModel.findOne({ username: regex }); // return one object
  res.send(user);
});

// 2. How do I find documents where an array field contains all of a set of values?
router.get("/category", async function (req, res) {
  // const users = await userModel.find({category: {$all: ["python"]}});
  const users = await userModel.find({
    category: { $all: ["html", "javascript"] },
  });
  res.send(users);
});

// 3. How can I search for documents with a specific date range in Mongoose?
router.get("/btwDate", async function (req, res) {
  // var date = new Date('YYYY-MM-DDTHH:MM:SSZ')
  var date1 = new Date("2023-12-14");
  var date2 = new Date("2023-12-15");
  let users = await userModel.find({ creation: { $gte: date1, $lte: date2 } });
  res.send(users);
});

// 4. How can I filter documents based on the existence of a field in Mongoose?
router.get("/exist", async function (req, res) {
  let users = await userModel.find({ nickname: { $exists: true } });
  res.send(users);
});

// 5. How can I filter documents based on a specific field's length in Mongoose?
router.get("/length", async function (req, res) {
  let users = await userModel.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: "$username" }, 5] },
        { $lte: [{ $strLenCP: "$username" }, 10] },
      ],
    },
  });
  res.send(users);
});

module.exports = router;
