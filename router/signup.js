const Router = require('koa-router');
const router = new Router();

router.get('/signup' , async (cxt) => {
    let session = ctx.session;

    let result = {};
    result['data'] = {};

    if (session.success_message !== undefined) {
        result['data']['success_message'] = session.success_message;
        session.success_message = undefined;
    }

    if (session.error_message !== undefined) {
        result['data']['error_message'] = session.error_message;
        session.error_message = undefined;
    }

    if (session.error_user_id !== undefined) {
        result['data']['error_user_id'] = session.error_user_id;
        session.error_user_name = undefined;
    }

    if (session.error_password !== undefined) {
        result['data']['error_password'] = session.error_password;
        session.error_password = undefined;
    }

    await cxt.render('signup');
})

router.post('/signup', async (cxt) => {
    let session = ctx.session;

    let userid = ctx.request.body.user_id;
    let password = ctx.request.body.password;

    let userNameValidate = new validator({
        userid: userid
    }, {
        userid: 'required|string|min:1|max:20'
    });

    let passwordValidate = new validator({
        password: password
    }, {
        password: 'required|string|min:5|max:100'
    });

    if (useridValidate.fails() || passwordValidate.fails()) {
        if (userNameValidate.fails()) session.error_user_id = '1文字以上20文字以下で入力';
        if (passwordValidate.fails()) session.error_password = '5文字以上100文字以下で入力';

        return ctx.redirect('/signup');
    }

    sql = 'INSERT INTO user (user_id, password) VALUES (?, ?, ?)';
    let [user] = await connection.query(sql, [userid,  bcrypt.hashSync(password, 10)]);


})

module.exports = router;