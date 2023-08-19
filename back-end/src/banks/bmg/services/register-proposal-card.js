const { decode } = require('html-entities');

const ProposalBmg = require('../../../common/models/ProposalBmg');
const Pipefy = require('../../../common/services/Pipefy');

const extractDataFromErrorResponse = (error) => {
  const { data } = error.response;
  let newData = decode(data);
  newData = data.replace(/\s{2,}/g, '');
  const regexFaultString = /<faultstring>(.*?)<\/faultstring>/;
  const faultStringMatch = newData.match(regexFaultString);
  return faultStringMatch ? faultStringMatch[1] : `- não foi possíel extrair a resposta de erro do banco BMG\n ${newData}`;
};

const extractDataFromSuccessResponse = (successResponse) => {
  let newSuccessResponse = decode(successResponse);
  newSuccessResponse = newSuccessResponse.replace(/\s{2,}/g, '');
  const regexSuccessResponse = /<gravarPropostaCartaoReturn xsi:type="soapenc:string" xmlns:soapenc="http:\/\/schemas.xmlsoap.org\/soap\/encoding\/">(.*?)<\/gravarPropostaCartaoReturn>/;
  const successResponseMatch = newSuccessResponse.match(regexSuccessResponse);
  return successResponseMatch ? successResponseMatch[1] : null;
};

const validateMovedCard = (cardMoved) => {
  const { action, from, to } = cardMoved.data;

  if (action === 'card.move') {
    if (from.name === 'Inicio' && to.name === 'Caixa de Entrada') {
      return true;
    }
  }
  return false;
};

const registerProposalCard = async (cardMoved) => {
  const pipefy = new Pipefy();
  const cardId = cardMoved.data.card.id;

  try {
    const movedCardIsValidated = validateMovedCard(cardMoved);
    if (movedCardIsValidated) {
      const cardData = await pipefy.getCardData(cardId);

      const credentials = await pipefy.getCredentials();
      const newCardData = [...cardData.data.card.fields, ...credentials.data.card.fields];

      const proposalBmg = new ProposalBmg(newCardData);
      await proposalBmg.convertCardFieldsToProposalData();

      const registeredProposal = await proposalBmg.registerProposal();

      const successResponse = extractDataFromSuccessResponse(registeredProposal);
      await pipefy.saveRegisteredProposal(cardId, 'idproposta', successResponse);
      await pipefy.saveRegisteredProposal(cardId, 'observacao', '');

      const successPhase = 321262258;
      pipefy.moveCard(cardId, successPhase);
    }
  } catch (error) {
    let errorResponse;
    if (error.response) {
      if (error.response.data) {
        errorResponse = await extractDataFromErrorResponse(error);
      }
    } else {
      errorResponse = error;
    }
    const pendingPhase = 321258609;
    await pipefy.saveRegisteredProposal(cardId, 'observacao', errorResponse);
    await pipefy.saveRegisteredProposal(cardId, 'idproposta', '');
    await pipefy.moveCard(cardId, pendingPhase);
  }
};

module.exports = {
  registerProposalCard,
};
