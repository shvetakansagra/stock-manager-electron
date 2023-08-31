const mysql = require('mysql2/promise');

const connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'stock_managment'
})

function getConnection(){
    return connection 
}

module.exports ={
    getConnection
}