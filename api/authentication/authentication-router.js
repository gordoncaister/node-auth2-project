const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");

const secrets = require("../secrets")

const jwt = require("jsonwebtoken");


router.post("/register",(req,res)=> {
    console.log("Here",req.body)
    const userDetails = req.body;

    if (isValid(userDetails)){
        const rounds = process.env.BCRYPT_ROUNDS || 16;
        userDetails.password = bcryptjs.hashSync(userDetails.password, rounds);
        console.log(userDetails)
        Users.add(userDetails)
            .then(user=>{
                console.log("user", user)
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({error: "Database error while registering"})
            })
    } else {
        res.status(400).json({message:"Please provide valid username/password/department"})
    }
    
    
})

router.post("/login",(req,res)=>{
    const {username, password} = req.body;
    if(isValid(req.body)){
        Users.findBy({username})
            .then(users => {

                if (users[0] && bcryptjs.compareSync(password,users[0].password)){


                    const token = generateToken(users[0])

            

                    res.status(200).json({message: "You made it!",token})
                } else {
                    res.status(401).json({message: "Your username/password is wrong or doesn't exist"})
                }
            })
            .catch( err => res.status(500).json({error: "Database error while logging in"+err.message}))
    } else {
        res.status(400).json({message:"Please provide valid username/password"})
    }
});



function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string")
}   


function generateToken(user){
    const payload = {
        userId : user.id,
        username : user.username
    }
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn:"1d"
    }
    return jwt.sign(payload, secret, options)
}
module.exports = router;