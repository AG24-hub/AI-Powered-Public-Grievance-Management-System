const express = require('express')
const chatbot = require('../Controllers/chatController')
const { protect } = require('../Middlewares/authMiddleware');

const router = express.Router()

router.route('/').post(protect, chatbot)

module.exports = router