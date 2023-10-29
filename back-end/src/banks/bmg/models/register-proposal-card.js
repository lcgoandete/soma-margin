const { requestBMG } = require('./requestBMG');
const { createProposalCardXML } = require('./handleXml');

const registerProposalCard = async (payload) => {
  const soapAction = 'gravarPropostaCartao';
  const xml = createProposalCardXML(payload);

  const urlComplement = '/CartaoBmgCard?wsdl';
  const response = await requestBMG(soapAction, xml, urlComplement);
  const result = response.body;
  return result;
};

module.exports = {
  registerProposalCard,
};
