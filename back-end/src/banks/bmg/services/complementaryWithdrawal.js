const libxmljs = require('libxmljs');
const { NotFound, Forbiden } = require('../../../helpers/httpStatus');

const { codigoEntidadeObj } = require('../enums');
const complementaryWithdrawal = require('../models/complementaryWithdrawal');

const getAvailableCard = async (cpf) => {
  const codigoEntidade = Object
    .keys(codigoEntidadeObj)
    .map((key) => parseInt(key, 10))
    .sort((a, b) => b - a);
  
  const response = {
    codigoEntidade: 0,
    sequencialOrgao: 0,
    body: '',
  };
  
  let availableCardResponse = '';
  for (let index = 0; index < codigoEntidade.length; index += 1) {
    const sequencialOrgao = (codigoEntidade[index] !== 128) ? 1 : 13;
    availableCardResponse = await complementaryWithdrawal.getAvailableCard(codigoEntidade[index], cpf, sequencialOrgao);
    response.body = availableCardResponse;
    
    const xmlDoc = libxmljs.parseXml(availableCardResponse);
    const cartoesRetorno = xmlDoc.get('//cartoesRetorno');
    if (cartoesRetorno) {
      response.codigoEntidade = codigoEntidade[index];
      response.sequencialOrgao = sequencialOrgao;
      break;
    }
  }

  const availableCard = convertAvailableCardData(response.body);
  verifyAvailableCard(availableCard);

  const result = {
    codigoEntidade: response.codigoEntidade,
    cpf: cpf,
    sequencialOrgao: response.sequencialOrgao,
    matricula: availableCard.matricula,
    numeroContaInterna: availableCard.numeroContaInterna,
  };

  return result;
};

const convertAvailableCardData = (availableCard) => {
  const xmlDoc = libxmljs.parseXml(availableCard);

  const faultstring = xmlDoc.get('//faultstring');
  if(faultstring) {
    throw {
      status: NotFound,
      message: faultstring.text(),
    }
  }

  const cpfImpedidoComissionar = xmlDoc.get('//cpfImpedidoComissionar');
  const liberado = xmlDoc.get('//liberado');
  const matricula = xmlDoc.get('//matricula');
  const numeroContaInterna = xmlDoc.get('//numeroContaInterna');

  const availableCards = {
    cpfImpedidoComissionar: Boolean(cpfImpedidoComissionar.text() === 'true'),
    liberado: Boolean(liberado.text() === 'true'),
    matricula: matricula.text(),
    numeroContaInterna: numeroContaInterna.text(),
  };
  return availableCards;
}

const verifyAvailableCard = (dataCard) => {
  if (dataCard.cpfImpedidoComissionar) {
    throw {
      status: Forbiden,
      message: 'Cliente impedido de comissionar',
    };
  }

  if (!dataCard.liberado) {
    throw {
      status: Forbiden,
      message: 'Cliente não liberado',
    };
  }
}

const convertCardLimitData = (cardLimit) => {
  const xmlDoc = libxmljs.parseXml(cardLimit);

  const faultstring = xmlDoc.get('//faultstring');
  if(faultstring) {
    throw {
      status: NotFound,
      message: faultstring.text(),
    }
  }

  const limiteCartao = xmlDoc.get('//limiteCartao');
  const limiteDisponivel = xmlDoc.get('//limiteDisponivel');
  const valorSaqueMaximo = xmlDoc.get('//valorSaqueMaximo');

  const availableCards = {
    limiteCartao: parseFloat(limiteCartao.text()),
    limiteDisponivel: parseFloat(limiteDisponivel.text()),
    valorSaqueMaximo: parseFloat(valorSaqueMaximo.text()),
  };
  return availableCards;
}

const verifyCardLimit = (CardLimitData) => {
  if (CardLimitData.limiteDisponivel < 500) {
    throw {
      status: Forbiden,
      message: 'Limite disponível inferior a R$ 500,00',
    };
  }
}

const getCardLimit = async (cpf) => {
  const availableCard = await getAvailableCard(cpf);
  const cardLimitResult = await complementaryWithdrawal.getCardLimit(availableCard);
  const cardLimitData = convertCardLimitData(cardLimitResult);
  verifyCardLimit(cardLimitData);
  const result = {
    cpf,
    entity: codigoEntidadeObj[availableCard.codigoEntidade],
    cardLimit: cardLimitData.limiteCartao,
    availableLimit: cardLimitData.limiteDisponivel,
    maximumWithdraw: cardLimitData.valorSaqueMaximo,
  };
  return result;
}

module.exports = {
  getCardLimit,
};
