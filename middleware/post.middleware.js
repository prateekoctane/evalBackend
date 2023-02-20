const jwt = require("jsonwebtoken");

const postAuthenticate = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){
        const decode = jwt.verify(token,"masai");
        console.log(decode,"decoded token")
        req.body.userid = decode._doc._id;
        req.body.author = decode._doc.name;
        next();
    }else{
        res.send("pls login first");
    }
};


module.exports = { postAuthenticate }