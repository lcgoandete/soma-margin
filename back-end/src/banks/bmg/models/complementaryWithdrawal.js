require('dotenv').config();
const soapRequest = require('easy-soap-request');

const { getAvailableCardXML, getLimitCardXML } = require('./handleXml');

const requestBMG = async (soapAction, xml) => {
  const url = `${process.env.BMG_URL}/SaqueComplementar?wsdl`;
  const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: `${soapAction}`,
  };

  try {
    const { response } = await soapRequest({
      url, headers, xml: `${xml}`, timeout: 10000,
    });
    return response.body;
  } catch (error) {
    return error.response.data;
  }
};

const getAvailableCard = async (codigoEntidade, cpf, sequencialOrgao) => {
  const soapAction = 'buscarCartoesDisponiveis';
  const xml = getAvailableCardXML(codigoEntidade, cpf, sequencialOrgao);

  try {
    const response = await requestBMG(soapAction, xml);
    return response;
  } catch (error) {
    return error;
  }
};

const getCardLimit = async (availableCard) => {
  const soapAction = 'buscarLimiteSaque';
  const xml = getLimitCardXML(availableCard);

  try {
    const response = await requestBMG(soapAction, xml);
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAvailableCard,
  getCardLimit,
};
