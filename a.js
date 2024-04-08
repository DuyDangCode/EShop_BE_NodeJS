// console.log('1')

// process.nextTick(() => console.log('4'))

// new Promise((resolve, reject) => {
//   console.log('2')
//   resolve(true)
// }).then(() => console.log('3'))

// console.log('5')

process.nextTick(() => console.log('b'))

Promise.resolve().then(() => console.log('a'))
