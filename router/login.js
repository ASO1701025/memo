const Router = require('koa-router');
const router = new Router();

router.get('/login' , async (cxt) => {
    await cxt.render('login');
})

module.exports = router;