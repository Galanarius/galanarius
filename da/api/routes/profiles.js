const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');


//GET
router.get('/', (req, res, next) => {
    //Return some statistics about all profiles (i.e. number of profiles, average lvl, members of each faction, etc).
});

router.get('/admin/:key', (req, res, next) => {
    //Return a more detailed version of the route above.
});


//GET: id
router.get('/:id', (req, res, next) => {
    //Return the profile found with the given ID.
});

router.get('/admin/:key/:id', (req, res, next) => {
    //Return a more detailed version of the route above.
});


//GET: id, attribute
router.get('/:id/:attribute', (req, res, next) => {
    //Return the given attribute for the profile found with the given ID.
});

router.get('/admin/:key/:id/:attribute', (req, res, next) => {
    //Return a more detailed version of the route above.
});


//POST: id/profile
router.post('/:id', (req, res, next) =>{
    //Return a confirmation message that the character was made, and a reference to log in.
});

router.post('/admin/:key/:profile', (req, res, next) => {
    //Return a more detailed version of the route above.
});


//PATCH: profile
router.patch('/:profile', (req, res, next) => {
    //Return a confirmation message that the character was updated, and a reference to getting 
});

router.patch('/admin/:key/:profile', (req, res, next) => {
    //Return a more detailed version of the route above.
});


//DELETE: id
router.delete('/admin/:key/:id', (req, res, next) => {
    //Deletes the profile associated with the ID and returns a confirmation message.
});


module.exports = router;