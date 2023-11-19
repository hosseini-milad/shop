const express = require("express");

const mainApi = require('./router/mainApi');
const authApi = require('./router/authApi');
const reportApi = require('./router/reportApi');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require("cors");

const app = express();
app.use(cors());

app.use('/api', mainApi)
app.use('/api/auth', authApi)
app.use('/api/report', reportApi)

app.use(express.json());

module.exports = app;
