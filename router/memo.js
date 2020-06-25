const Router = require('koa-router');
const router = new Router();

router.get('/memo' , async (cxt) => {
    await cxt.render('memo');
})

module.exports = router;