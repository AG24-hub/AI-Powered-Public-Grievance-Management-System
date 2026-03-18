const expressAsyncHandler = require("express-async-handler")
const User = require("../Models/UserModel");
const generateToken = require("../config/generateToken");

const registerUser = expressAsyncHandler(async(req, res)=> {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name, email, password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error("User not created")
    }
})

const authUser = expressAsyncHandler(async(req, res)=> {
    const {email, password} = req.body;

    if(!password || !email){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    }else {
        res.status(404)
        throw new Error("User not found")
    }

})

module.exports = {registerUser, authUser};