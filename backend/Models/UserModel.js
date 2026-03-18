const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({  //UserSchema is the structure of the model
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String,enum: ["user", "admin"], default: "user"},  //enum means only these two values are allowed
}, {timestamps: true});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function(){
    if(!this.isModified("password"))  return ;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

//mongoose.model("ModelName", schema)
const User = mongoose.model("User", userSchema);  //User is the model that will interect with the database

module.exports = User; 