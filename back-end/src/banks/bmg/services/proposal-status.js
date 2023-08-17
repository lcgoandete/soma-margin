const moment = require('moment');
const { decode } = require('html-entities');

const Pipefy = require('../../../common/services/Pipefy');
const proposalStatus = require('../models/proposal-status');

const extractDataFromErrorResponse = (error) => {
  const { data } = error.response;
  let newData = decode(data);
  newData = newData.replace(/\s{2,}/g, '');

  const regexFaultString = /<faultstring>(.*?)<\/faultstring>/;
  const faultStringMatch = newData.match(regexFaultString);

  if (faultStringMatch) {
    return faultStringMatch[1];
  }

  const teste = {
    message: '- não foi possíel extrair a resposta de erro',
    erro: newData,
  };
  return teste;
};

const proposalStatusToJsonConverter = (proposalStatusResult) => {
  let proposalStatusXml = decode(proposalStatusResult);

  const removeSpaces = /\s{2,}/g;
  proposalStatusXml = proposalStatusXml.replace(removeSpaces, '');

  const removeHeader = /(<\?xml version="1\.0" encoding="UTF-8"\?><soapenv:Envelope xmlns:soapenv="http:\/\/schemas\.xmlsoap\.org\/soap\/envelope\/" xmlns:xsd="http:\/\/www\.w3\.org\/2001\/XMLSchema" xmlns:xsi="http:\/\/www\.w3\.org\/2001\/XMLSchema-instance"><soapenv:Body><ns1:consultaStatusAdeResponse soapenv:encodingStyle="http:\/\/schemas\.xmlsoap\.org\/soap\/encoding\/" xmlns:ns1="http:\/\/webservice\.econsig\.bmg\.com"><consultaStatusAdeReturn xsi:type="ns1:ConsultaStatusAdeRetorno"><listaStatus soapenc:arrayType="ns1:StatusAdeParameter(.*?)" xsi:type="soapenc:Array" xmlns:soapenc="http:\/\/schemas\.xmlsoap\.org\/soap\/encoding\/">(.*?)<\/consultaStatusAdeReturn><\/ns1:consultaStatusAdeResponse><\/soapenv:Body><\/soapenv:Envelope>)/gi;
  proposalStatusXml = proposalStatusXml.replace(removeHeader, '$3');

  const removeListStatus = /(<listaStatus xsi:type="ns1:StatusAdeParameter">(.*?)<\/listaStatus>)/gi;
  proposalStatusXml = proposalStatusXml.replace(removeListStatus, '$2');

  const getAttributes = /(<codigoStatus xsi:type="soapenc:string">(.*?)<\/codigoStatus>)(<cpfCliente xsi:type="soapenc:string">(.*?)<\/cpfCliente>)(<data xsi:type="xsd:dateTime">(.*?)<\/data>)(<nomeCliente xsi:type="soapenc:string">(.*?)<\/nomeCliente>)(<numero xsi:type="soapenc:string">(.*?)<\/numero>)(<status xsi:type="soapenc:string">(.*?)<\/status>)(<valor xsi:type="soapenc:double">(.*?)<\/valor>)/ig;
  proposalStatusXml = proposalStatusXml.replace(getAttributes, '{"codigoStatus": "$2", "cpfCliente": "$4", "data": "$6", "nomeCliente": "$8", "numero": "$10", "status": "$12", "valor": $14},');

  const removeLastItem = /,<\/listaStatus>/gi;
  proposalStatusXml = proposalStatusXml.replace(removeLastItem, '');

  const proposalStatusJson = JSON.parse(`[${proposalStatusXml}]`);

  return proposalStatusJson;
};

const getProposalStatus = async () => {
  try {
    let finalDate = moment();
    finalDate = moment(finalDate).add(1, 'd');

    let initialDate = moment(finalDate).subtract(7, 'd');
    initialDate = initialDate.format('YYYY-MM-DDT00:00:00');
    finalDate = finalDate.format('YYYY-MM-DDT00:00:00');

    const pipefy = new Pipefy();
    const credentialsCard = await pipefy.getCredentials();
    const credentials = pipefy.pipefyCardToJSON(credentialsCard);
    const newCredentials = { loginConsig: credentials.Usuario, senhaConsig: credentials.Senha };

    const payload = { initialDate, finalDate, ...newCredentials };
    const proposalStatusResult = await proposalStatus.getProposalStatus(payload);

    const proposalStatusJson = proposalStatusToJsonConverter(proposalStatusResult);
    return proposalStatusJson;
  } catch (error) {
    if (error.response) {
      throw Error(extractDataFromErrorResponse(error));
    }
    throw Error(error);
  }
};

module.exports = {
  getProposalStatus,
};
