const connection = require('../queriesSQL/connectionSQL.js');
const cTable = require('console.table')

let sqlquery;

const displayRoles = () => {
    return new Promise ((resolve,reject) => {
        sqlquery = 'SELECT id,title FROM roles';
        connection.query(sqlquery,(err,result) => {
            if (err) reject(err);
            let rolesArray = [];
            result.map((el) => {
                let role = {name: `${el.title}`, value: el.id};
                rolesArray.push(role)
            });
            resolve(rolesArray);
        });
    })
}

const displayDepartments = () => {
    return new Promise ((resolve,reject) => {
        sqlquery = 'SELECT * FROM department';
        connection.query(sqlquery,(err,result) => {
            if (err) reject(err);
            let departmentArray = [];
            result.map((el) => {
                let department = {name: `${el.name}`, value: el.id};
                departmentArray.push(department)
            });
            resolve(departmentArray);
        });
    })
}

const displayManagers = () => {
    return new Promise ((resolve,reject) => {
        sqlquery = `SELECT e1.id,CONCAT(e1.first_name,' ',e1.last_name,' - ',roles.title) AS 'manager'
        FROM employee e1 
        LEFT JOIN roles ON e1.role_id = roles.id
        WHERE e1.manager_id IS NULL`;
        connection.query(sqlquery,(err,result) => {
            if (err) reject(err);
            let managerArray = [];
            result.map((el) => {
                let manager = {name: `${el.manager}`, value: el.id};
                managerArray.push(manager)
            });
            resolve(managerArray);
        });
    })
}

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

const sortEmployeeByIDAsync = () => {
    return new Promise ((resolve,reject) => {
        sqlquery = `SELECT e1.id,e1.first_name AS 'First Name',e1.last_name AS 'Last Name',roles.title AS 'Title',department.name AS 'Department',roles.salary AS 'Salary',CONCAT(e2.first_name,' ',e2.last_name) AS 'Managed By' 
        FROM employee e1 
        LEFT JOIN employee e2 ON e1.manager_id = e2.id 
        INNER JOIN roles ON e1.role_id = roles.id 
        INNER JOIN department ON roles.department_id = department.id 
        ORDER BY id`;
        connection.query(sqlquery,(err,result) => {
            if (err) reject(err);
            console.table(result);
            resolve('success')
        });
    })
};

const sortEmployeeByManagerAsync = () => {
    return new Promise ((resolve,reject) => {
        sqlquery = `SELECT e1.id,e1.first_name AS 'First Name',e1.last_name AS 'Last Name',roles.title AS 'Title',department.name AS 'Department',roles.salary AS 'Salary',CONCAT(e2.first_name,' ',e2.last_name) AS 'Managed By' 
        FROM employee e1 
        LEFT JOIN employee e2 ON e1.manager_id = e2.id 
        INNER JOIN roles ON e1.role_id = roles.id 
        INNER JOIN department ON roles.department_id = department.id 
        ORDER BY e1.manager_id`;
        connection.query(sqlquery,(err,result) => {
            if (err) {reject(err)}
            else{
                console.table(result);
                resolve('success')
            }
        });
    })
};

const addEmployee = (data) => { 
    return new Promise ((resolve,reject) => {
        sqlquery =  `
        INSERT INTO employee
        SET ?`;
        connection.query(sqlquery,data,(err) => {
            if (err) {reject(err)}
            else{
                console.log(`\nYou Have Successfully ADD New Employee with the following details:\n
                Name: ${data.first_name} ${data.last_name}
                Role_id: ${data.role_id}
                Manager_id: ${data.manager_id}
                \n
                `)
               resolve('success')
            }
        })
    })
};

const addDepartment = (data) => {
    return new Promise ((resolve,reject) => {
        sqlquery =  `
        INSERT INTO department
        SET ?`;
        connection.query(sqlquery,data,(err) => {
            if (err) {reject(err)}
            else{
                console.log(`\nYou Have Successfully ADD New Department with the following details:\n
                Name: ${data.name}
                id: ${data.id}
                \n
                `)
               resolve('success')
            } 
        })
    })
}

module.exports = {
    displayRoles,
    displayDepartments,
    displayManagers,
    viewAllDepartmentAsync,
    viewAllRolesAsync,
    sortEmployeeByIDAsync,
    sortEmployeeByManagerAsync,
    addEmployee,
    addDepartment
};



