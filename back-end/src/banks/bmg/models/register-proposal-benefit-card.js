const { requestBMG } = require('./requestBMG');
const { createProposalBenefitCardXML } = require('./handleXml');

const registerProposalBenefitCard = async (payload) => {
  const soapAction = 'gravarPropostaCartao';
  const xml = createProposalBenefitCardXML(payload);

  const urlComplement = '/CartaoBeneficio?wsdl';
  const response = await requestBMG(soapAction, xml, urlComplement);
  const result = response.body;
  return result;
};

module.exports = {
  registerProposalBenefitCard,
};
