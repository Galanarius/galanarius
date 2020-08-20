const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /artifacts'
    });
});

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    res.status(200).json({
        data: JSON.stringify(JSON.stringify(fs.readFileSync(`../artifacts/${name}`)))
    });
});

module.exports = router;