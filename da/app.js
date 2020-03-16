const express = require('express');
const app = express();

const profilesRoutes = require('./api/routes/profiles')

app.use('/profiles', profilesRoutes);

module.exports = app;