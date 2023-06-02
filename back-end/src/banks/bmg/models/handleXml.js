require('dotenv').config();

const login = process.env.BMG_LOGIN;
const password = process.env.BMG_PASSWORD;

const buildXmlToRequest = (body) => (
  `<soapenv:Envelope
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:web="http://webservice.econsig.bmg.com">
    <soapenv:Header/>
    ${body}
  </soapenv:Envelope>`
);

const getAvailableCardBody = (codigoEntidade, cpf, sequencialOrgao) => (
  `<soapenv:Body>
    <web:buscarCartoesDisponiveis soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <param xsi:type="web:CartaoDisponivelParameter">
        <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${login}</login>
        <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${password}</senha>
        <codigoEntidade xsi:type="xsd:int">${codigoEntidade}</codigoEntidade>
        <cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${cpf}</cpf>
        <sequencialOrgao xsi:type="soapenc:int" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${sequencialOrgao}</sequencialOrgao>
      </param>
    </web:buscarCartoesDisponiveis>
  </soapenv:Body>`
);

const getLimitCardBody = (availableCard) => {
  const {
    codigoEntidade, cpf, sequencialOrgao, matricula, numeroContaInterna,
  } = availableCard;

  return (
    `<soapenv:Body>
      <web:buscarLimiteSaque soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <param xsi:type="web:DadosCartaoParameter">
          <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${login}</login>
          <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${password}</senha>
          <codigoEntidade xsi:type="xsd:int">${codigoEntidade}</codigoEntidade>
          <cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${cpf}</cpf>
          <sequencialOrgao xsi:type="soapenc:int" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${sequencialOrgao}</sequencialOrgao>
          <tipoSaque xsi:type="xsd:int">1</tipoSaque>
          <matricula xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${matricula}</matricula>
          <numeroContaInterna xsi:type="xsd:long">${numeroContaInterna}</numeroContaInterna>
        </param>
      </web:buscarLimiteSaque>
    </soapenv:Body>`
  );
};

const createBodyWithdrawalLimit = (payload) => {
  const cpf = '12345678901';
  const matricula = 12345;
  const grauInstrucao = '7';
  const ddd = '31';
  const numero = '00000000';
  const ramal = '';
  const {
    dataNascimento,
    valorMargem,
    codigoEntidade,
    sequencialOrgao,
  } = payload;

  return (
    `<soapenv:Body>
      <web:buscarLimiteSaque soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <param xsi:type="web:BuscarLimiteSaqueParameter">
          <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${login}</login>
          <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${password}</senha>
          <cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${cpf}</cpf>
          <matricula xsi:type="soapenc:string">${matricula}</matricula>
          <dataNascimento xsi:type="xsd:dateTime">${dataNascimento}</dataNascimento>
          <grauInstrucao xsi:type="soapenc:string">${grauInstrucao}</grauInstrucao>
          <valorMargem xsi:type="xsd:double">${valorMargem}</valorMargem>
          <codigoEntidade xsi:type="soapenc:string">${codigoEntidade}</codigoEntidade>
          <sequencialOrgao xsi:type="soapenc:int">${sequencialOrgao}</sequencialOrgao>
          <telefone xsi:type="web:TelefoneParameter">
            <ddd xsi:type="soapenc:string">${ddd}</ddd>
            <numero xsi:type="soapenc:string">${numero}</numero>
            <ramal xsi:type="soapenc:string">${ramal}</ramal>
          </telefone>
        </param>
      </web:buscarLimiteSaque>
    </soapenv:Body>`
  );
};

module.exports = {
  getLimitCardBody,
  buildXmlToRequest,
  getAvailableCardBody,
  createBodyWithdrawalLimit,
};
