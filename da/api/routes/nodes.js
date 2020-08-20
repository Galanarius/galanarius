const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `Handling GET request for node ${id}`
    });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `n${id} updated!`
    });
});

module.exports = router;