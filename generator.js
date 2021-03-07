const fs = require('fs')
function readFile(path) {
    return new Promise((resolve,reject) => {
        fs.readFile(path,(err,data) => {
            if(err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

function co(fn) {
    const self = fn()
    let it = self.next()
    function run() {
            if(!it.done) {
                it.value.then(data => {
                    it = self.next(data)
                    run()
                }).catch(err => {
                    console.error(err)
                })

            }
    }
    run()
}

co(function *() {
    try {
        const data1 = yield readFile('./generator.js')
        console.log('data1',data1)
        const data2 = yield readFile('./generator1.js')
        console.log('data2',data2)
    } catch (err) {
        console.error('1231',err)
    }
})

const add = function add(a,b) {
/*    const len = add.length
    return (function inner(...arg) {
        if(len !== arg.length) {
            return inner.bind(null,...arg)
        }
        return arg.reduce((a,b) => a+ b,0)
    })(...Array.from(arguments))*/
    return a + b
}
// add(1,2)
// add(1)(2)


