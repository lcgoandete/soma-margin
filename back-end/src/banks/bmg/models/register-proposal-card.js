const { requestBMG } = require('./requestBMG');
const { createBodyRegisterProposalCard, buildXmlToRequest } = require('./handleXml');

const registerProposalCard = async (payload) => {
  const soapAction = 'gravarPropostaCartao';
  const body = createBodyRegisterProposalCard(payload);
  const xml = buildXmlToRequest(body);

  const urlComplement = '/CartaoBmgCard?wsdl';
  const response = await requestBMG(soapAction, xml, urlComplement);
  const result = response.body;
  return result;
};

module.exports = {
  registerProposalCard,
};
