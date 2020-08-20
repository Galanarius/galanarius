const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `Getting sector ${id}'s data.`,
        id: id
    });
});

module.exports = router;