import * as validator from 'cpf-cnpj-validator';

export const validateCpf = (cpf) => {
  if (!validator.cpf.isValid(cpf)) {
    return { errorMessage: 'CPF inválido' }
  }

  let newCpf = cpf.replace('.','');
  newCpf = newCpf.replace('.','');
  newCpf = newCpf.replace('-','');
  return newCpf;
}

export const validateCurrency = (currency) => {
  if (!currency) {
    return 0;
  }

  let newCurrency = currency.replace('.','');
  newCurrency = newCurrency.replace('.','');
  newCurrency = newCurrency.replace(',','.');
  newCurrency = parseFloat(newCurrency);
  return newCurrency;
}
