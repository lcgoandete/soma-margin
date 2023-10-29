const withdrawalLimit = require('../models/withdrawal-limit');
const { InternalServerError, BadRequest } = require('../../../helpers/httpStatus');

const xmlToJson = (xmlString) => {
  if (xmlString === '') {
    const newError = {
      status: InternalServerError,
      message: 'XML inválido.',
    };
    throw newError;
  }

  const regexFaultString = /<faultstring>(.*?)<\/faultstring>/;
  const faultStringMatch = xmlString.match(regexFaultString);
  const faultString = faultStringMatch ? faultStringMatch[1] : null;
  if (faultString) {
    const newError = {
      status: BadRequest,
      message: faultString,
    };
    throw newError;
  }

  const regexMensagemDeErro = /<mensagemDeErro xsi:type="soapenc:string".+?>(.+?)<\/mensagemDeErro>/;
  const mensagemDeErroMatch = xmlString.match(regexMensagemDeErro);
  const mensagemDeErro = mensagemDeErroMatch ? mensagemDeErroMatch[1] : null;
  if (mensagemDeErro) {
    const newError = {
      status: BadRequest,
      message: mensagemDeErro,
    };
    throw newError;
  }

  const regexTaxaJurosAnual = /<taxaJurosAnual xsi:type="xsd:double">([\d.]+)<\/taxaJurosAnual>/;
  const taxaJurosAnualMatch = xmlString.match(regexTaxaJurosAnual);
  const taxaJurosAnual = taxaJurosAnualMatch ? taxaJurosAnualMatch[1] : null;

  const regexTaxaJurosMensal = /<taxaJurosMensal xsi:type="xsd:double">([\d.]+)<\/taxaJurosMensal>/;
  const taxaJurosMensalMatch = xmlString.match(regexTaxaJurosMensal);
  const taxaJurosMensal = taxaJurosMensalMatch ? taxaJurosMensalMatch[1] : null;

  const regexValorCetAnual = /<valorCetAnual xsi:type="xsd:double">([\d.]+)<\/valorCetAnual>/;
  const valorCetAnualMatch = xmlString.match(regexValorCetAnual);
  const valorCetAnual = valorCetAnualMatch ? valorCetAnualMatch[1] : null;

  const regexValorCetMensal = /<valorCetMensal xsi:type="xsd:double">([\d.]+)<\/valorCetMensal>/;
  const valorCetMensalMatch = xmlString.match(regexValorCetMensal);
  const valorCetMensal = valorCetMensalMatch ? valorCetMensalMatch[1] : null;

  const regexLimiteCartao = /<limiteCartao xsi:type="xsd:double">([\d.]+)<\/limiteCartao>/;
  const limiteCartaoMatch = xmlString.match(regexLimiteCartao);
  const limiteCartao = limiteCartaoMatch ? limiteCartaoMatch[1] : null;

  const regexValorMargem = /<valorMargem xsi:type="xsd:double">([\d.]+)<\/valorMargem>/;
  const valorMargemMatch = xmlString.match(regexValorMargem);
  const valorMargem = valorMargemMatch ? valorMargemMatch[1] : null;

  const regexValorSaqueMaximo = /<valorSaqueMaximo xsi:type="xsd:double">([\d.]+)<\/valorSaqueMaximo>/;
  const valorSaqueMaximoMatch = xmlString.match(regexValorSaqueMaximo);
  const valorSaqueMaximo = valorSaqueMaximoMatch ? valorSaqueMaximoMatch[1] : null;

  const regexValorSaqueMinimo = /<valorSaqueMinimo xsi:type="xsd:double">([\d.]+)<\/valorSaqueMinimo>/;
  const valorSaqueMinimoMatch = xmlString.match(regexValorSaqueMinimo);
  const valorSaqueMinimo = valorSaqueMinimoMatch ? valorSaqueMinimoMatch[1] : null;

  const withdrawalLimitObj = {
    taxaJurosAnual: parseFloat(taxaJurosAnual),
    taxaJurosMensal: parseFloat(taxaJurosMensal),
    valorCetAnual: parseFloat(valorCetAnual),
    valorCetMensal: parseFloat(valorCetMensal),
    limiteCartao: parseFloat(limiteCartao),
    valorMargem: parseFloat(valorMargem),
    valorSaqueMaximo: parseFloat(valorSaqueMaximo),
    valorSaqueMinimo: parseFloat(valorSaqueMinimo),
  };

  return withdrawalLimitObj;
};

const getWithdrawalLimit = async (payload) => {
  const response = await withdrawalLimit.getWithdrawalLimit(payload);
  return xmlToJson(response);
};

const getBenefitCardWithdrawalLimit = async (payload) => {
  const newPayload = {
    cpf: '12345678901',
    matricula: '12345',
    grauInstrucao: '7',
    ddd: '31',
    numero: '00000000',
    ramal: '',
    dataNascimento: payload.dataNascimento,
    valorMargem: parseFloat(payload.valorMargem),
    codigoEntidade: payload.codigoEntidade,
    sequencialOrgao: parseInt(payload.sequencialOrgao, 10),
  };
  const response = await withdrawalLimit.getBenefitCardWithdrawalLimit(newPayload);
  return xmlToJson(response);
};

module.exports = {
  getWithdrawalLimit,
  getBenefitCardWithdrawalLimit,
};
