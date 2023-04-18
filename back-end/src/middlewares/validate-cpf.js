const validate = require('cpf-cnpj-validator');

const { BadRequest } = require('../helpers/httpStatus');

const validateCpf = (req, _res, next) => {
  const { cpf } = req.body;
  const isValidatedCpf = validate.cpf.isValid(cpf);

  if (isValidatedCpf) {
    let newCpf = cpf.replace('.', '');
    newCpf = newCpf.replace('.', '');
    newCpf = newCpf.replace('-', '');
    req.body.cpf = newCpf;
    next();
  } else {
    const newError = { status: BadRequest, message: 'CPF is not valid' };
    throw newError;
  }
};

module.exports = {
  validateCpf,
};
