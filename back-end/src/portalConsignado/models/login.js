require('dotenv').config();
const { By } = require('selenium-webdriver');

const { browser } = require('./browser');
const { report, solveCaptcha } = require('../../helpers/solveCaptcha');
// eslint-disable-next-line no-return-await
const createDriver = async () => await browser();
let numberOfLoginAttempts = 0;

// const loginRumola = async (driver) => {
//   const { USER_RUMOLA } = process.env;
//   const { PASSWORD_RUMOLA } = process.env;

//   await driver.get('chrome-extension://bjjgbdlbgjeoankjijbmheneoekbghcg/options.html');
//   await driver.findElement(By.css('#tie_form > div > div:nth-child(2) > input[type=text]')).sendKeys(USER_RUMOLA);
//   await driver.findElement(By.css('#tie_form > div > div:nth-child(3) > input[type=password]')).sendKeys(PASSWORD_RUMOLA);
//   await driver.findElement(By.css('#tie_form > div > div:nth-child(4) > input[type=submit]')).click();
//   await driver.sleep(1000);
//   await driver.findElement(By.css('#login-email')).sendKeys(USER_RUMOLA);
//   await driver.findElement(By.css('#login-pass#login-pass')).sendKeys(PASSWORD_RUMOLA);
//   await driver.findElement(By.css('#login-btn')).click();
// };

const loginPortalDoConsignado = async (driver) => {
  if (numberOfLoginAttempts >= 5) {
    throw new Error('Não foi possível fazer login no portal consignado. Número de tentativas 5');
  }

  const { USER_PORTAL } = process.env;
  const { PASSWORD_PORTAL } = process.env;

  await driver.get('https://www.portaldoconsignado.com.br');
  await driver.findElement(By.css('#guias > div.guia.guiaInativa.tab1 > span > span')).click();
  // await driver.navigate().refresh();
  await driver.navigate().refresh();

  await driver.findElement(By.css('#username')).sendKeys(USER_PORTAL);
  await driver.findElement(By.css('#password')).sendKeys(PASSWORD_PORTAL);
  await driver.sleep(5000);

  const captchaImageElement = await driver.findElement(By.xpath('/html/body/div/div[2]/form/div[3]/div/div/div/div[5]/div/div[1]/div[1]/img'));
  const encodedString = await captchaImageElement.takeScreenshot(true);
  const solvedCaptcha = await solveCaptcha(encodedString);

  if (solvedCaptcha) {
    if (solvedCaptcha.text === '' || solvedCaptcha.text.startsWith('[[')) {
      numberOfLoginAttempts += 1;
      await loginPortalDoConsignado(driver);
    }
    numberOfLoginAttempts = 0;

    await driver.findElement(By.css('#captcha')).click();
    await driver.findElement(By.css('#captcha')).sendKeys(solvedCaptcha.text);
    await driver.findElement(By.css('#divLogin > div:nth-child(6)')).click();
    await driver.sleep(3000);
    await driver.get('https://www.portaldoconsignado.com.br/consignatario/pesquisarMargem');
    await driver.sleep(1000);

    const pesquisarMargem = await driver.findElements(By.xpath('/html/body/div/div/div[2]/div/form/div[2]/div/h1'));
    if (pesquisarMargem.length === 0) {
      numberOfLoginAttempts += 1;
      await report(solvedCaptcha.captcha);
      await loginPortalDoConsignado(driver);
    }
  } else {
    numberOfLoginAttempts += 1;
    await loginPortalDoConsignado(driver);
  }
};

const isLogin = async () => {
  const driver = await createDriver();

  const pesquisarMargem = await driver.findElements(By.xpath('/html/body/div/div/div[2]/div/form/div[2]/div/h1'));
  if (pesquisarMargem.length === 0) {
    // await loginRumola(driver);
    await loginPortalDoConsignado(driver);
  }
  return driver;
};

module.exports = {
  isLogin,
};
