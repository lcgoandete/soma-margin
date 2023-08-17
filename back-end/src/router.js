const router = require('express').Router();

const userRouter = require('./user/router');
const loginRouter = require('./login/router');
const viaCepRouter = require('./viaCep/router');
const oleRouter = require('./banks/ole/router');
const bmgRouter = require('./banks/bmg/router');
const safraRouter = require('./banks/safra/router');
const portalConsignadoRouter = require('./portalConsignado/router');
const portalConsignadoApiRouter = require('./portalConsignadoApi/router');
const portalConsignadoMunicipioRouter = require('./portalConsignadoMunicipio/router');

router.use(bmgRouter);
router.use(oleRouter);
router.use(userRouter);
router.use(loginRouter);
router.use(safraRouter);
router.use(viaCepRouter);
router.use(portalConsignadoRouter);
router.use(portalConsignadoApiRouter);
router.use(portalConsignadoMunicipioRouter);

module.exports = router;
