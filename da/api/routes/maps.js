const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');

const sectorsRoutes = require('./sectors')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /maps'
    });
})

router.get('/sectors/:id', sectorsRoutes);

module.exports = router;