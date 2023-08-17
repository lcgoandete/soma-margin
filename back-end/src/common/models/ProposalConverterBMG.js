const moment = require('moment');

/* eslint-disable class-methods-use-this */
class ProposalConverterBMG {
  #cpfConverter(cpf) {
    let newCpf = cpf.replace('.', '');
    newCpf = newCpf.replace('.', '');
    newCpf = newCpf.replace('-', '');
    return newCpf;
  }

  #dateConverter(date) {
    if (date === 'currentDate') {
      return moment(Date.now()).format('YYYY-MM-DDT06:00:00');
    }
    const day = date.substring(0, 2);
    const month = date.substring(3, 5);
    const year = date.substring(6, 10);
    return `${year}-${month}-${day}T06:00:00`;
  }

  #stringToCurrencyConverter(value) {
    if (value) {
      const values = value.split(',');
      const newValue = values[0].replace('.', '');
      const decimal = values[1];
      return parseFloat(`${newValue}.${decimal}`);
    }
    return 0;
  }

  #creditPurposeConverter(type) {
    return type === 'Conta Corrente' ? 1 : 2;
  }

  #extractBankCode(bank) {
    return bank.match(/\d+/g)[0];
  }

  #extractEntityCode(entity) {
    return entity.match(/(\d+)(-)(\d+)/g)[0];
  }

  #setServerStatus(proposalData) {
    const codigoEntidade = this.#extractEntityCode(proposalData.Codigo_Entidade);
    let serverStatus = 31;

    if (codigoEntidade === '4194-1') {
      const newStatus = proposalData.Codigo_Situacao_Servidor.match(/\d+/g)[0];
      serverStatus = parseInt(newStatus, 10);
    }
    return serverStatus;
  }

  #dadosProposta(proposalData) {
    return {
      codigoEntidade: this.#extractEntityCode(proposalData.Codigo_Entidade),
      codigoSituacaoServidor: this.#setServerStatus(proposalData),
      cpf: this.#cpfConverter(proposalData.CPF),
      matricula: proposalData.Matricula,
      margem: this.#stringToCurrencyConverter(proposalData.Margem),
      valorRenda: this.#stringToCurrencyConverter(proposalData.Valor_Renda),
      dataRenda: this.#dateConverter('currentDate'),
      valorParcela: this.#stringToCurrencyConverter(proposalData.Margem),
      valorSaque: this.#stringToCurrencyConverter(proposalData.Valor_Saque),
      valorSolicitado: this.#stringToCurrencyConverter(proposalData.Valor_Saque),
    };
  }

  #dadosBancarios(proposalData) {
    return {
      banco: parseInt(this.#extractBankCode(proposalData.Banco), 10),
      agencia: proposalData.Agencia,
      digitoVerificadorDaAgencia: '',
      numeroDaConta: proposalData.Numero_da_Conta.slice(0, -1),
      digitoVerificadorDaConta: proposalData.Numero_da_Conta.slice(-1),
      finalidadeCredito: this.#creditPurposeConverter(proposalData.Tipo_de_Conta),
    };
  }

  #dadosPessoais(proposalData) {
    return {
      nome: proposalData.Nome_Completo,
      dataNascimento: this.#dateConverter(proposalData.Data_de_Nascimento),
      sexo: proposalData.Sexo,
      email: proposalData.Email,
      nomeMae: proposalData.Nome_da_Mae,
      nomePai: proposalData.Nome_do_Pai,
      estadoCivil: 'S',
      nomeConjuge: '',
      grauInstrucao: 7,
      nacionalidade: proposalData.Nacionalidade,
      ufNascimento: proposalData.Uf_Nascimento.toUpperCase(),
      cidadeNascimento: proposalData.Cidade_de_Nascimento,
    };
  }

  #celular(proposalData) {
    return {
      ddd: proposalData.Celular.substring(4, 6),
      numero: proposalData.Celular.substring(7, 17).replace('-', ''),
    };
  }

  #identidade(proposalData) {
    return {
      dataEmissao: this.#dateConverter(proposalData.Data_Emissao_Documento),
      emissor: proposalData.Orgao_Emissor_Documento.toUpperCase(),
      numero: proposalData.Numero_Documento,
      tipo: proposalData.Documento_de_Identificacao,
      uf: proposalData.Uf_Emissao_Documento.toUpperCase(),
    };
  }

  #endereco(proposalData) {
    return {
      logradouro: proposalData.Logradouro,
      numero: proposalData.Numero_Endereco,
      complemento: proposalData.Complemento,
      cep: proposalData.CEP,
      bairro: proposalData.Bairro,
      cidade: proposalData.Cidade,
      uf: proposalData.Uf.toUpperCase(),
    };
  }

  #credenciais(proposalData) {
    return {
      loginConsig: proposalData.Usuario,
      senhaConsig: proposalData.Senha,
      token: proposalData.Token,
    };
  }

  execute(proposalData) {
    const result = {
      dadosProposta: this.#dadosProposta(proposalData),
      dadosBancarios: this.#dadosBancarios(proposalData),
      dadosPessoais: this.#dadosPessoais(proposalData),
      celular: this.#celular(proposalData),
      identidade: this.#identidade(proposalData),
      endereco: this.#endereco(proposalData),
      credenciais: this.#credenciais(proposalData),
    };
    return result;
  }
}

module.exports = ProposalConverterBMG;
