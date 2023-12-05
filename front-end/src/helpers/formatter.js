import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return null;
  }

  return moment(dateTime).format('DD/MM/YYYY HH:mm:ss');
};

export const formatCurrency = (currency) => {
  return parseFloat(currency).toLocaleString(
    'pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
}

export const formatCpf = (cpfNumber) => {
  let value = cpfNumber;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{1,3})(\d{1,3})(\d{1,3})(\d{1,2})/, '$1.$2.$3-$4');
  const newCpf = value;
  return newCpf;
}

export const formatCep = (cep) => {
  let value = cep;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{1,5})(\d{1,3})/, '$1-$2');
  const newCep = value;
  return newCep;
}

export const formatCurrencyMask = (currency) => {
  let formatedCurrency = currency;
  formatedCurrency = formatedCurrency.replace(/\D/g, '');
  formatedCurrency = formatedCurrency.replace(/(\d)(\d{2})$/, '$1,$2');
  formatedCurrency = formatedCurrency.replace(/(?=(\d{3})+(\D))\B/g, '.');
  return formatedCurrency;
}
