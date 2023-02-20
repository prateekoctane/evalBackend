const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const { connection } = require("./config/db");
const { postAuthenticate } = require("./middleware/post.middleware");


const app = express();
app.use(express.json());
app.use("/users",userRouter)
app.use("/posts",postAuthenticate,postRouter)
app.use(cors({origin:"*"}));


app.listen(process.env.port,async ()=>{

    try{
        await connection;
        console.log("connected to database")
    }catch(err){
        console.log({"msg":"cannot connect to database","error":err.message})
    }
    console.log("server started")
})