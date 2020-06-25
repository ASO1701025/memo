const Router = require('koa-router');
const router = new Router();

router.get('/top' , async (cxt) => {
    await cxt.render('top');
})

module.exports = router;