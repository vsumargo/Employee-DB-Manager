const connection = require('../queriesSQL/connectionSQL.js');
const cTable = require('console.table')

let sqlquery;
const viewAllDepartmentAsync = () => {
    return new Promise ((resolve,reject) => {
        sqlquery = 'SELECT * FROM department';
        connection.query(sqlquery,(err,result) => {
            if (err) reject(err);
            console.table(result);
            resolve('success')
        });
    })
};

const viewAllRolesAsync = () => {
    return new Promise ((resolve,reject) => {
        sqlquery = 'SELECT * FROM roles';
        connection.query(sqlquery,(err,result) => {
            if (err) reject(err);
            console.table(result);
            resolve('success')
        });
    })
}

module.exports = {
    viewAllDepartmentAsync,
    viewAllRolesAsync
}



