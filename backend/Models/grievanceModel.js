const mongoose = require("mongoose")

const grievanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    district: {type: String, required: true},
    address: {type: String, required: true},
    pincode: {type: Number, required: true},
    priority: {type: String, enum: ["Low", "Medium", "High"], default: "Medium"},
    contactNum: {type: String, required: true},
    complaintTitle: {type: String, required: true},
    complaintDetails: {type: String, required: true},
    supportingDocs: {type: Number, default: null},
    status: {type: String, enum: ["Created","Pending", "Processing", "Resolved"], default: "Created"}
}, { timestamps: true })

const Grievance = mongoose.model("Grievance", grievanceSchema)

module.exports = Grievance;
