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

export const validateTaxaJuros = (taxaJuros) => {
  const { taxaJurosSefaz, taxaJurosPM, taxaJurosSpprev, taxaJurosPrefSP } = taxaJuros;
  
  const newTaxaJurosSefaz = parseFloat(taxaJurosSefaz);
  if (!newTaxaJurosSefaz || newTaxaJurosSefaz < 1) {
    throw Error('taxa SEFAZ: valor inválido.')
  }

  const newTaxaJurosPM = parseFloat(taxaJurosPM);
  if (!newTaxaJurosPM || newTaxaJurosPM < 1) {
    throw Error('taxa Polícia Militar: valor inválido.')
  }

  const newTaxaJurosSpprev = parseFloat(taxaJurosSpprev);
  if (!newTaxaJurosSpprev || newTaxaJurosSpprev < 1) {
    throw Error('taxa SPPREV: valor inválido.')
  }

  const newTaxaJurosPrefSP = parseFloat(taxaJurosPrefSP);
  if (!newTaxaJurosPrefSP || newTaxaJurosPrefSP < 1) {
    throw Error('taxa Prefeitura de São Paulo: valor inválido.')
  }

  return { newTaxaJurosSefaz, newTaxaJurosPM, newTaxaJurosSpprev, newTaxaJurosPrefSP, };
}
