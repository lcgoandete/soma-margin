const libxmljs = require('libxmljs');

const { delay } = require('../../../helpers/helpers');
const complementaryWithdrawal = require('../model/complementaryWithdrawal');

const getAvailableCard = async (cpf) => {
  const codigoEntidade = [4195, 4194, 4193];
  const sequencialOrgao = 1;
  
  let counter = 0;
  let response = {};
  do {
    response = await complementaryWithdrawal.getAvailableCard(codigoEntidade[counter], cpf, sequencialOrgao);
    for (const [key, value] of Object.entries(response)) {
      if(key === 'body') {
        const result = {
          codigoEntidade: codigoEntidade[counter],
          sequencialOrgao: sequencialOrgao,
          body: value,
        };
        return result;
      };
    };
    counter += 1;
    await delay(1);
  } while (counter < codigoEntidade.length);
  
  const result = {
    body: response.data,
  };
  return result;
};

const convertAvailableCardData = (availableCard) => {
  const xmlDoc = libxmljs.parseXml(availableCard);

  const faultstring = xmlDoc.get('//faultstring');
  if(faultstring) {
    throw {
      status: 404,
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
      status: 403,
      message: 'Cliente impedido de comissionar',
    };
  }

  if (!dataCard.liberado) {
    throw {
      status: 403,
      message: 'Cliente não liberado',
    };
  }
}

const convertCardLimitData = (cardLimit) => {
  const xmlDoc = libxmljs.parseXml(cardLimit);

  const faultstring = xmlDoc.get('//faultstring');
  if(faultstring) {
    throw {
      status: 404,
      message: faultstring.text(),
    }
  }

  const limiteCartao = xmlDoc.get('//limiteCartao');
  const limiteDisponivel = xmlDoc.get('//limiteDisponivel');
  const valorSaqueMaximo = xmlDoc.get('//valorSaqueMaximo');

  const availableCards = {
    limiteCartao: Number(limiteCartao.text()),
    limiteDisponivel: Number(limiteDisponivel.text()),
    valorSaqueMaximo: Number(valorSaqueMaximo.text()),
  };
  return availableCards;
}

const verifyCardLimit = (CardLimitData) => {
  if (CardLimitData.limiteDisponivel < 500) {
    throw {
      status: 403,
      message: 'Limite disponível inferior a R$ 500,00',
    };
  }
}

const getCardLimit = async (cpf) => {
  const availableCard = await getAvailableCard(cpf);
  const dataCard = convertAvailableCardData(availableCard.body);
  verifyAvailableCard(dataCard);
  
  const payloadCardLimit = {
    codigoEntidade: availableCard.codigoEntidade,
    cpf: cpf,
    sequencialOrgao: availableCard.sequencialOrgao,
    matricula: dataCard.matricula,
    numeroContaInterna: dataCard.numeroContaInterna,
  };

  const cardLimitResult = await complementaryWithdrawal.getCardLimit(payloadCardLimit);
  const cardLimitData = convertCardLimitData(cardLimitResult);
  verifyCardLimit(cardLimitData);
  const result = {
    cardLimit: cardLimitData.limiteCartao,
    availableLimit: cardLimitData.limiteDisponivel,
    maximumWithdraw: cardLimitData.valorSaqueMaximo,
  };
  return result;
}

module.exports = {
  getCardLimit,
};