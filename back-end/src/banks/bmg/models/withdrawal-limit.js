const { requestBMG } = require('./requestBMG');
const { createBodyWithdrawalLimit, buildXmlToRequest } = require('./handleXml');

const getWithdrawalLimit = async (payload) => {
  const soapAction = 'buscarLimiteSaque';
  const body = createBodyWithdrawalLimit(payload);
  const xml = buildXmlToRequest(body);

  try {
    const urlComplement = '/CartaoBmgCard?wsdl';
    const response = await requestBMG(soapAction, xml, urlComplement);
    const result = response.body;
    return result;
  } catch (error) {
    return error.response.data;
  }
};

module.exports = {
  getWithdrawalLimit,
};
