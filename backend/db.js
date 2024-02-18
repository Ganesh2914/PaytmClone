const mongoose=require('mongoose');
require('dotenv').config();
 
 

const Userschema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        trim:true
    }
})

 

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const User= mongoose.model("User",Userschema);

const Account= new mongoose.model("Account",accountSchema);

const URL=process.env.Database_URL;
 console.log(URL)
mongoose.connect(URL);

module.exports={
    User,Account
}