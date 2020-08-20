const express = require('express');
const app = express();

const galaxiesRoutes = require('./api/routes/galaxies');
const nodesRoutes = require('./api/routes/nodes');
const npcsRoutes = require('./api/routes/npcs');
const planetoidsRoutes = require('./api/routes/planetoids');
const profilesRoutes = require('./api/routes/profiles');
const relicsRoutes = require('./api/routes/relics');
const sectorsRoutes = require('./api/routes/sectors');

app.use('/galaxies', galaxiesRoutes);
app.use('/nodes', nodesRoutes);
app.use('/npcs', npcsRoutes);
app.use('/planetoids', planetoidsRoutes);
app.use('/profiles', profilesRoutes);
app.use('/relics', relicsRoutes);
app.use('/sectors', sectorsRoutes);

module.exports = app;