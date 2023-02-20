const express = require("express");
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();


userRouter.get("/",(req,res)=>{
    res.send("home page")
});

userRouter.post("/register", async (req,res)=>{

    const {password,email} = req.body;
    const payload = req.body;
    const ifExistUser = await userModel.findOne({email});
    console.log(ifExistUser,"pre exist user")
    if(!ifExistUser){

        try{
           bcrypt.hash(password,5,async (err,encryptedPass)=>{
            if(err){
                console.log(err);
            }else{
                const newUser = new userModel({...payload,password:encryptedPass});
                await newUser.save();
                res.send("registration success")
            }
           });     
        }catch(err){
           res.send({"msg":"cannot resister","error":err.message});
        }
    }else{
        res.send("User already exist, Pls Login")
    }
});

userRouter.post("/login",async (req,res)=>{
    const {email,password } = req.body;

    try{
        const data = await userModel.findOne({email});
        // console.log(data)
        if(data){
            bcrypt.compare(password,data.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({...data},"masai");
                    res.send({"msg":"login success","token":token})
                }else{
                    res.send("wrong credentials")
                }
            });
        }else{
            res.send({ "msg":"user not found, check email or password","error":err.message});
        }
    }catch(err){
        res.send({ "msg":"something went wrong, cant login","error":err.message});
    }
});

module.exports = { userRouter }



// {
//     "name":"prateek",
//        "email":"hameeroctane@gmail.com",
//        "gender":"male",
//        "password":"hellobrother",
//        "age":28,
//        "city":"Lucknow"
//    }

//hameer token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiY2l0eSI6ImluaXQiLCJhZ2UiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwiZ2VuZGVyIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsIm5hbWUiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsicmVxdWlyZSI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwiZ2VuZGVyIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiYWdlIjp0cnVlLCJjaXR5Ijp0cnVlfX19LCJza2lwSWQiOnRydWV9LCIkaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9pZCI6IjYzZjM0ZGI3NmU0MWVkYzdlZWVjZWIzYSIsIm5hbWUiOiJoYW1lZXIiLCJlbWFpbCI6ImhhbWVlcm9jdGFuZUBnbWFpbC5jb20iLCJnZW5kZXIiOiJtYWxlIiwicGFzc3dvcmQiOiIkMmIkMDUkRTFYR05MbnI2Q3hNeksvdDlMalJNLkpwMkFPa09mRUVqamM0aWJwSmZ6eEVDOU5ydEVnSk8iLCJhZ2UiOjI4LCJjaXR5IjoiTHVja25vdyJ9LCJpYXQiOjE2NzY4OTA2NzJ9.o6G5FbcR1oQ8orS238tk5G1bZFLJrwKwjwHw8wgRt8g

//hameer passwor: hellobrother


//prateek password: hello

//prateek token: 


//rama password: isha
//rama token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiY2l0eSI6ImluaXQiLCJhZ2UiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwiZ2VuZGVyIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsIm5hbWUiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsicmVxdWlyZSI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwiZ2VuZGVyIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiYWdlIjp0cnVlLCJjaXR5Ijp0cnVlfX19LCJza2lwSWQiOnRydWV9LCIkaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9pZCI6IjYzZjM2MTNmYTQ3M2M3YWZmYTE1MjJkMiIsIm5hbWUiOiJyYW1hIiwiZW1haWwiOiJyYW1hQGdtYWlsLmNvbSIsImdlbmRlciI6ImZlbWFsZSIsInBhc3N3b3JkIjoiJDJiJDA1JDN4NGU2L2RaMGJHT0pzV3FpY2p0S08ySkFmZ2YxeHhNOVFpT2Nsa1BtdGNsVEpqSTljejdxIiwiYWdlIjoyOSwiY2l0eSI6InJhaWJhcmVsbHkifSwiaWF0IjoxNjc2ODk0NTU3fQ.EGPvTbTf-Ly396gtpZ2Gechae7xDpUUJwW49jlRDPQc