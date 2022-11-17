const router = require('express').Router();

const userRouter = require('./user/router');
const loginRouter = require('./login/router');
const oleRouter = require('./banks/ole/router');
const bmgRouter = require('./banks/bmg/router');
const safraRouter = require('./banks/safra/router');
const portalConsignadoRoutesRouter = require('./portalConsignado/router');
const portalConsignadoMunicipioRouter = require('./portalConsignadoMunicipio/router');

router.use(loginRouter);
router.use(userRouter);
router.use(oleRouter);
router.use(bmgRouter);
router.use(safraRouter);
router.use(portalConsignadoRoutesRouter);
router.use(portalConsignadoMunicipioRouter);

module.exports = router;
