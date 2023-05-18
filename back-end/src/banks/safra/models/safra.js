require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const axios = require('axios');
const moment = require('moment');

const { SAFRA_API_URL, SAFRA_API_USERNAME, SAFRA_API_PASSWORD } = process.env;

const authentication = {
  accessToken: '',
  tokenLifeMinute: moment('210000', 'HHmmss'),
};

const getAccessToken = async () => {
  const { data } = await axios({
    method: 'POST',
    url: `${SAFRA_API_URL}/Token`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: `${SAFRA_API_USERNAME}`,
      password: `${SAFRA_API_PASSWORD}`,
    },
  });
  authentication.accessToken = data.token;
  authentication.tokenLifeMinute = moment();
};

const checkToken = async () => {
  const tokenDuration = 28;
  const currentTime = moment();
  const duration = moment.duration(currentTime.diff(authentication.tokenLifeMinute));
  const durationInMinutes = parseInt((duration.hours() * 60) + duration.minutes(), 10);

  if (durationInMinutes > tokenDuration || durationInMinutes < 0) {
    await getAccessToken();
  }
};

const getAgreements = async (cpf) => {
  await checkToken();
  const { data } = await axios({
    method: 'GET',
    url: `${SAFRA_API_URL}/ContratosDadosCadastrais/cpf/${cpf}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authentication.accessToken}`,
    },
  });
  return data;
};

const getFormalization = async (idAgreement) => {
  const { data } = await axios({
    method: 'GET',
    url: `${SAFRA_API_URL}/AcompanhamentoFormalizacao?idProposta=${idAgreement}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authentication.accessToken}`,
    },
  });
  return data;
};

const getFgtsBalance = async (cpf) => {
  await checkToken();
  const { data } = await axios({
    method: 'GET',
    url: `${SAFRA_API_URL}/Fgts?idCliente=${cpf}&tpProduto=2`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authentication.accessToken}`,
    },
  });
  return data;
};

const getSimulation = async (payload) => {
  await checkToken();
  const { data } = await axios({
    method: 'POST',
    url: `${SAFRA_API_URL}/Calculo/Novo`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authentication.accessToken}`,
    },
    data: payload,
  });
  return data;
};

const getRole = async (idProfissao) => {
  await checkToken();
  const { data } = await axios({
    method: 'GET',
    url: `${SAFRA_API_URL}/Cargo/${idProfissao}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authentication.accessToken}`,
    },
  });
  return data;
};

const sendProposal = async (proposal) => {
  await checkToken();
  const { data } = await axios({
    method: 'POST',
    url: `${SAFRA_API_URL}/Propostas/Novo`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authentication.accessToken}`,
    },
    data: proposal,
  });
  return data;
};

const sendApproveStop = async (proposalId) => {
  await checkToken();
  const { data } = await axios({
    method: 'POST',
    url: `${SAFRA_API_URL}/ParadinhaCorrespondente/aprova/${proposalId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authentication.accessToken}`,
    },
  });
  return data;
};

const includeDocumentInProposal = async (payload) => {
  await checkToken();

  const {
    proposalId, idDocumento, nomeArquivo, conteudoArquivo,
  } = payload;

  const { data } = await axios({
    method: 'POST',
    url: `${SAFRA_API_URL}/Propostas/${proposalId}/DocumentoAnexo`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${authentication.accessToken}`,
    },
    data: {
      idDocumento, nomeArquivo, conteudoArquivo,
    },
  });
  return data;
};

const getMargin = async (payload) => {
  await checkToken();
  const { data } = await axios({
    method: 'POST',
    url: `${SAFRA_API_URL}/ConsultaMargem/Bpo`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authentication.accessToken}`,
    },
    data: payload,
  });
  return data;
};

const setSimulationSettings = async (taxaJuros) => {
  const {
    newTaxaJurosSefaz, newTaxaJurosPM, newTaxaJurosSpprev, newTaxaJurosPrefSP,
  } = taxaJuros;
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      taxa_juros_sefaz: newTaxaJurosSefaz,
      taxa_juros_pm: newTaxaJurosPM,
      taxa_juros_spprev: newTaxaJurosSpprev,
      taxa_juros_prefsp: newTaxaJurosPrefSP,
    },
    create: {
      taxa_juros_sefaz: newTaxaJurosSefaz,
      taxa_juros_pm: newTaxaJurosPM,
      taxa_juros_spprev: newTaxaJurosSpprev,
      taxa_juros_prefsp: newTaxaJurosPrefSP,
    },
  });
};

const getSimulationSettings = async () => {
  const result = await prisma.settings.findUnique({ where: { id: 1 } });
  return {
    taxaJurosSefaz: result.taxa_juros_sefaz,
    taxaJurosPM: result.taxa_juros_pm,
    taxaJurosSpprev: result.taxa_juros_spprev,
    taxaJurosPrefSP: result.taxa_juros_prefsp,
  };
};

module.exports = {
  getRole,
  getMargin,
  sendProposal,
  getAgreements,
  getSimulation,
  getFgtsBalance,
  sendApproveStop,
  getFormalization,
  setSimulationSettings,
  getSimulationSettings,
  includeDocumentInProposal,
};
