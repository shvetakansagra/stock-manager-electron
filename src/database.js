const mysql = require('mysql2/promise');

const connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'stock_managment'
})
// const connection =mysql.createConnection({
//     host:'154.56.47.154',
//     user:'u344208509_invoice',
//     password:'9EbfSGW~LgMM',
//     database:'u344208509_invoice'
// })

function getConnection(){
    return connection 
}

module.exports ={
    getConnection
}