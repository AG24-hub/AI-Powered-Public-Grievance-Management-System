const express = require('express')
const chatbot = require('../Controllers/chatController')

const router = express.Router()

router.route('/').post(chatbot)

module.exports = router