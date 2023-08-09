require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const {SERVER_PORT} = process.env
// const {seed, getCountries, getCities, etc.} = require('./controller.js')

// middleware
app.use(express.json());
app.use(cors());

// import the controller
const controller = require('./controller');

// API endpoints
app.post('/api/colors', controller.createColorLabel);
app.get('/api/colors', controller.getColorLabels);
app.put('/api/colors/:id', controller.updateColorLabel);
app.delete('/api/colors/:id', controller.deleteColorLabel);
app.post('/api/calendar', controller.createDayWithColor);
app.get('/api/calendar', controller.getDayWithColor);
app.put('/api/calendar', controller.updateDayWithColor);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));