const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "https://devices-manager-font-end-coz8.vercel.app"
}));

app.use(express.json());
app.use('/api', routes);

module.exports = app;