const mongoose = require("mongoose");

const userDetailSchema = mongoose.Schema({
    name:{type:String, required: true},
    email:{type:String, required:true},
    gender:{type:String, required:true},
    password:{type:String, required:true},
    age:{type:Number, required:true},
    city:{type:String, required:true}
},{versionKey:false});

const userModel = mongoose.model("users",userDetailSchema);

module.exports = { userModel }