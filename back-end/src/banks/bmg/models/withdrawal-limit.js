const { requestBMG } = require('./requestBMG');
const { createWithdrawalLimitXML, createBenefitCardWithdrawalLimitXML } = require('./handleXml');

const getWithdrawalLimit = async (payload) => {
  const soapAction = 'buscarLimiteSaque';
  const xml = createWithdrawalLimitXML(payload);

  try {
    const urlComplement = '/CartaoBmgCard?wsdl';
    const response = await requestBMG(soapAction, xml, urlComplement);
    const result = response.body;
    return result;
  } catch (error) {
    return error.response.data;
  }
};

const getBenefitCardWithdrawalLimit = async (payload) => {
  const soapAction = 'buscarLimiteSaque';
  const xml = createBenefitCardWithdrawalLimitXML(payload);

  try {
    const urlComplement = '/CartaoBeneficio?wsdl';
    const response = await requestBMG(soapAction, xml, urlComplement);
    const result = response.body;
    return result;
  } catch (error) {
    return error.response.data;
  }
};

module.exports = {
  getWithdrawalLimit,
  getBenefitCardWithdrawalLimit,
};
