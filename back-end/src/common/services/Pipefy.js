const PipefyModel = require('../models/Pipefy');

class PipefyService {
  constructor() {
    this.pipefyModel = new PipefyModel();
  }

  // eslint-disable-next-line class-methods-use-this
  validateMovedCard(cardMoved) {
    const { action, from, to } = cardMoved.data;

    if (action === 'card.move') {
      if (from.name === 'Inicio' && to.name === 'Caixa de Entrada') {
        return true;
      }
    }
    return false;
  }

  getCardData(cardId) {
    return this.pipefyModel.getCardData(cardId);
  }

  saveRegisteredProposal(cardId, fieldId, responseMessage) {
    this.pipefyModel.updateCardField(cardId, fieldId, responseMessage);
  }

  moveCard(cardId, destinationPhaseId) {
    this.pipefyModel.moveCard(cardId, destinationPhaseId);
  }

  // eslint-disable-next-line class-methods-use-this
  pipefyCardToJSON(card) {
    const pipefyCard = [...card.data.card.fields];
    const newCard = {};
    pipefyCard.forEach(({ name, value }) => {
      newCard[name] = value;
    });
    return newCard;
  }

  getCredentials() {
    const credentialsId = 771844372;
    return this.pipefyModel.getCardData(credentialsId);
  }
}

module.exports = PipefyService;
