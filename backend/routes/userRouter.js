
const express=require('express');
const userRouter = express.Router(); 
const zod=require('zod');
const jwt=require("jsonwebtoken")
const { User, Account } = require('../db');
const JWT_SECRET = require('../config');
const { signupSchema, updateBodySchema, signinBodySchema } = require('../zod');
const authMiddleware = require('../middleware');
const bcrypt = require("bcrypt");


 

userRouter.post("/signup",async (req,res)=>{

   const body=req.body;
   console.log(req.body);
   const parsedBody=signupSchema.safeParse(body);

   if(!parsedBody){
        return res.json({
            msg:"Incorrect inputs"
        })
   }

   let user= await User.findOne({
        username:body.username
   })

   if(user){
    return res.json({
        msg:"Username already taken / worng input "
    })
   }

   const dbUser=new User();
        dbUser.username=body.username
        dbUser.firstname=body.firstname
        dbUser.lastname=body.lastname
        dbUser.password=body.password
        await dbUser.save();

        const userId=dbUser._id;

        await Account.create({
            userId,
            balance: 1+ Math.random()*1000
        })


   let token= jwt.sign({
    userId:dbUser._id
   },JWT_SECRET);
   res.json({
    msg:"User created successfully ",
    success:true,
    token:token
   })

    

})
userRouter.post("/signin",async (req,res)=>{

    const body=req.body;
    const parsedBody=signinBodySchema.safeParse(body);
    if(!parsedBody){
        return res.json({
            msg:"Username already taken / worng input "
        })
    }

    const user=await User.findOne({
        username:body.username,
        password:body.password
    })

    if(user){
        const token=jwt.sign({
            userId:user._id},JWT_SECRET);
        res.json({
            token:token,
            success:true,
            msg:"Signed in Successfully "
        })
        return;
    }
    res.status(411).json({
        message:"Incorrect Credentials / Error while logging in "
    })
})
 

userRouter.put("/updateinfo",authMiddleware,async (req,res)=>{
 
    const body=req.body;
    const parsedBody=updateBodySchema.safeParse(body);
    if(!parsedBody){
        return res.json({
            msg:"Incorrect inputs"
        })
   }
   await User.updateOne(req.body,{
    id:req.userId
   })

   res.json({
        msg:"Updated Successfully "
   })

})

userRouter.get("/bulk",authMiddleware,async (req,res)=>{

    const filter= req.query.filter || "";
    const users= await User.find({
        $or:[{
            firstname:{
                "$regex":filter
            },
        },{
            lastname:{
                "$regex":filter
            }
        }]
    })

        res.json({
          user: users.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
           }))
        })
})
module.exports=userRouter;