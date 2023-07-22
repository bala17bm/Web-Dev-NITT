const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    bio:{
        type:Array,
        require:false
    },
},{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);