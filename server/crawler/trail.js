const url = "https://movie.douban.com/tag/#/?sort=R&range=6,10&tags="

const puppeteer = require("puppeteer")

const sleep = time => new Promise(resolve => {
    setTimeout(resolve(1), time)
})

function test(a) {
    console.log("test promise", a)
    return a
}

function test2(a) {
    console.log("test promise2", a)
    return a
}

; (async () => {
    console.log('start visit the target page')
    const brower = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })

    const page = await brower.newPage()

    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
    // console.log(2)
    await sleep(3000).then(test).then(test2).then(test)
    // console.log(1)
    //等待页面上more标签加载出来在往下处理
    await page.waitForSelector(".more")

    for (let i = 0; i < 1; i++) {
        await sleep(3000)
        await page.click(".more")
    }
    const result = await page.evaluate(() => {
        var $ = window.$
        var items = $(".list-wp a")
        var links = []
        if (items.length >= 1) {
            items.each((index, item) => {
                let it = $(item)
                let doubanID = it.find("div").data("id")
                let title = it.find(".title").text()
                let rate = Number(it.find(".rate").text())
                let poster = it.find("img").attr('src').replace('s_ratio', 'l_ratio')

                links.push({
                    doubanID,
                    title,
                    rate,
                    poster
                })
            })
        }
        return links
    })

    brower.close()
    // console.log(result)
    console.log("end")
    process.send({ result })
    process.exit(0)
})()