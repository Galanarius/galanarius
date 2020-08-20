const express = require('express');
const router = express.Router();
const fs = require('graceful-fs');


//GET
router.get('/', (req, res, next) => {
   //Returns a list of all relics
});

router.get('/admin/:key', (req, res, next) => {
   //Returns a more detailed list of all relics
});


//GET: name
router.get('/:name', (req, res, next) => {
   //Returns details about a relic
});

router.get('/admin/:key/:name', (req, res, next) => {
   //Returns details and statistics about a relic
});


//PATCH: relic
router.patch('/admin/:key/:relic', (req, res, next) => {
   //Updates the details of a relic
});


//DELETE: name
router.delete('/admin/:key/:name', (req, res, next) => {
   //Deletes the relic named
});


module.exports = router;