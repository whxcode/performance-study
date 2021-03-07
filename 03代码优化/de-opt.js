const { performance,PerformanceObserver } = require('perf_hooks')
const add = (a,b) => a + b
const num1 = 1,
    num2 = 2
performance.mark('start')
/**
 *  参数稳定 而且参数也没有变化
 *  v8 会进行优化
 * */
for(let i = 0; i != 10000000;++ i) {
    add(num1,num2)
}

// add(num1,'s')

for(let i = 0; i != 10000000;++ i) {
    add(num1,num2)
}

performance.mark('end')

const observer = new PerformanceObserver(list => {
    console.log(list.getEntries())
})

observer.observe({
    entryTypes: ['measure']
})

performance.measure('测量1','start','end')
