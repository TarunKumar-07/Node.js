// refference images in `Code-Snippets-for-AuthCode` folder
Install these packages
1. npm i passport
2. npm i passport-local
3. npm i passport-local-mongoose
4. npm i mongoose
5. npm i express-session



for all at one time use:
```
npm i passport passport-local passport-local-mongoose mongoose express-session
```



1. Write in app.js after view engine and before logger
    ```
    // manual code-------
    const expressSession = require("express-session");
    const flash = require("connect-flash");
    const passport = require("passport");
    //------------------



    app.set("view engine", "ejs");
    // manual code-------
    app.use(                                                  //-----|
    expressSession({                                      //-----|
        resave: false,                                        //-----|
        saveUninitialized: false,                           //   This code allows to      
        secret: "this is sessions secret message",      //    make sessions
    })                                                        //-----|
    );                                                          //-----|

    app.use(passport.initialize());                       //-----| initialize passport
    app.use(passport.session());                         //-----| creation passport session
    passport.serializeUser(usersRouter.serializeUser());        //-----|
    passport.deserializeUser(usersRouter.deserializeUser());
    app.use(flash());
    //-----------------
    app.use(logger("dev"));

    ```
2. Set up user.js
    ```
    const mongoose = require("mongoose");
    const plm = require("passport-local-mongoose");

    mongoose.connect("mongodb://127.0.0.1:27017/demoDB");

    const userSchema = mongoose.Schema({
    username: String,
    password: String,
    secret: String,
    });

    userSchema.plugin(plm);
    module.exports = mongoose.model("auth", userSchema);


    ```
3. In index.js try register and other code as well
    ```
    // manual code-------
    const userModel = require("./users");
    const passport = require("passport");
    const localStrategy = require("passport-local");

    passport.use(new localStrategy(userModel.authenticate()));
    //-----------------


    //manual code--------
    router.get("/profile", isLoggedIn, function (req, res, next) {
    res.render("profile");
    });

    router.post("/register", function (req, res) {
    var userdata = new userModel({
        username: req.body.username,
        secret: req.body.secret,
    });
    userModel
        .register(userdata, req.body.password)
        .then(function (registereduser) {
        passport.authenticate("local")(req, res, function () {
            res.redirect("/profile");
        });
        });
    });

    router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/",
    }),
    function (req, res) {}
    );

    router.get("/logout", function (req, res, next) {
    req.logOut(function (err) {
        if (err) return next(err);
        res.redirect("/");
    });
    });

    function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
    }

    //------------------
    ```

