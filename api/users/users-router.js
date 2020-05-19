const router = require("express").Router();

const Users = require("./users-model.js");

// function restriction(req,res,next){
//     console.log(req.session)
//     if(req.session && req.session.loggedIn){
//         next();
//     } else {
//         res.status(401).json({message: "Gotta login or register first"})
//     }
// }

// router.use(restriction)

router.get("/", (req,res)=>{
    Users.find().then(users=> res.status(200).json(users))
    .catch(err => res.status(500).json({error: "There was an error fetching users from the database"+err.message}))
})

module.exports = router;