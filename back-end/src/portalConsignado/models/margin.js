require('dotenv').config();
const { By } = require('selenium-webdriver');
const { NotFound } = require('../../helpers/httpStatus');

const { isLogin } = require('./login');
const selector = require('./marginSelector');

const checkCpf = async (driver, cpf) => {
  await driver.get("https://www.portaldoconsignado.com.br/consignatario/pesquisarMargem");
  await driver.sleep(1000);

  await driver.findElement(By.css('#cpfServidor')).sendKeys(cpf);
  await driver.sleep(1000);

  await driver.findElement(By.css('#divFiltros > div:nth-child(7)')).click();
  await driver.sleep(3000);

  const invalidCpf = await driver.findElements(By.css('#divEtapaError2'));
  if(invalidCpf.length > 0) {
    const error = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/form/div[2]/div/div[1]/div/div/ul/li/span')).getText();
    throw { status: NotFound, message: error }
  }
}

const getMargin = async (driver, marginSelector) => {
  const convenio = ("Gov. SP");

  const dadosIdentificacao = await getIdentificationDada(driver, marginSelector);
  const margemBruta = await getRawMargin(driver, marginSelector);
  const margemDisponivel = await availableMargin(driver, marginSelector);

  return { dadosIdentificacao, margemBruta, margemDisponivel };
}

const getIdentificationDada = async (driver, marginSelector) => {
  const dadosIdentificacao = {cpf: '', nome: '', orgao: '', identificacao: '', mesReferencia: '', dataProcessamento: ''};
  
  for(const key in dadosIdentificacao) {
    const element = await driver.findElements(By.xpath(selector[marginSelector].dadosIdentificacao[key]));
    if(element.length > 0) {
      dadosIdentificacao[key] = await driver.findElement(By.xpath(selector[marginSelector].dadosIdentificacao[key])).getText();
    }
  };
  return dadosIdentificacao;
}

const getRawMargin = async (driver, marginSelector) => {
  const margemBruta = { provimento: '', consignacoesFacultativas: '', cartaoCredito: '', cartaoBenefico: '',
    dadosFuncionais: { lotacao: '', cargo: '', dataAdmissao: '', tipoVinculo: '', dataFinalContrato: '' }
  };

  const margemBrutaCredito = await driver.findElements(By.xpath(selector[marginSelector].margemBruta.cartaoCredito));
  if(margemBrutaCredito.length > 0) {
    
    for(const key in margemBruta) {
      if(key !== 'dadosFuncionais') {
        const element = await driver.findElements(By.xpath(selector[marginSelector].margemBruta[key]));
        if(element.length > 0) {
          margemBruta[key] = await driver.findElement(By.xpath(selector[marginSelector].margemBruta[key])).getText();
        }
      }
    };
    
    const dadosFuncionaisBotao = await driver.findElements(By.xpath(selector[marginSelector].margemBruta.dadosFuncionais.botao));
    if(dadosFuncionaisBotao.length > 0) {
      await driver.findElement(By.xpath(selector[marginSelector].margemBruta.dadosFuncionais.botao)).click();
      await driver.sleep(1000);
    }

    for(const key in margemBruta.dadosFuncionais) {
      const element = await driver.findElements(By.xpath(selector[marginSelector].margemBruta.dadosFuncionais[key]));
      if(element.length > 0) {
        margemBruta.dadosFuncionais[key] = await driver.findElement(By.xpath(selector[marginSelector].margemBruta.dadosFuncionais[key])).getProperty('value');
      }
    }
  }
  return margemBruta;
}

const availableMargin = async (driver, marginSelector) => {
  const margemDisponivel = { provimento: '', consignacoesFacultativas: '', cartaoCredito: '', cartaoBenefico: '' };

  for(const key in margemDisponivel) {
    const element = await driver.findElements(By.xpath(selector[marginSelector].margemDisponivel[key]));
    if(element.length > 0) {
      margemDisponivel[key] = await driver.findElement(By.xpath(selector[marginSelector].margemDisponivel[key])).getText();
    }
  };
  return margemDisponivel;
}

const getMargins = async (cpf) => {
  const driver = await isLogin();
  await checkCpf(driver, cpf);
  
  const margin1 = await getMargin(driver, 'marginSelector1');
  const margin2 = await getMargin(driver, 'marginSelector2');
  const margin3 = await getMargin(driver, 'marginSelector3');
  const margin4 = await getMargin(driver, 'marginSelector4');
  const marginList = [ margin1, margin2, margin3, margin4 ];

  const result = marginList.filter((margin) => margin.margemBruta.cartaoCredito !== '');
  return result;
};

module.exports = {
  getMargins,
  checkCpf,
};