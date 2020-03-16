const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');

module.exports = router;

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /npcs'
    })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if(fs.existsSync(`../npcs/${id}.json`))
        res.status(200).json({
            data: JSON.stringify(JSON.parse(fs.readFileSync(`../npcs/${id}.json`))),
            message: `NPC ${id}'s data`,
            id: id
        });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `NPC ${id} updated!`,
        id: id
    });
});