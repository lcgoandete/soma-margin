require('dotenv').config();
const soapRequest = require('easy-soap-request');

const {
  getAvailableCardBody,
  getLimitCardBody,
  buildXmlToRequest
} = require('./handleXml');

const getAvailableCard = async (codigoEntidade, cpf, sequencialOrgao) => {
  const soapAction = 'buscarCartoesDisponiveis';
  const body = getAvailableCardBody(codigoEntidade, cpf, sequencialOrgao);
  const xml = buildXmlToRequest(body);
  const response = await requestBMG(soapAction, xml);
  return response;
};

const getCardLimit = async (availableCard) => {
  const soapAction = 'buscarLimiteSaque';
  const body = getLimitCardBody(availableCard);
  const xml = buildXmlToRequest(body);
  
  try {
    const response = await requestBMG(soapAction, xml);
    return response.body;
  } catch (error) {
    return error.response.data;
  }
}

const requestBMG = async (soapAction, xml) => {
  const url = process.env.BMG_URL;
  const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: `${soapAction}`,
  };
  
  try {
    const { response } = await soapRequest({ url, headers, xml: `${xml}`, timeout: 10000 });
    return response;
  } catch (error) {
    return error.response;
  }
}

module.exports = {
  getAvailableCard,
  getCardLimit,
};