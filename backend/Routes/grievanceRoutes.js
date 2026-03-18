const express = require('express');
const { protect } = require('../Middlewares/authMiddleware');
const {lodgeGrievances,seeMyGrievances, updateGrievance, trackGrievance, seeAllGrievances, updateStatus, deleteGrievance} = require('../Controllers/grievanceController');
const { adminOnly } = require('../Middlewares/adminOnlyMiddleware');

const router = express.Router()

//user routes
router.route('/').post(protect, lodgeGrievances)
router.route('/my').get(protect, seeMyGrievances)
router.route('/:id')
    .put(protect, updateGrievance)
    .get(protect, trackGrievance)
    .delete(protect, deleteGrievance)

//admin routes
router.route('/').get(protect, adminOnly, seeAllGrievances)
router.route('/status/:id').put(protect, adminOnly, updateStatus)

module.exports = router;