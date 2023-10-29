require('dotenv').config();

const {
  BMG_LOGIN, BMG_PASSWORD, BMG_LOGIN_WEBSERVICE, BMG_PASSWORD_WEBSERVICE,
} = process.env;

const minifyXML = (rawXML) => rawXML.replace(/\s{2,}/g, '');

const getAvailableCardXML = (codigoEntidade, cpf, sequencialOrgao) => {
  const rawXML = ''
    .concat('<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ')
    .concat('xmlns:xsd="http://www.w3.org/2001/XMLSchema" ')
    .concat('xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ')
    .concat('xmlns:web="http://webservice.econsig.bmg.com">')
    .concat(`<soapenv:Header/>
      <soapenv:Body>
        <web:buscarCartoesDisponiveis soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <param xsi:type="web:CartaoDisponivelParameter">
            <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_LOGIN}</login>
            <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_PASSWORD}</senha>
            <codigoEntidade xsi:type="xsd:int">${codigoEntidade}</codigoEntidade>
            <cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${cpf}</cpf>
            <sequencialOrgao xsi:type="soapenc:int" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${sequencialOrgao}</sequencialOrgao>
          </param>
        </web:buscarCartoesDisponiveis>
      </soapenv:Body>
    </soapenv:Envelope>`);

  return minifyXML(rawXML);
};

const getLimitCardXML = (availableCard) => {
  const tipoSaque = 1;
  const {
    codigoEntidade, cpf, sequencialOrgao, matricula, numeroContaInterna,
  } = availableCard;

  const rawXML = ''
    .concat('<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ')
    .concat('xmlns:xsd="http://www.w3.org/2001/XMLSchema" ')
    .concat('xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ')
    .concat('xmlns:web="http://webservice.econsig.bmg.com">')
    .concat(`<soapenv:Header/>
      <soapenv:Body>
        <web:buscarLimiteSaque soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <param xsi:type="web:DadosCartaoParameter">
            <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_LOGIN}</login>
            <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_PASSWORD}</senha>
            <codigoEntidade xsi:type="xsd:int">${codigoEntidade}</codigoEntidade>
            <cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${cpf}</cpf>
            <sequencialOrgao xsi:type="soapenc:int" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${sequencialOrgao}</sequencialOrgao>
            <tipoSaque xsi:type="xsd:int">${tipoSaque}</tipoSaque>
            <matricula xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${matricula}</matricula>
            <numeroContaInterna xsi:type="xsd:long">${numeroContaInterna}</numeroContaInterna>
          </param>
        </web:buscarLimiteSaque>
      </soapenv:Body>
    </soapenv:Envelope>`);

  return minifyXML(rawXML);
};

const createWithdrawalLimitXML = (payload) => {
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

  const rawXML = ''
    .concat('<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ')
    .concat('xmlns:xsd="http://www.w3.org/2001/XMLSchema" ')
    .concat('xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ')
    .concat('xmlns:web="http://webservice.econsig.bmg.com">')
    .concat(`<soapenv:Header/>
      <soapenv:Body>
        <web:buscarLimiteSaque soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <param xsi:type="web:BuscarLimiteSaqueParameter">
            <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_LOGIN}</login>
            <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_PASSWORD}</senha>
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
      </soapenv:Body>
    </soapenv:Envelope>`);

  const xml = rawXML.replace(/\s{2,}/g, '');
  return xml;
};

const createBenefitCardWithdrawalLimitXML = (payload) => {
  const rawXML = ''
    .concat('<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ')
    .concat('xmlns:xsd="http://www.w3.org/2001/XMLSchema" ')
    .concat('xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ')
    .concat('xmlns:web="http://webservice.econsig.bmg.com">')
    .concat(`<soapenv:Header/>
      <soapenv:Body>
        <web:buscarLimiteSaque soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <param xsi:type="web:BuscarLimiteSaqueParameter">
            <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_LOGIN_WEBSERVICE}</login>
            <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_PASSWORD_WEBSERVICE}</senha>
            <cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${payload.cpf}</cpf>
            <matricula xsi:type="soapenc:string">${payload.matricula}</matricula>
            <dataNascimento xsi:type="xsd:dateTime">${payload.dataNascimento}</dataNascimento>
            <grauInstrucao xsi:type="soapenc:string">${payload.grauInstrucao}</grauInstrucao>
            <valorMargem xsi:type="xsd:double">${payload.valorMargem}</valorMargem>
            <codigoEntidade xsi:type="soapenc:string">${payload.codigoEntidade}</codigoEntidade>
            <sequencialOrgao xsi:type="soapenc:int">${payload.sequencialOrgao}</sequencialOrgao>
            <telefone xsi:type="web:TelefoneParameter">
              <ddd xsi:type="soapenc:string">${payload.ddd}</ddd>
              <numero xsi:type="soapenc:string">${payload.numero}</numero>
              <ramal xsi:type="soapenc:string">${payload.ramal}</ramal>
            </telefone>
          </param>
        </web:buscarLimiteSaque>
      </soapenv:Body>
    </soapenv:Envelope>`);

  const xml = rawXML.replace(/\s{2,}/g, '');
  return xml;
};

const createProposalCardXML = (payload) => {
  const {
    dadosProposta, dadosBancarios, dadosPessoais, celular, identidade, endereco, credenciais,
  } = payload;
  const aberturaContaPagamento = 0;
  const bancoOrdemPagamento = 0;
  const dataAdmissao = '2011-02-02T00:00:00';
  const tipoSaque = 1;
  const unidadePagadora = '';
  const tipoDomicilioBancario = 1;
  const sequencialOrgao = '';
  const formaCredito = 2;
  const matriculaInstituidor = '';
  const codigoLoja = 55878;
  const codigoServico = '080';
  const tipoSeguro = 1;
  const codigoPlano = 128;
  const codigoFormaEnvioTermo = '21';

  const rawXML = ''
    .concat('<soapenv:Envelope ')
    .concat('xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ')
    .concat('xmlns:xsd="http://www.w3.org/2001/XMLSchema" ')
    .concat('xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ')
    .concat('xmlns:web="http://webservice.econsig.bmg.com" ')
    .concat('xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">')
    .concat(`<soapenv:Header/>
      <soapenv:Body>
        <web:gravarPropostaCartao soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <proposta xsi:type="web:CartaoParameter">
            <login xsi:type="soapenc:string">${BMG_LOGIN_WEBSERVICE}</login>
            <senha xsi:type="soapenc:string">${BMG_PASSWORD_WEBSERVICE}</senha>
            <aberturaContaPagamento xsi:type="xsd:int">${aberturaContaPagamento}</aberturaContaPagamento>
            <bancoOrdemPagamento xsi:type="xsd:int">${bancoOrdemPagamento}</bancoOrdemPagamento>
            <dataAdmissao xsi:type="xsd:dateTime">${dataAdmissao}</dataAdmissao>
            <tipoSaque xsi:type="soapenc:int">${tipoSaque}</tipoSaque>
            <unidadePagadora xsi:type="soapenc:string">${unidadePagadora}</unidadePagadora>
            <tipoDomicilioBancario xsi:type="soapenc:short">${tipoDomicilioBancario}</tipoDomicilioBancario>
            <sequencialOrgao xsi:type="soapenc:int">${sequencialOrgao}</sequencialOrgao>
            <formaCredito xsi:type="xsd:int">${formaCredito}</formaCredito>
            <matriculaInstituidor xsi:type="soapenc:string">${matriculaInstituidor}</matriculaInstituidor>
            <codigoLoja xsi:type="soapenc:int">${codigoLoja}</codigoLoja>
            <codigoServico xsi:type="soapenc:string">${codigoServico}</codigoServico>

            <seguros xsi:type="web:ArrayOfSeguro" soapenc:arrayType="web:Seguro[]">
              <seguro xsi:type="web:Seguro">
                <tipoSeguro>${tipoSeguro}</tipoSeguro>
                <codigoPlano xsi:type="xsd:int">${codigoPlano}</codigoPlano>
              </seguro>
            </seguros>

            <codigoFormaEnvioTermo xsi:type="soapenc:string">${codigoFormaEnvioTermo}</codigoFormaEnvioTermo>
            <loginConsig xsi:type="soapenc:string">${credenciais.loginConsig}</loginConsig>
            <senhaConsig xsi:type="soapenc:string">${credenciais.senhaConsig}</senhaConsig>
            <token xsi:type="soapenc:string">${credenciais.token}</token>

            <codigoEntidade xsi:type="soapenc:string">${dadosProposta.codigoEntidade}</codigoEntidade>
            <codigoSituacaoServidor xsi:type="soapenc:int">${dadosProposta.codigoSituacaoServidor}</codigoSituacaoServidor>
            <cpf xsi:type="soapenc:string">${dadosProposta.cpf}</cpf>
            <matricula xsi:type="soapenc:string">${dadosProposta.matricula}</matricula>
            <margem xsi:type="xsd:double">${dadosProposta.margem}</margem>
            <valorRenda xsi:type="xsd:double">${dadosProposta.valorRenda}</valorRenda>
            <dataRenda xsi:type="xsd:dateTime">${dadosProposta.dataRenda}</dataRenda>
            <valorSolicitado xsi:type="xsd:double">${dadosProposta.valorSaque}</valorSolicitado>
            <valorParcela xsi:type="soapenc:double">${dadosProposta.valorParcela}</valorParcela>
            <valorSaque xsi:type="soapenc:double">${dadosProposta.valorSaque}</valorSaque>

            <banco xsi:type="web:BancoParameter">
              <numero xsi:type="xsd:int">${dadosBancarios.banco}</numero>
            </banco>
            <agencia xsi:type="web:AgenciaParameter">
              <digitoVerificador xsi:type="soapenc:string">${dadosBancarios.digitoVerificadorDaAgencia}</digitoVerificador>
              <numero xsi:type="soapenc:string">${dadosBancarios.agencia}</numero>
            </agencia>
            <conta xsi:type="web:ContaParameter">
              <digitoVerificador xsi:type="soapenc:string">${dadosBancarios.digitoVerificadorDaConta}</digitoVerificador>
              <numero xsi:type="soapenc:string">${dadosBancarios.numeroDaConta}</numero>
            </conta>
            <finalidadeCredito xsi:type="xsd:int">${dadosBancarios.finalidadeCredito}</finalidadeCredito>

            <cliente xsi:type="web:ClienteParameter">
              <nome xsi:type="soapenc:string">${dadosPessoais.nome}</nome>
              <dataNascimento xsi:type="xsd:dateTime">${dadosPessoais.dataNascimento}</dataNascimento>
              <sexo xsi:type="soapenc:string">${dadosPessoais.sexo}</sexo>
              <email xsi:type="soapenc:string">${dadosPessoais.email}</email>
              <nomeMae xsi:type="soapenc:string">${dadosPessoais.nomeMae}</nomeMae>
              <nomePai xsi:type="soapenc:string">${dadosPessoais.nomePai}</nomePai>
              <estadoCivil xsi:type="soapenc:string">${dadosPessoais.estadoCivil}</estadoCivil>
              <nomeConjuge xsi:type="soapenc:string">${dadosPessoais.nomeConjuge}</nomeConjuge>
              <grauInstrucao xsi:type="soapenc:string">${dadosPessoais.grauInstrucao}</grauInstrucao>
              <nacionalidade xsi:type="soapenc:string">${dadosPessoais.nacionalidade}</nacionalidade>
              <ufNascimento xsi:type="soapenc:string">${dadosPessoais.ufNascimento}</ufNascimento>
              <cidadeNascimento xsi:type="soapenc:string">${dadosPessoais.cidadeNascimento}</cidadeNascimento>

              <celular1 xsi:type="web:TelefoneParameter">
                <ddd xsi:type="soapenc:string">${celular.ddd}</ddd>
                <numero xsi:type="soapenc:string">${celular.numero}</numero>
                <ramal xsi:type="soapenc:string"></ramal>
              </celular1>
              <telefone xsi:type="web:TelefoneParameter">
                <ddd xsi:type="soapenc:string"></ddd>
                <numero xsi:type="soapenc:string"></numero>
                <ramal xsi:type="soapenc:string"></ramal>
              </telefone>

              <identidade xsi:type="web:IdentidadeParameter">
                <dataEmissao xsi:type="xsd:dateTime">${identidade.dataEmissao}</dataEmissao>
                <emissor xsi:type="soapenc:string">${identidade.emissor}</emissor>
                <numero xsi:type="soapenc:string">${identidade.numero}</numero>
                <tipo xsi:type="soapenc:string">${identidade.tipo}</tipo>
                <uf xsi:type="soapenc:string">${identidade.uf}</uf>
              </identidade>

              <endereco xsi:type="web:EnderecoParamter">
                <logradouro xsi:type="soapenc:string">${endereco.logradouro}</logradouro>
                <numero xsi:type="soapenc:string">${endereco.numero}</numero>
                <complemento xsi:type="soapenc:string">${endereco.complemento}</complemento>
                <bairro xsi:type="soapenc:string">${endereco.bairro}</bairro>
                <cep xsi:type="soapenc:string">${endereco.cep}</cep>
                <cidade xsi:type="soapenc:string">${endereco.cidade}</cidade>
                <uf xsi:type="soapenc:string">${endereco.uf}</uf>
              </endereco>
            </cliente>
          </proposta>
        </web:gravarPropostaCartao>
      </soapenv:Body>
    </soapenv:Envelope>`);

  return minifyXML(rawXML);
};

const getProposalStatusXML = (payload) => {
  const {
    initialDate, finalDate, loginConsig, senhaConsig,
  } = payload;

  const rawXML = ''
    .concat('<soapenv:Envelope ')
    .concat('xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ')
    .concat('xmlns:xsd="http://www.w3.org/2001/XMLSchema" ')
    .concat('xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ')
    .concat('xmlns:web="http://webservice.econsig.bmg.com">')
    .concat(`<soapenv:Header/>
      <soapenv:Body>
        <web:consultaStatusAde soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <param xsi:type="web:ConsultaStatusAdeParameter">
            <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_LOGIN_WEBSERVICE}</login>
            <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${BMG_PASSWORD_WEBSERVICE}</senha>
            <dataInicial xsi:type="xsd:dateTime">${initialDate}</dataInicial> 
            <dataFinal xsi:type="xsd:dateTime">${finalDate}</dataFinal>
            <listaAdes xsi:type="con:ArrayOf_soapenc_string" soapenc:arrayType="soapenc:string[]" xmlns:con="http://localhost:8080/webservices/ConsultaStatusAde" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/"/>
            <loginConsig xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${loginConsig}</loginConsig>
            <senhaConsig xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">${senhaConsig}</senhaConsig>
          </param>
        </web:consultaStatusAde>
      </soapenv:Body>
    </soapenv:Envelope>`);

  return minifyXML(rawXML);
};

const createProposalBenefitCardXML = (payload) => {
  const {
    dadosProposta, dadosBancarios, dadosPessoais, celular,
    identidade, endereco, credenciais, camposFixos,
  } = payload;

  const rawXML = ''
    .concat('<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ')
    .concat('xmlns:xsd="http://www.w3.org/2001/XMLSchema" ')
    .concat('xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ')
    .concat('xmlns:web="http://webservice.econsig.bmg.com" ')
    .concat('xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">')
    .concat(`<soapenv:Header/>
      <soapenv:Body>
        <web:gravarPropostaCartao soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <proposta xsi:type="web:CartaoParameter">
            <login xsi:type="soapenc:string">${BMG_LOGIN_WEBSERVICE}</login>
            <senha xsi:type="soapenc:string">${BMG_PASSWORD_WEBSERVICE}</senha>
            <aberturaContaPagamento xsi:type="xsd:int">${camposFixos.aberturaContaPagamento}</aberturaContaPagamento>
            <bancoOrdemPagamento xsi:type="xsd:int">${camposFixos.bancoOrdemPagamento}</bancoOrdemPagamento>
            <dataAdmissao xsi:type="xsd:dateTime">${camposFixos.dataAdmissao}</dataAdmissao>
            <tipoSaque xsi:type="soapenc:int">${camposFixos.tipoSaque}</tipoSaque>
            <unidadePagadora xsi:type="soapenc:string">${camposFixos.unidadePagadora}</unidadePagadora>
            <tipoDomicilioBancario xsi:type="soapenc:short">${camposFixos.tipoDomicilioBancario}</tipoDomicilioBancario>
            
            <formaCredito xsi:type="xsd:int">${camposFixos.formaCredito}</formaCredito>
            <matriculaInstituidor xsi:type="soapenc:string">${camposFixos.matriculaInstituidor}</matriculaInstituidor>
            <codigoLoja xsi:type="soapenc:int">${camposFixos.codigoLoja}</codigoLoja>
            <codigoServico xsi:type="soapenc:string">${camposFixos.codigoServico}</codigoServico>

            <seguros xsi:type="web:ArrayOfSeguro" soapenc:arrayType="web:Seguro[]">
              <seguro xsi:type="web:Seguro">
                <tipoSeguro>${camposFixos.tipoSeguro}</tipoSeguro>
                <codigoPlano xsi:type="xsd:int">${camposFixos.codigoPlano}</codigoPlano>
              </seguro>
            </seguros>

            <codigoFormaEnvioTermo xsi:type="soapenc:string">${camposFixos.codigoFormaEnvioTermo}</codigoFormaEnvioTermo>
            <loginConsig xsi:type="soapenc:string">${credenciais.loginConsig}</loginConsig>
            <senhaConsig xsi:type="soapenc:string">${credenciais.senhaConsig}</senhaConsig>
            <token xsi:type="soapenc:string">${credenciais.token}</token>

            <codigoEntidade xsi:type="soapenc:string">${dadosProposta.codigoEntidade}</codigoEntidade>
            <codigoSituacaoServidor xsi:type="soapenc:int">${dadosProposta.codigoSituacaoServidor}</codigoSituacaoServidor>
            <cpf xsi:type="soapenc:string">${dadosProposta.cpf}</cpf>
            <matricula xsi:type="soapenc:string">${dadosProposta.matricula}</matricula>
            <margem xsi:type="xsd:double">${dadosProposta.margem}</margem>
            <valorRenda xsi:type="xsd:double">${dadosProposta.valorRenda}</valorRenda>
            <dataRenda xsi:type="xsd:dateTime">${dadosProposta.dataRenda}</dataRenda>
            <valorSolicitado xsi:type="xsd:double">${dadosProposta.valorSaque}</valorSolicitado>
            <valorParcela xsi:type="soapenc:double">${dadosProposta.valorParcela}</valorParcela>
            <valorSaque xsi:type="soapenc:double">${dadosProposta.valorSaque}</valorSaque>

            <tipoBeneficio xsi:type="soapenc:int"></tipoBeneficio>
            <ufContaBeneficio xsi:type="soapenc:string"></ufContaBeneficio>
            <cargo xsi:type="soapenc:string"></cargo>

            <finalidadeCredito xsi:type="xsd:int">${dadosBancarios.finalidadeCredito}</finalidadeCredito>
            <banco xsi:type="web:BancoParameter">
              <numero xsi:type="xsd:int">${dadosBancarios.banco}</numero>
            </banco>

            <agencia xsi:type="web:AgenciaParameter">
              <digitoVerificador xsi:type="soapenc:string">${dadosBancarios.digitoVerificadorDaAgencia}</digitoVerificador>
              <numero xsi:type="soapenc:string">${dadosBancarios.agencia}</numero>
            </agencia>

            <conta xsi:type="web:ContaParameter">
              <digitoVerificador xsi:type="soapenc:string">${dadosBancarios.digitoVerificadorDaConta}</digitoVerificador>
              <numero xsi:type="soapenc:string">${dadosBancarios.numeroDaConta}</numero>
              <tipoConta xsi:type="soapenc:int"></tipoConta>
            </conta>

            <cliente xsi:type="web:ClienteParameter">
              <nome xsi:type="soapenc:string">${dadosPessoais.nome}</nome>
              <cpf xsi:type="soapenc:string">${dadosProposta.cpf}</cpf>
              <dataNascimento xsi:type="xsd:dateTime">${dadosPessoais.dataNascimento}</dataNascimento>
              <sexo xsi:type="soapenc:string">${dadosPessoais.sexo}</sexo>
              <email xsi:type="soapenc:string">${dadosPessoais.email}</email>
              <nomeMae xsi:type="soapenc:string">${dadosPessoais.nomeMae}</nomeMae>
              <nomePai xsi:type="soapenc:string">${dadosPessoais.nomePai}</nomePai>
              <estadoCivil xsi:type="soapenc:string">${dadosPessoais.estadoCivil}</estadoCivil>
              <nomeConjuge xsi:type="soapenc:string">${dadosPessoais.nomeConjuge}</nomeConjuge>
              <grauInstrucao xsi:type="soapenc:string">${dadosPessoais.grauInstrucao}</grauInstrucao>
              <nacionalidade xsi:type="soapenc:string">${dadosPessoais.nacionalidade}</nacionalidade>
              <ufNascimento xsi:type="soapenc:string">${dadosPessoais.ufNascimento}</ufNascimento>
              <cidadeNascimento xsi:type="soapenc:string">${dadosPessoais.cidadeNascimento}</cidadeNascimento>

              <identidade xsi:type="web:IdentidadeParameter">
                <dataEmissao xsi:type="xsd:dateTime">${identidade.dataEmissao}</dataEmissao>
                <emissor xsi:type="soapenc:string">${identidade.emissor}</emissor>
                <numero xsi:type="soapenc:string">${identidade.numero}</numero>
                <tipo xsi:type="soapenc:string">${identidade.tipo}</tipo>
                <uf xsi:type="soapenc:string">${identidade.uf}</uf>
              </identidade>

              <celular1 xsi:type="web:TelefoneParameter">
                <ddd xsi:type="soapenc:string">${celular.ddd}</ddd>
                <numero xsi:type="soapenc:string">${celular.numero}</numero>
                <ramal xsi:type="soapenc:string"></ramal>
              </celular1>

              <endereco xsi:type="web:EnderecoParamter">
                <bairro xsi:type="soapenc:string">${endereco.bairro}</bairro>
                <cep xsi:type="soapenc:string">${endereco.cep}</cep>
                <cidade xsi:type="soapenc:string">${endereco.cidade}</cidade>
                <complemento xsi:type="soapenc:string">${endereco.complemento}</complemento>
                <logradouro xsi:type="soapenc:string">${endereco.logradouro}</logradouro>
                <numero xsi:type="soapenc:string">${endereco.numero}</numero>
                <uf xsi:type="soapenc:string">${endereco.uf}</uf>
              </endereco>
            </cliente>
          </proposta>
        </web:gravarPropostaCartao>
      </soapenv:Body>
    </soapenv:Envelope>`);

  return minifyXML(rawXML);
};

module.exports = {
  getLimitCardXML,
  getAvailableCardXML,
  getProposalStatusXML,
  createProposalCardXML,
  createWithdrawalLimitXML,
  createProposalBenefitCardXML,
  createBenefitCardWithdrawalLimitXML,
};
