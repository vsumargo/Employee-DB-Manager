require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3306,
    user: 'root',
    password: process.env.mySQL_PASSWORD,
    database: 'employee_db_manager',
});

module.exports = connection;