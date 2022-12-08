const { Unauthorized } = require("../helpers/httpStatus");

const private = (req, _res, next) => {
  const { role } = req.params;
  
  if (role !== 'ADMIN') {
    throw { status: Unauthorized, message: 'Ação não permitida.' };
  }
  next();
}

module.exports = {
  private,
}