const expressAsyncHandler = require('express-async-handler')
const Grievance = require('../Models/grievanceModel')


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

    if(grievance){
        res.status(201).json({grievance})
    }else {
        res.status(400)
        throw new Error("Grievance not created")
    }
})

const seeMyGrievances = expressAsyncHandler(async(req, res)=> {
    const myGrievances = await Grievance.find({user: req.user._id})
    if(myGrievances){
        res.status(200).json(myGrievances)
    }
})

const updateGrievance = expressAsyncHandler(async (req, res) => {

    const grievance = await Grievance.findById(req.params.id);

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

const trackGrievance = expressAsyncHandler(async(req, res)=> {
    const grievance = await Grievance.findById(req.params.id)

    if (!grievance) {
        res.status(404);
        throw new Error("Grievance not found");
    }
    
    res.status(200).json({"status": grievance.status})
})

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

//-------------------------------FOR USER ONLY--------------------------------------//
const seeAllGrievances = expressAsyncHandler(async(req, res)=> {
    const grievances = await Grievance.find()

    if(!grievances){
        res.status(404);
        throw new Error("No grievance found");
    }

    res.status(200).json(grievances)
})

const updateStatus = expressAsyncHandler(async (req, res) => {

    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
        res.status(404);
        throw new Error("Grievance not found");
    }

    grievance.status = req.body.status

    const updated = await grievance.save();

    res.status(200).json(updated);
});


module.exports = {lodgeGrievances, seeMyGrievances, updateGrievance, trackGrievance, deleteGrievance, seeAllGrievances, updateStatus};