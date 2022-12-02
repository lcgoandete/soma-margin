import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const formatDateTime = (dateTime) => {
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
  cpfNumber = value;
  return cpfNumber;
}