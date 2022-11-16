require('dotenv').config();
// const path = require('path');
// const { Builder, By, until } = require('selenium-webdriver');

// const chrome = require('selenium-webdriver/chrome');
// const chromedriver = require('chromedriver');

const USER_RUMOLA = process.env.USER_RUMOLA;
const PASSWORD_RUMOLA = process.env.PASSWORD_RUMOLA;
const USER_PORTAL = process.env.USER_PORTAL;
const PASSWORD_PORTAL = process.env.PASSWORD_PORTAL;

// const configBrowser = async () => {
//   chrome.setDefaultService = new chrome.ServiceBuilder(chromedriver.path).build;
//   const options = new chrome.Options();
//   // options.headless();
//   options.addExtensions(path.join(__dirname, 'extension', 'captha.crx'));
//   const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
//   return driver
// }

const loginRumola = async (driver) => {
  await driver.get("chrome-extension://bjjgbdlbgjeoankjijbmheneoekbghcg/options.html");
  await driver.findElement(By.css('#tie_form > div > div:nth-child(2) > input[type=text]')).sendKeys(USER_RUMOLA);
  await driver.findElement(By.css('#tie_form > div > div:nth-child(3) > input[type=password]')).sendKeys(PASSWORD_RUMOLA);
  await driver.findElement(By.css('#tie_form > div > div:nth-child(4) > input[type=submit]')).click();
  await driver.sleep(1000);
  await driver.findElement(By.css('#login-email')).sendKeys(USER_RUMOLA);
  await driver.findElement(By.css('#login-pass#login-pass')).sendKeys(PASSWORD_RUMOLA);
  await driver.findElement(By.css('#login-btn')).click();
}

const loginPortalConsignado = async (driver) => {
  await driver.get("https://www.portaldoconsignado.com.br");
  await driver.findElement(By.css('#guias > div.guia.guiaInativa.tab1 > span > span')).click();
  // await driver.navigate().refresh();
  await driver.navigate().refresh();

  await driver.findElement(By.css('#username')).sendKeys(USER_PORTAL);
  await driver.findElement(By.css('#password')).sendKeys(PASSWORD_PORTAL);
  await driver.sleep(1000);
  await driver.findElement(By.css('#captcha')).click();
  await driver.sleep(10000);
  await driver.findElement(By.css('#divLogin > div:nth-child(6)')).click();
  await driver.sleep(3000);
  await driver.get("https://www.portaldoconsignado.com.br/consignatario/pesquisarMargem");
  await driver.sleep(1000);
}

const validateLoginPortalConsignado = async (driver) => {
  let validated = false;

  // nao_respondem = driver.find_elements_by_css_selector('#divEtapaError2 > span.titulo')
  // nao_conferem = driver.find_elements_by_css_selector('#divLogin > div > span > p')
  // while nao_respondem or nao_conferem:
  //     driver.get("https://www.portaldoconsignado.com.br")
  //     login_adm = driver.find_element_by_css_selector('#guias > div.guia.guiaInativa.tab1 > span > span')
  //     login_adm.click()

  //     driver.refresh()
  //     driver.refresh()

  //     login_cpf = driver.find_element_by_css_selector('#username')
  //     login_cpf.send_keys(user)
  //     login_senha3 = driver.find_element_by_css_selector('#password')
  //     login_senha3.send_keys(senha_user)
  //     sleep(1)
  //     login_captha = driver.find_element_by_css_selector('#captcha')
  //     login_captha.click()
  //     sleep(10)
  //     acesso = driver.find_element_by_css_selector('#divLogin > div:nth-child(6)').click()
  //     sleep(3)
  //     driver.get("https://www.portaldoconsignado.com.br/consignatario/pesquisarMargem")
  //     sleep(3)
  //     nao_respondem = driver.find_elements_by_css_selector('#divEtapaError2 > span.titulo')
  //     nao_conferem = driver.find_elements_by_css_selector('#divLogin > div > span > p')
  // else:
  //     pass

  await driver.sleep(3000);
  return validated;
}

const startPortalConsignado = async () => {
  // const driver = await configBrowser();
  // await loginRumola(driver);
  // await loginPortalConsignado(driver);
  // await validateLoginPortalConsignado();
}

module.exports = startPortalConsignado;