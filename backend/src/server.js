const express = require('express');
const app = express();
const cors = require("cors")
const router = require("./api/routes/auth.route")
const passport = require("passport");
var session = require('express-session')
const connectDataBase = require('./config/db')
const {PORT,FACEBOOK_APP_SECRET} = require("./config/vars")
// Connect DataBase
connectDataBase()

//__ Allow All request __ //
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  
  //__ Third Party Middleware __ //
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: FACEBOOK_APP_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());


//__ Social Login Helper __ //
 require("./api/controller/socialLoginHandler")(passport)


//__ Facebook Stragerty __ //
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  failureRedirect: "/auth/social/failure",
  failureMessage: true,
}),
  (req, res) => {
    let baseUrl = "http://localhost:3000";
    res.redirect(`${baseUrl}?t=${req.user.socialAccessToken}&facebookk=n`);
  }
);

  app.use(express.json()); //Used to parse JSON bodies
  app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

  // Connect Routes

  app.use("/user", router)
app.listen(PORT, ()=>{
    console.log(`server listinning on port ${PORT}`)
})