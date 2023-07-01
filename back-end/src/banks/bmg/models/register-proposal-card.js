const { requestBMG } = require('./requestBMG');
const { createBodyRegisterProposalCard, buildXmlToRequest } = require('./handleXml');

const registerProposalCard = async (payload) => {
  const soapAction = 'gravarPropostaCartao';
  const body = createBodyRegisterProposalCard(payload);
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
  registerProposalCard,
};
