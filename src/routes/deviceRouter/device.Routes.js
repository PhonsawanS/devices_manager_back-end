const express = require('express');
const router = express.Router();
const deviceController = require('../../controllers/deviceController');
const upload = require('../../middlewares/upload');
const {authenticateToken} = require('../../middlewares/auth');


router
    .get('/list',authenticateToken, deviceController.listDevices)
    .post('/create', authenticateToken,deviceController.createDevice)
    .post('/import',authenticateToken, upload.single('file'), deviceController.importDevices);

module.exports = router;