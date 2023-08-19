const { requestBMG } = require('./requestBMG');
const { createRegisterProposalCardXML } = require('./handleXml');

const registerProposalCard = async (payload) => {
  const soapAction = 'gravarPropostaCartao';
  const xml = createRegisterProposalCardXML(payload);

  const urlComplement = '/CartaoBmgCard?wsdl';
  const response = await requestBMG(soapAction, xml, urlComplement);
  const result = response.body;
  return result;
};

module.exports = {
  registerProposalCard,
};
