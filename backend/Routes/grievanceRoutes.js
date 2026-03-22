const express = require('express');
const { protect } = require('../Middlewares/authMiddleware');
const {lodgeGrievances,seeMyGrievances, updateGrievance, trackGrievance, seeAllGrievances, updateStatus, deleteGrievance, getStats} = require('../Controllers/grievanceController');
const { adminOnly } = require('../Middlewares/adminOnlyMiddleware');

const router = express.Router()

//ordering in routes is very importand here

//user routes
router.route('/').post(protect, lodgeGrievances)
router.route('/my').get(protect, seeMyGrievances)

//shared
router.route('/stats').get(protect, getStats)

//admin routes
router.route('/all').get(protect, adminOnly, seeAllGrievances)
router.route('/status/:id').put(protect, adminOnly, updateStatus)

//user
router.route('/:id')
    .put(protect, updateGrievance)
    .delete(protect, deleteGrievance)
module.exports = router;