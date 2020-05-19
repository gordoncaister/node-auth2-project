const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register",(req,res)=> {
    const userDetails = req.body;

    if (isValid(userDetails)){
        const rounds = process.env.BCRYPT_ROUNDS || 16;
        userDetails.password = bcryptjs.hashSync(userDetails.password, rounds);

        Users.add(userDetails)
            .then(user=>{
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({error: "Database error while registering"})
            })
    } else {
        res.status(400).json({message:"Please provide valid username/password"})
    }
    
    
})

router.post("/login",(req,res)=>{
    const {username, password} = req.body;
    if(isValid(req.body)){
        Users.findBy({username})
            .then(users => {

                if (users[0] && bcryptjs.compareSync(password,users[0].password)){
                    res.status(200).json({message: "You made it!"})
                } else {
                    res.status(401).json({message: "Your username/password is wrong or doesn't exist"})
                }
            })
            .catch( err => res.status(500).json({error: "Database error while logging in"+err.message}))
    } else {
        res.status(400).json({message:"Please provide valid username/password"})
    }
})



function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string")
}   

module.exports = router;