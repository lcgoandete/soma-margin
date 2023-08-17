/* eslint-disable lines-between-class-members */
class Proposal {
  #cardData;

  constructor(cardData) {
    this.#cardData = cardData;
  }
  convertCardFieldsToProposalData = () => {
    if (this.#cardData.lenght < 1) {
      throw Error('Error: Erro ao tentar ler os dados do cartão');
    }

    const proposalData = {};
    // eslint-disable-next-line no-return-assign
    this.#cardData.forEach(({ name, value }) => proposalData[name] = value);
    return proposalData;
  };
}

module.exports = Proposal;
