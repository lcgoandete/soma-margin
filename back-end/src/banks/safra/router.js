const rescue = require('express-rescue');
const safraRoutes = require('express').Router();

const safra = require('./controllers/safra');
const { validateCpf } = require('../../middlewares/validate-cpf');
const { validateToken } = require('../../middlewares/token');

safraRoutes.post('/banks/safra/agreement',
  validateCpf,
  validateToken,
  rescue(safra.getAgreements)
);

safraRoutes.post('/banks/safra/formalization',
  validateCpf,
  validateToken,
  rescue(safra.getFormalization)
);

safraRoutes.post('/banks/safra/fgtsbalance',
  validateCpf,
  validateToken,
  rescue(safra.getFgtsBalance)
);

safraRoutes.post('/banks/safra/simulation',
  validateToken,
  rescue(safra.getSimulation)
);
module.exports = safraRoutes;