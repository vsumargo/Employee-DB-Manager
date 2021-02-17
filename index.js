const connection = require('./queriesSQL/connectionSQL.js');
const inquirer = require('./inquirer/inquirer.js')

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected to mySQL employee_db_manager as ID: ${connection.threadId}`);
    inquirer.startApp().then(inquirer.controller);
});