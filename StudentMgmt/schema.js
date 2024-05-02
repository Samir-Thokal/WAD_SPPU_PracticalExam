const mongoose = require("mongoose") //odm lib of mongdb

const Studentschema= mongoose.Schema(
    {
        name: String,
        rollno: Number,
        wad_marks: Number,
        cc_marks: Number,
        dsbda_marks: Number,
        cns_marks: Number,
        ai_marks: Number
    },
    {
        timestamps:true, // doc creation time
    },

);

module.exports=mongoose.model("students",Studentschema);

// nodemon server.js
// npm i nodemon
// npm i path express