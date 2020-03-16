const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /profiles'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /profiles'
    });
});

router.get('/:profileID', (req, res, next) => {
    const id = req.params.profileID;
    if(fs.existsSync(`../profiles/${id}`))
        res.status(200).json({
            message: JSON.stringify(JSON.parse(fs.readFileSync(`../profiles/${id}/profile.json`))),
            id: id
        });
    else
        res.status(200).json({
            message: `No profile found for the ID '${id}'.`,
            id: id
        });
});

router.patch('/:profileID', (req, res, next) => {
    res.status(200).json({
        message: 'Profile updated!'
    });
});

router.delete('/:profileID', (req, res, next) => {
    res.status(200).json({
        message: 'Profile deleted!'
    });
});


module.exports = router;