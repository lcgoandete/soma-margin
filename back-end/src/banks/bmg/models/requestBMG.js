require('dotenv').config();
const soapRequest = require('easy-soap-request');

const requestBMG = async (soapAction, xml, urlComplement) => {
  const url = `${process.env.BMG_URL}${urlComplement}`;
  const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: `${soapAction}`,
  };

  const { response } = await soapRequest({
    url, headers, xml, timeout: 20000,
  });
  return response;
};

module.exports = {
  requestBMG,
};
