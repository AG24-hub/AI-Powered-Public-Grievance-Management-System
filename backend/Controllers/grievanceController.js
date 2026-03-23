const expressAsyncHandler = require('express-async-handler')
const Grievance = require('../Models/grievanceModel')
const user = require('../Models/UserModel')


//-------------------------------FOR USER ONLY--------------------------------------//
const lodgeGrievances = expressAsyncHandler(async(req, res)=> {

    //Get user from req.user (set by protect middleware) instead of req.body
    const {district, address, pincode, priority, contactNum, complaintTitle, complaintDetails, supportingDocs} = req.body;

    if(!address || !pincode || !district) {
        res.status(400)
        throw new Error("Please enter your address details")
    }

    if(!contactNum) {
        res.status(400)
        throw new Error("Please enter your contact number so that our representatives can reach you")
    }

    if(!complaintTitle  || !complaintDetails) {
        res.status(400)
        throw new Error("Please enter your grievance")
    }

    const grievance = await Grievance.create({
        user: req.user._id,
        district, address, pincode, priority, contactNum, complaintTitle, complaintDetails, supportingDocs
    })

    await grievance.populate("user", "-password")

    if(grievance){
        res.status(201).json({grievance})
    }else {
        res.status(400)
        throw new Error("Grievance not created")
    }
})

const seeMyGrievances = expressAsyncHandler(async(req, res)=> {
    const myGrievances = await Grievance.find({user: req.user._id}).populate("user", "name email").sort("-createdAt")
    if(myGrievances){
        res.status(200).json(myGrievances)
    }
})

const updateGrievance = expressAsyncHandler(async (req, res) => {

    const grievance = await Grievance.findById(req.params.id).populate("user", "name email").sort("-createdAt")

    if (!grievance) {
        res.status(404);
        throw new Error("Grievance not found");
    }

    // allow only owner to update
    if (grievance.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized");
    }

    //Find a grievance by ID, update it with new data, return updated version, and include user details
    const updated = await Grievance.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } //show new changes not the previous one
    )

    res.status(200).json(updated);
});

const deleteGrievance = expressAsyncHandler(async(req, res)=> {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
        res.status(404);
        throw new Error("Grievance not found");
    }

    // allow only owner to update
    if (grievance.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Not authorized");
    }

    await grievance.deleteOne();

    res.status(200).json({
        message: "Grievance deleted successfully",
    });
})

//-------------------------------FOR Admin ONLY--------------------------------------//
const seeAllGrievances = expressAsyncHandler(async(req, res)=> {
    const grievances = await Grievance.find().populate("user", "name email").sort("-createdAt")

    if(!grievances){
        res.status(404);
        throw new Error("No grievance found");
    }

    res.status(200).json(grievances)
})

const updateStatus = expressAsyncHandler(async (req, res) => {

    const grievance = await Grievance.findById(req.params.id).populate("user", "name email")

    if (!grievance) {
        res.status(404);
        throw new Error("Grievance not found");
    }
    console.log("BODY:", req.body);
    const { status } = req.body;

    if (!status) {
        res.status(400);
        throw new Error("Status is required");
    }

    grievance.status = status;

    const updated = await grievance.save();

    res.status(200).json(updated);
});

//----------------------------------------Shared-----------------------------------//
const getStats = expressAsyncHandler(async (req, res)=> {
    try{
        let filter = {}
        
        //if normal user then filter their ids
        if(req.user.role !== 'admin'){
            filter = {user: req.user._id}
        }

        const created = await Grievance.countDocuments(filter);
        const pending = await Grievance.countDocuments({ ...filter, status: "Pending" });
        const processing = await Grievance.countDocuments({ ...filter, status: "Processing" });
        const resolved = await Grievance.countDocuments({ ...filter, status: "Resolved" });

        res.status(200).json({
        created,
        pending,
        processing,
        resolved
    });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})

module.exports = {lodgeGrievances, seeMyGrievances, updateGrievance, deleteGrievance, seeAllGrievances, updateStatus, getStats};