const mongoose = require('mongoose')

const connectDB = async()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
    }catch(e) {
        console.log(e)
        process.exit()
    }
}

module.exports = connectDB