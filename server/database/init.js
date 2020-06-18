const mongoose = require('mongoose')
let db = 'mongodb://localhost/douban-trailer'

mongoose.Promise = global.Promise

exports.connect = () => {

    let maxConnectTime = 0

    return new Promise((resolve, reject) => {

        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }

        mongoose.connect(db)

        mongoose.connection.on('disconnected', () => {
            if (maxConnectTime < 5) {
                mongoose.connect()
            } else {
                throw new Error('数据库挂了')
                reject()
            }
            maxConnectTime++
        })

        mongoose.connection.on('error', (err) => {
            console.log('error', err)
            reject(err)
        })

        mongoose.connection.once('open', () => {
            console.log('db open success')

            // let animalSchema = new Schema({ name: String, type: String })
            /* let animalSchema = mongoose.Schema({ name: String, type: String })


            animalSchema.methods.findSimilarTypes = (cb) => {
                return this.model('Animal'.find({ type: this.type }, cb))
            }

            let Animal = mongoose.model('Animal', animalSchema)
            let dog = new Animal({ type: 'dog' })

            dog.findSimilarTypes((err, dogs) => {
                console.log(dogs)
            }) */

            let kittySchema = mongoose.Schema({
                name: String,
            })




            kittySchema.methods.speak = function() {
                // return this.model('Animal'.find({ type: this.type }, cb))
                let greeting = this.name ? 'Meov name is' + this.name : 'I don`t have name'
                console.log(greeting)
            }


            let Kitten = mongoose.model('Kitten', kittySchema)

            let felyne = new Kitten({ name: 'Felyne' })
            console.log(felyne.name)
            let soma = new Kitten({ name: 'soma' })
            soma.speak()




            resolve()
        })
    })
}