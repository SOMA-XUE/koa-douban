const Koa = require('koa')
const app = new Koa();
const { normal } = require('../server/tpl/index')
const {connect} = require('../server/database/init')

;(async () => {
    await connect();
})()

app.use(async (ctx, next) => {
    ctx.type = 'text/html;charset=utf-8';
    ctx.body = normal;

})

app.listen(2333)

