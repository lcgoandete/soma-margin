const Pipefy = require('../../../common/services/Pipefy');
const ProposalSafra = require('../../../common/models/ProposalSafra');

const registerProposalCard = async (cardMoved) => {
  const pipefy = new Pipefy();
  let cardId = 0;

  try {
    const movedCardIsValidated = pipefy.validateMovedCard(cardMoved);
    if (movedCardIsValidated) {
      cardId = cardMoved.data.card.id;

      let cardData = await pipefy.getCardData(cardId);
      cardData = await pipefy.pipefyCardToJSON(cardData);

      const proposalSafra = new ProposalSafra(cardData);
      await proposalSafra.createProposal();
      const proposalResponse = await proposalSafra.sendProposal();

      if (!proposalResponse.idProposta) throw Error('Não foi gerado um número para a proposta!');

      await proposalSafra.approveStop(proposalResponse);

      const phaseSuccess = 310620144;
      const fieldId = 'copy_of_idproposta';
      pipefy.saveRegisteredProposal(cardId, fieldId, proposalResponse.idProposta);
      pipefy.moveCard(cardId, phaseSuccess);
    }
  } catch (error) {
    const phasePending = 310620145;
    const fieldId = 'observacao';
    if (error.response) {
      if (error.response.data) {
        pipefy.saveRegisteredProposal(cardId, fieldId, error.response.data);
      }
      pipefy.saveRegisteredProposal(cardId, fieldId, error);
    }
    pipefy.moveCard(cardId, phasePending);
  }
};

module.exports = {
  registerProposalCard,
};
