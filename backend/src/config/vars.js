const path = require("path");
// import .env variables
require("dotenv").config();

module.exports ={
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    TOKEN: process.env.TOKEN,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    FACEBOOK_APP_CALLBACK: process.env.FACEBOOK_APP_CALLBACK
}