const Pipefy = require('../../../common/services/Pipefy');
const ProposalSafra = require('../../../common/models/ProposalSafra');

const registerProposalCard = async (cardMoved) => {
  try {
    const pipefy = new Pipefy();
    const movedCardIsValidated = pipefy.validateMovedCard(cardMoved);
    if (movedCardIsValidated) {
      const { id } = cardMoved.data.card;

      let cardData = await pipefy.getCardData(id);
      cardData = await pipefy.pipefyCardToJSON(cardData);

      const proposalSafra = new ProposalSafra(cardData);
      await proposalSafra.convertCardFieldsToProposalData();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerProposalCard,
};
