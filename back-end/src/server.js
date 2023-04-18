const cors = require('cors');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./router');
const { InternalServerError } = require('./helpers/httpStatus');

const PORT = 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(InternalServerError).json({ message: err.message });
});

const scheduledTime = () => {
  const initialTime = moment(new Date('2022-01-01 08:30:00')).format('HH:mm:ss');
  const finalTime = moment(new Date('2022-01-01 19:00:00')).format('HH:mm:ss');
  const currentTime = moment(new Date()).format('HH:mm:ss');
  const weekday = moment().format('dddd');

  if (process.env.RELOGIN_MARGIN === 'false') {
    return false;
  }

  if (weekday === 'Saturday' || weekday === 'Sunday') {
    return false;
  }

  if (currentTime < initialTime || currentTime > finalTime) {
    return false;
  }

  return true;
};

setInterval(async () => {
  if (scheduledTime()) {
    try {
      const margin = require('./portalConsignado/services/margin');
      console.log(await margin.getMargins('1'));
    } catch (error) {
      console.log(error);
    }
  }
}, 1000 * 60 * 25);

setInterval(async () => {
  if (scheduledTime()) {
    try {
      const marginMunicipio = require('./portalConsignadoMunicipio/services/margin');
      console.log(await marginMunicipio.getMargins('2'));
    } catch (error) {
      console.log(error);
    }
  }
}, 1000 * 60 * 26);

app.listen(PORT);
