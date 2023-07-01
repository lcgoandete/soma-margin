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
  const tipoSaque = 1;
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
          <tipoSaque xsi:type="xsd:int">${tipoSaque}</tipoSaque>
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

const createBodyRegisterProposalCard = (payload) => {
  const { teste } = payload;

  return (
    `<soapenv:Body>
      <web:gravarPropostaCartao soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <proposta xsi:type="web:CartaoParameter">
          <login xsi:type="soapenc:string">${login}</login>
          <senha xsi:type="soapenc:string">${password}</senha>
          <aberturaContaPagamento xsi:type="xsd:int">0</aberturaContaPagamento>
          <agencia xsi:type="web:AgenciaParameter">
            <digitoVerificador xsi:type="soapenc:string"></digitoVerificador>
            <numero xsi:type="soapenc:string">1</numero>
          </agencia>
          <banco xsi:type="web:BancoParameter">
            <numero xsi:type="xsd:int">1</numero>
          </banco>
          <bancoOrdemPagamento xsi:type="xsd:int">0</bancoOrdemPagamento>
          <cliente xsi:type="web:ClienteParameter">
            <celular1 xsi:type="web:TelefoneParameter">
              <ddd xsi:type="soapenc:string">31</ddd>
              <numero xsi:type="soapenc:string">000000000</numero>
              <ramal xsi:type="soapenc:string"></ramal>
            </celular1>
            <cidadeNascimento xsi:type="soapenc:string">${teste}</cidadeNascimento>
            <dataNascimento xsi:type="xsd:dateTime">1956-10-21T05:00:00</dataNascimento>
            <email xsi:type="soapenc:string"></email>
            <endereco xsi:type="web:EnderecoParamter">
              <bairro xsi:type="soapenc:string">Santo Agostinho</bairro>
              <cep xsi:type="soapenc:string">30170914</cep>
              <cidade xsi:type="soapenc:string">Belo Horizonte</cidade>
              <complemento xsi:type="soapenc:string">Sala301</complemento>
              <logradouro xsi:type="soapenc:string">Rua Matias Cardoso</logradouro>
              <numero xsi:type="soapenc:string">63</numero>
              <uf xsi:type="soapenc:string">MG</uf>
            </endereco>
            <estadoCivil xsi:type="soapenc:string">C</estadoCivil>
            <grauInstrucao xsi:type="soapenc:string">7</grauInstrucao>
            <identidade xsi:type="web:IdentidadeParameter">
              <dataEmissao xsi:type="xsd:dateTime">2008-11-24T05:00:00</dataEmissao>
              <emissor xsi:type="soapenc:string">SSP</emissor>
              <numero xsi:type="soapenc:string">0000</numero>
              <tipo xsi:type="soapenc:string">CNH</tipo>
              <uf xsi:type="soapenc:string">MG</uf>
            </identidade>
            <nacionalidade xsi:type="soapenc:string">BRASILEIRA</nacionalidade>
            <nome xsi:type="soapenc:string">teste teste </nome>
            <nomeConjuge xsi:type="soapenc:string">teste teste </nomeConjuge>
            <nomeMae xsi:type="soapenc:string">teste teste </nomeMae>
            <nomePai xsi:type="soapenc:string">teste teste</nomePai>
            <sexo xsi:type="soapenc:string">M</sexo>
            <telefone xsi:type="web:TelefoneParameter">
              <ddd xsi:type="soapenc:string">31</ddd>
              <numero xsi:type="soapenc:string">00000000</numero>
              <ramal xsi:type="soapenc:string"></ramal>
            </telefone>
            <ufNascimento xsi:type="soapenc:string">MG</ufNascimento>
          </cliente>
          <codEnt xsi:type="soapenc:int"/>
          <codigoEntidade xsi:type="soapenc:string">164-11</codigoEntidade>
          <codigoFormaEnvioTermo xsi:type="soapenc:string">15</codigoFormaEnvioTermo>
          <codigoLoja xsi:type="soapenc:int">0000</codigoLoja>
          <codigoServico xsi:type="soapenc:string">080</codigoServico>
          <codigoSituacaoServidor xsi:type="soapenc:int">1</codigoSituacaoServidor>
          <conta xsi:type="web:ContaParameter">
            <digitoVerificador xsi:type="soapenc:string">1</digitoVerificador>
            <numero xsi:type="soapenc:string">10110</numero>
          </conta>
          <cpf xsi:type="soapenc:string">00000000000</cpf>
          <dataAdmissao xsi:type="xsd:dateTime">2018-02-28T00:00:00</dataAdmissao>
          <dataRenda xsi:type="xsd:dateTime">2018-02-28T00:00:00</dataRenda>
          <finalidadeCredito xsi:type="xsd:int">1</finalidadeCredito>
          <formaCredito xsi:type="xsd:int">2</formaCredito>
          <loginConsig xsi:type="soapenc:string">teste.01</loginConsig>
          <margem xsi:type="xsd:double">50</margem>
          <matricula xsi:type="soapenc:string">14361</matricula>
          <matriculaInstituidor xsi:type="soapenc:string"></matriculaInstituidor>
          <seguros xsi:type="web:ArrayOfSeguro" soapenc:arrayType="web:Seguro[]"/>
          <senhaConsig xsi:type="soapenc:string">zzz</senhaConsig>
          <sequencialOrgao xsi:type="soapenc:int">11</sequencialOrgao>
          <tipoDomicilioBancario xsi:type="soapenc:short">1</tipoDomicilioBancario>
          <unidadePagadora xsi:type="soapenc:string">12160</unidadePagadora>
          <valorRenda xsi:type="xsd:double">954</valorRenda>
          <valorSolicitado xsi:type="xsd:double">500</valorSolicitado>
          <tipoSaque xsi:type="soapenc:int">1</tipoSaque>
          <valorParcela xsi:type="soapenc:double">0</valorParcela>
          <valorSaque xsi:type="soapenc:double">500</valorSaque>
        </proposta>
      </web:gravarPropostaCartao>
    </soapenv:Body>`
  );
};

module.exports = {
  getLimitCardBody,
  buildXmlToRequest,
  getAvailableCardBody,
  createBodyWithdrawalLimit,
  createBodyRegisterProposalCard,
};
