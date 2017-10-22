'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const api = require('./api/routes/patientRoutes');

app.use(bodyParser.json());

api(app);

app.listen(PORT);