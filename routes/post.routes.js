const express = require("express");
const { postModel } = require("../model/post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postRouter = express.Router();


postRouter.get("/",async (req,res)=>{
    const userid = req.body.userid;
    // console.log(userid,"user id")
    try{
        const allpost = await postModel.find({userid});
        console.log(allpost)
        
        res.send(allpost)
    }catch(err){
        res.send({"msg":"cant fetch your posts, something went wrong", "error":err.message})
    }
});

postRouter.post("/create", async (req,res)=>{
    
    const payload = req.body;
    try{
        const newPost = new postModel(payload);
        await newPost.save();
        res.send("post created success");
    }catch(err){
        res.send({"msg":"cant create post","error":err.message})
    }
  
});

postRouter.get("/top",async (req,res)=>{
    const userid = req.userid;
    try{
        const allpost = await postModel.find(userid);
        let max = -Infinity;
        for(let i=0; i<allpost.length; i++){
            if(max < allpost[i].no_of_comments){
                max = i;
            }
        }
        const result = allpost[max]
        res.send(result)
    }catch(err){
        res.send({"msg":"cant fetch your posts, something went wrong", "error":err.message})
    }
});

postRouter.patch("/update/:id",async (req,res)=>{
   
     const _id = req.params.id;
     const payload = req.body;
     const post = await postModel.findOne({_id});
     console.log(post)
     const userid_in_post = post.userid;
     const userid_making_req = req.body.userid;
     try{
        if(userid_in_post === userid_making_req){
            await postModel.findByIdAndUpdate({_id},payload);
            res.send("post updated success")
        }else{
            res.send({"msg":"you are not authorised to change others post"});
        }
     }catch(err){
        res.send({"msg":"cant update post,something went wrong","error":err.message})
     }     
});

postRouter.delete("/delete/:id",async (req,res)=>{
   
    const _id = req.params.id;
    const payload = req.body;
    const post = await postModel.findOne({_id});
    // console.log(post)
    const userid_in_post = post.userid;
    const userid_making_req = req.body.userid;
    try{
       if(userid_in_post === userid_making_req){
           await postModel.findByIdAndDelete({_id},payload);
           res.send("post deleted success")
       }else{
           res.send({"msg":"you are not authorised to delete others post"});
       }
    }catch(err){
       res.send({"msg":"cant delete post,something went wrong","error":err.message})
    }     
});

module.exports = { postRouter }



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