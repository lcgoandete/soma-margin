/* eslint-disable no-return-await */

const { HttpClient } = require('./dbc_lib');

const { CAPTCHA_USERNAME, CAPTCHA_PASSWORD } = process.env;

const checkBalance = async () => {
  const client = new HttpClient(CAPTCHA_USERNAME, CAPTCHA_PASSWORD);
  const balance = await client.get_balance();
  if (balance === 0) {
    throw new Error('Não foi possível fazer login no portal consignado. O crédito para captchas está zerado');
  }
};

const solveCaptcha = async (encodedString) => {
  const client = new HttpClient(CAPTCHA_USERNAME, CAPTCHA_PASSWORD);
  await checkBalance();
  const captcha = { captcha: encodedString, extra: { type: 2 } };
  return await client.decode(captcha);
};

const report = async (cid) => {
  const client = new HttpClient(CAPTCHA_USERNAME, CAPTCHA_PASSWORD);
  return await client.report(cid);
};

module.exports = {
  report,
  solveCaptcha,
};
