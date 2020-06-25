const path = require('path');
const Koa = require('koa');
const server = require('koa-static');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const session = require('koa-generic-session');
const SQLite3Store = require('koa-sqlite3-session');

const app = new Koa();
render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'base',
    viewExt: 'ejs',
    cache: false,
    debug: false
});
app.use(server('./public'));
app.use(bodyParser());
app.keys = ['SECRET_KEY'];
app.use(session({
    store: new SQLite3Store('session.db', {}),
    maxAge: 1000 * 60 * 60 * 24,
    secure: false
}, app));

const topRouter = require('./router/top');
app.use(topRouter.routes());
app.use(topRouter.allowedMethods());

const signupRouter = require('./router/signup');
app.use(signupRouter.routes());
app.use(signupRouter.allowedMethods());

const loginRouter = require('./router/login');
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

const memoRouter = require('./router/memo');
app.use(memoRouter.routes());c
app.use(memoRouter.allowedMethods());



app.listen(5000);

