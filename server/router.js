const express = require('express')
const router = express.Router();
const controller = require('./controller')

router.post('/insertdata', controller.addData)
router.post('/getresume/:resumeId', controller.getResume)
router.get('/viewresume', controller.viewResume)
router.delete('/deleteresume/:id',controller.deleteResumeHandler)
router.put('/updateresume/:id',controller.updateResumeHandler)

module.exports = router