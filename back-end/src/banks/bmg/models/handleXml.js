require('dotenv').config();

const login = process.env.BMG_LOGIN;
const password = process.env.BMG_PASSWORD;

const buildXmlToRequest = (body) => {
  return `
    <soapenv:Envelope
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema"
      xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:web="http://webservice.econsig.bmg.com">
      <soapenv:Header/>
      ${body}
    </soapenv:Envelope>
  `;
}

const getAvailableCardBody = (codigoEntidade, cpf, sequencialOrgao) => {
  return `
    <soapenv:Body>
      <web:buscarCartoesDisponiveis soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <param xsi:type="web:CartaoDisponivelParameter">
          <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${login}</login>
          <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${password}</senha>
          <codigoEntidade xsi:type="xsd:int">${codigoEntidade}</codigoEntidade>
          <cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${cpf}</cpf>
          <sequencialOrgao xsi:type="soapenc:int" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${sequencialOrgao}</sequencialOrgao>
        </param>
      </web:buscarCartoesDisponiveis>
    </soapenv:Body>
  `;
}

const getLimitCardBody = (availableCard) => {
  const { codigoEntidade, cpf, sequencialOrgao, matricula, numeroContaInterna } = availableCard;
  return `
    <soapenv:Body>
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
    </soapenv:Body>
  `;
}

module.exports = {
  getAvailableCardBody,
  getLimitCardBody,
  buildXmlToRequest,
};
