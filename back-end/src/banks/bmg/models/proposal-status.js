const { requestBMG } = require('./requestBMG');
const { getProposalStatusXML } = require('./handleXml');

const getProposalStatus = async (payload) => {
  const soapAction = 'consultaStatusAde';
  const xml = getProposalStatusXML(payload);

  const urlComplement = '/ConsultaStatusAde?wsdl';
  const response = await requestBMG(soapAction, xml, urlComplement);
  const result = response.body;
  return result;
};

module.exports = {
  getProposalStatus,
};
