const KOA = require('koa')

const app = new KOA();

app.use(async (ctx, next) => {
    ctx.body = '电影首页'
})

app.listen(4455)

 