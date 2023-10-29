/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */
class Proposal {
  #cardData;

  constructor(cardData) {
    this.#cardData = cardData;
  }

  convertStringToCurrency(value) {
    if (value) {
      const values = value.split(',');
      const newValue = values[0].replace('.', '');
      const decimal = values[1];
      return parseFloat(`${newValue}.${decimal}`);
    }
    return null;
  }

  convertCpfToNumber(cpf) {
    let newCpf = cpf.replace('.', '');
    newCpf = newCpf.replace('.', '');
    newCpf = newCpf.replace('-', '');
    return parseInt(newCpf, 10);
  }

  convertDate(date) {
    const day = date.substring(0, 2);
    const month = date.substring(3, 5);
    const year = date.substring(6, 10);
    return `${year}-${month}-${day}`;
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
