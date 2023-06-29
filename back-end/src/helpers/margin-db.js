const moment = require('moment');
const { PrismaClient } = require('@prisma/client');
const { Unauthorized } = require('./httpStatus');

const prisma = new PrismaClient();

const marginData = {
  state: 0,
  state_api: 0,
  county: 0,
  county_api: 0,
  created_at: 0,
};

const QUERY_LIMIT = 445;

const getMarginData = async () => {
  let margin = await prisma.margin.findUnique({ where: { id: 1 } });

  if (!margin) {
    margin = await prisma.margin.create({
      data: {
        id: 1, state: 0, state_api: 0, county: 0, county_api: 0,
      },
    });
  }

  marginData.county = margin.county;
  marginData.county_api = margin.county_api;
  marginData.state = margin.state;
  marginData.state_api = margin.state_api;
  marginData.created_at = margin.created_at;
};

const checkNumberOfQueries = (field) => {
  if (marginData[field] > QUERY_LIMIT) {
    const newError = {
      status: Unauthorized,
      message: 'Limite de consultas de margem atingido',
    };
    throw newError;
  }
};

const verifyDate = async () => {
  const currentDate = moment(new Date()).format('YYYY-MM-DD');
  const marginDate = moment(marginData.created_at).format('YYYY-MM-DD');

  if (currentDate > marginDate) {
    const margin = await prisma.margin.update({
      data: {
        state: 0, state_api: 0, county: 0, county_api: 0, created_at: new Date(),
      },
      where: { id: 1 },
    });
    marginData.county = margin.county;
    marginData.county_api = margin.county_api;
    marginData.state = margin.state;
    marginData.state_api = margin.state_api;
    marginData.created_at = margin.created_at;
  }
};

const setMarginManager = async (field) => {
  await getMarginData();
  await checkNumberOfQueries(field);
  await verifyDate();

  const margin = await prisma.margin.update({
    data: { [field]: marginData[field] + 1 },
    where: { id: 1 },
  });
  marginData[field] = margin[field];
  return margin;
};

module.exports = {
  setMarginManager,
};
