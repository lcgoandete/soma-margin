const validate = require('cpf-cnpj-validator'); 

const { BadRequest } = require('../../../helpers/httpStatus');

const validateCpf = (req, _res, next) => {
  const cpf = req.params.cpf;
  const isValidatedCpf = validate.cpf.isValid(cpf)
  
  if(isValidatedCpf) {
    let newCpf = cpf.replace('.','');
    newCpf = newCpf.replace('.','');
    newCpf = newCpf.replace('-','')
    req.params.cpf = newCpf;
    next();
  } else {
    throw { status: BadRequest, message: 'CPF is not valid' };
  }
}

module.exports = {
  validateCpf,
};
