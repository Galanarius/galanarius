const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');


//GETs:
router.get('/', (req, res, next) => {
    //Returns a list of general statistics about NPCs (i.e. number of NPCS, average level, faction sizes, etc).
});

router.get('/admin/:key', (req, res, next) => {
    //Return a more detailed version of the route above.
});


//GET: id, attribute
router.get('/:id/:attribute', (req, res, next) => {
    //Returns the given attribute of the npc found by the given ID.
});


//GET: id
router.get('/admin/:key/:id', (req, res, next) => {
    //Return the NPC profiles associated with the given ID.
});


//PATCH: id, attribute
router.patch('/:id/:attribute', (req, res, next) => {
    //Updates the given attribute of the NPC profile from the given ID.
});


//PATCH: id
router.patch('/admin/:key/:id', (req, res, next) => {
    //Updates the NPC profile from the given ID.
});


//DELETE: id
router.delete('/admin/:key/:id', (req, res, next) => {
    //Deletes the NPC profile from the given ID.
});


module.exports = router;