const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    role: {type: String, enum:["assistant", "user"], required: true},
    content: {type: String, required: true}
}, {timestamps:true})

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    messages: [MessageSchema]
}, {timestamps:true})

const Chat = mongoose.model("Chat", chatSchema)
module.exports = Chat;