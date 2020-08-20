const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');

const maps = require('../../../packages/map')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /maps'
    });
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if(fs.existsSync(`../maps/${id}`))
        res.status(200).json({
            message: `Found the galaxy '${id}'.`
        });
    else
        res.status(200).json({
            message: `Could not find the galaxy '${id}'.`
        });
});

router.post('/', (req, res, next) => {
    let galaxy = new maps.galaxy(10, 10);
    galaxy.init();
    res.status(200).json({
        message: 'The galaxy will be generated shortly, please check back later.'
    });
});

module.exports = router;