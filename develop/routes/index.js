const router = require('express').Router()
const API = require('./api')
router.use("/api", API)

module.exports = router