const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const {DB_URI} = require("./vars")
const connectDataBase = ()=>{
    mongoose.connect(DB_URI).then((err)=>{
         console.log("Database connection established")
    })
}

module.exports = connectDataBase