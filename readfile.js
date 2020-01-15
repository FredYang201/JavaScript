 const fs = require('fs')

 let pReadFile = function(filePath) {
     return new Promise((resolved, rejected) => {
         fs.readFile(filePath, 'utf8', (err, data) => {
             if (err) {
                 rejected(err)
             } else {
                 resolved(data)
             }
         })
     })
 }

pReadFile('./a.txt')
    .then(data => {
        console.log(data)
        return pReadFile('./b.txt')
    })
    .then(data => {
        console.log(data)
    })