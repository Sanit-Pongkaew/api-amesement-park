const express = require('express');
const cors = require('cors');

/* --------------------------- Config -------------------------------- */
const con = require('./app/connect/connect');
const configJWT = require('./api/config/configJWT');
const configCors = require('./api/config/configCors');
const configPackage = require('./api/config/configPackage');

/* ------------------------- End Config ------------------------------- */

/* --------------------------- Require menu -------------------------- */

const authJWT = require('./api/api-of-amusement-park/authJWT');
const packacge_park = require('./api/api-of-amusement-park/package');
const calendar_park = require('./api/api-of-amusement-park/calendar');

/* ------------------------- End require menu ------------------------ */

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

/* ---------------------------- Auth JWT ----------------------------- */

app.post('/api/backend/authentication/login', cors(configCors), authJWT.checkLogin);
app.post('/api/backend/authentication/logout', cors(configCors), authJWT.deleteTokenInValidateTokenList);

/* -------------------------- END Auth JWT --------------------------- */

/* ----------------------------- Package ----------------------------- */

app.get('/api/backend/getPackage', cors(configCors), configJWT.verifyTokenInList, configJWT.verifyToken, packacge_park.getPackage);
app.delete('/api/backend/deletePackage', cors(configCors), configJWT.verifyTokenInList, configJWT.verifyToken, packacge_park.deletePackage);
app.post('/api/backend/insertPackage', cors(configCors), configJWT.verifyTokenInList, configJWT.verifyToken, configPackage, packacge_park.addPackage);
app.post('/api/backend/editPackage', cors(configCors), configJWT.verifyTokenInList, configJWT.verifyToken, packacge_park.editPackage);

/* --------------------------- End Package --------------------------- */

/* ----------------------------- Calendar ---------------------------- */

app.post('/api/backend/getPackageList', cors(configCors), configJWT.verifyTokenInList, configJWT.verifyToken, calendar_park.getCalendar);
app.post('/api/backend/getCalendar', cors(configCors), configJWT.verifyTokenInList, configJWT.verifyToken, calendar_park.getCalendarPackage);

/* --------------------------- End Calendar -------------------------- */

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port${port}...`))