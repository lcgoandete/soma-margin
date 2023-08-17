const Proposal = require('./Proposal');
const ProposalConverterBMG = require('./ProposalConverterBMG');
const { registerProposalCard } = require('../../banks/bmg/models/register-proposal-card');

class ProposalBmg extends Proposal {
  #convertedProposal;

  constructor(cardData) {
    super(cardData);
    this.#convertedProposal = '';
  }

  #createProposal() {
    const proposalData = this.convertCardFieldsToProposalData();
    const proposalConverter = new ProposalConverterBMG();
    const convertedProposal = proposalConverter.execute(proposalData);
    this.#convertedProposal = convertedProposal;
  }

  registerProposal = async () => {
    await this.#createProposal();
    const registeredProposal = await registerProposalCard(this.#convertedProposal);
    return registeredProposal;
  };
}

module.exports = ProposalBmg;
