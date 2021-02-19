const inquirer = require('inquirer');
const connection = require('../queriesSQL/connectionSQL.js');
const queries = require('../queriesSQL/queriesSQL.js')

const startApp = () => {
    const choicesArray = [
        {name:'View Departments, Roles, Employees', value:1},
        {name:'Add Departments, Roles, Employess', value:2},
        {name:'Update Departments, Roles, Employess', value:3},
        {name:'Delete Departments, Roles, Employess', value:4},
        {name:'Exit Application', value:5}
    ];

    const question = {
        type: 'rawlist',
        name: 'option',
        message: 'Choose from the following option',
        choices: choicesArray
    };

    return inquirer.prompt(question);
};

const controller = (result) => {
    const {option} = result
    switch (option){
        case 1: viewOption(); break;
        case 2: addOption(); break;
        case 3: updateOption(); break;
        case 4: deleteOption(); break;
        case 5: exitApplication(); break;
        case 6: viewAllEmployee(); break;
        case 7: viewAllDepartment(); break;
        case 8: viewAllRoles(); break;
        case 9: addEmployee(); break;
        case 10: addDepartment(); break;
        case 11: addRole(); break;
        case 12: updateEmployee(); break;
        case 13: updateDepartment(); break;
        case 14: updateRole(); break;
        case 15: deleteEmployee(); break;
        case 16: deleteDepartment(); break;
        case 17: deleteRole(); break;
        case 18: sortEmployeeByID(); break;
        case 19: sortEmployeeByManager(); break;
        default:startApp();break;
    }
};

const viewOption = () => {
    const choicesArray = [
        {name:'View All Employee', value:6},
        {name:'View All Departments', value:7},
        {name:'View All Roles', value:8},
        {name:'Exit Application', value:5}
    ];

    const question = {
        type: 'list',
        name: 'option',
        message: 'Select what you want to VIEW:',
        choices: choicesArray
    };

    inquirer.prompt(question)
    .then(controller);
};

const viewAllEmployee = () => {
    const choicesArray = [
        {name:'Sort Employees By ID', value:18},
        {name:'Sort Employees By Manager', value:19},
    ];

    const question = {
        type: 'list',
        name: 'option',
        message: 'Select how you want to VIEW employees:',
        choices: choicesArray
    };

    inquirer.prompt(question)
    .then(controller);
}

const viewAllDepartment = () => {
    console.log('Here are the list of all Departments:');
    //run mySQL query here
    queries.viewAllDepartmentAsync()
    .then(() => startApp())
    .then(controller);
}

const viewAllRoles = () => {
    console.log('Here are the list of all Roles:');
    queries.viewAllRolesAsync()
    .then(() => startApp())
    .then(controller);
}

const sortEmployeeByID = () => {
    console.log('Here are the list of all Employees sorted by ID:');
    queries.sortEmployeeByIDAsync()
    .then(() => startApp())
    .then(controller);
}

const sortEmployeeByManager = () => {
    console.log('Here are the list of all Employees sorted by Manager:');
    queries.sortEmployeeByManagerAsync()
    .then(() => startApp())
    .then(controller);
}

const addOption = () => {
    const choicesArray = [
        {name:'Add New Employee', value:9},
        {name:'Add New Department', value:10},
        {name:'Add New Role', value:11},
        {name:'Exit Application', value:5}
    ];

    const question = {
        type: 'list',
        name: 'option',
        message: 'Select what you want to ADD:',
        choices: choicesArray
    };

    inquirer.prompt(question)
    .then(controller);
};

const addEmployee = () => {
    const array = [];

    queries.displayRoles()
    .then((result) => {
        array.push(result);
        return queries.displayManagers()
    })
    .then((result2) => {
        array.push(result2);
        const question = [
            {
                type: 'input',
                name: 'first_name',
                message: 'Please enter FIRST NAME of Employee:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter LAST NAME of Employee:',
            },
            {
                type: 'rawlist',
                name: 'role_id',
                message: 'Please choose ROLE from the following options:',
                choices: array[0]
            },
            {
                type: 'rawlist',
                name: 'manager_id',
                message: 'Select one Manager to be in charge of the employee:',
                choices: array[1]
            },
        ];
        return inquirer.prompt(question)
    })
    .then((data) => {
        console.log(data);
        return queries.addEmployee(data);
    })
    .then(() => startApp())
    .then(controller)
    .catch((err) => console.log(err))
};

const addDepartment = () => {
    queries.viewAllDepartmentAsync()
    .then(() => {
        const question = [
            {
                type: 'input',
                name: 'name',
                message: 'Please enter NAME of Department to ADD:',
            },
            {
                type: 'input',
                name: 'id',
                message: 'Please enter ID for the NEW Department (department id format: 8xx):',
            }
        ];
        return inquirer.prompt(question)
    })
    .then((data) => queries.addDepartment(data))
    .then(() => startApp())
    .then(controller)
    .catch((err) => console.log(err))
}

const addRole = () => {
    queries.viewAllRolesAsync()
    .then(() => queries.displayDepartments())
    .then((result) => {
        const question = [
            {
                type: 'input',
                name: 'id',
                message: 'Please enter ID of the New Role to ADD:',
            },
            {
                type: 'input',
                name: 'title',
                message: 'Please enter TITLE for the New Role:',
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Please enter SALARY for the New Role:',
            },
            {
                type: 'rawlist',
                name: 'department_id',
                message: 'Please choose the DEPARTMENT for the New Role:',
                choices: result
            }
        ];
        return inquirer.prompt(question)
    })
    .then((data) => queries.addRole(data))
    .then(() => startApp())
    .then(controller)
    .catch((err) => console.log(err))
}

const updateOption = () => {
    const choicesArray = [
        {name:'Update Employee', value:12},
        {name:'Update Department', value:13},
        {name:'Update Role', value:14},
        {name:'Exit Application', value:5}
    ];

    const question = {
        type: 'list',
        name: 'option',
        message: 'Select what you want to UPDATE:',
        choices: choicesArray
    };

    inquirer.prompt(question)
    .then(controller);
};

const updateEmployee = () => {
    queries.displayEmployees()
    .then((data) => {
        return inquirer.prompt({
            type: 'list',
            name: 'id',
            message: 'Please choose employee to UPDATE:',
            choices: data
        });
    })
    .then((data2) => Promise.all([
        queries.getDataEmployee(data2),
        queries.displayRoles(),
        queries.displayManagers()
    ]))
    .then((data3) => {
        const {id,first_name,last_name,role_id,manager_id} = data3[0][0];
        data3[2].push({name:'NULL', value:'null'});
        const defaultRole = parseInt(data3[1].findIndex((el) => el.value === role_id));
        const defaultManager = parseInt(data3[2].findIndex((el) => JSON.parse(el.value) == manager_id));
        return inquirer.prompt([
            {
                type: 'confirm',
                name: 'id',
                message: `Do you want to UPDATE details for ${first_name} ${last_name}?`,
                default:false
            },
            {
                type: 'input',
                name: 'first_name',
                message: `Please update FIRST NAME (if no changes, press enter to skip) :`,
                default: `${first_name}`
            },
            {
                type: 'input',
                name: 'last_name',
                message: `Please update LAST NAME (if no changes, press enter to skip) :`,
                default: `${last_name}`
            },
            {
                type: 'rawlist',
                name: 'role_id',
                message: `Please update ROLE ${first_name} ${last_name} (if no changes, press enter to skip) :`,
                choices: data3[1],
                default: defaultRole
            },
            {
                type: 'rawlist',
                name: 'manager_id',
                message: `Please update Manager for ${first_name} ${last_name} (if no changes, press enter to skip) :`,
                choices: data3[2],
                default: defaultManager
            }
        ])
        .then((result) => {
            if(result.id && result.manager_id === 'null') {
                result.id = id;
                result.manager_id = JSON.parse(result.manager_id);
            }else {
                result.id = id;
            };
            return result;
        })
    })
    .then((result) => queries.updateEmployee(result))
    .then(() => startApp())
    .then(controller)     
}

const updateDepartment = () => {
    queries.displayDepartments()
    .then((data) => {
        return inquirer.prompt([
            {
            type: 'list',
            name: 'id',
            message: 'Please choose Department to UPDATE:',
            choices: data
            }
        ])
    })
    .then((data2) => queries.getDataDepartment(data2))
    .then((data3) => {
        const {id,name} = data3[0];
        return inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: `Please update ID of ${name} Department (if no changes, press enter to skip) :`,
                default: `${id}`
            },
            {
                type: 'input',
                name: 'name',
                message: `Please update NAME of ${name} Department (if no changes, press enter to skip) :`,
                default: `${name}`
            },
        ])
        .then((result) => {
            result.oldID = id;
            return result;
        })
    })
    .then((result) => queries.updateDepartment(result))
    .then(() => startApp())
    .then(controller) 
}

const updateRole = () => {
    queries.displayRoles()
    .then((data) => {
        return inquirer.prompt([
            {
            type: 'list',
            name: 'id',
            message: 'Please choose Role to UPDATE:',
            choices: data
            }
        ])
    })
    .then((data2) => Promise.all([
        queries.getDataRole(data2),
        queries.displayDepartments()
    ]))
    .then((data3) => {
        const {id,title,salary,department_id} = data3[0][0];
        const defaultDepartment = parseInt(data3[1].findIndex((el) => el.value === department_id));
        return inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: `Please update ID of ${title} Role (if no changes, press enter to skip) :`,
                default: `${id}`
            },
            {
                type: 'input',
                name: 'title',
                message: `Please update TITLE of ${title} Role (if no changes, press enter to skip) :`,
                default: `${title}`
            },
            {
                type: 'number',
                name: 'salary',
                message: `Please update SALARY of ${title} Role (if no changes, press enter to skip) :`,
                default: `${salary}`
            },
            {
                type: 'rawlist',
                name: 'department_id',
                message: `Please update which Department the ${title} Role belongs (if no changes, press enter to skip) :`,
                choices: data3[1],
                default: defaultDepartment
            },
        ])
        .then((result) => {
            result.oldID = id;
            return result;
        })
    })
    .then((result) => queries.updateRole(result))
    .then(() => startApp())
    .then(controller) 
}

const deleteOption = () => {
    const choicesArray = [
        {name:'delete Employee', value:15},
        {name:'delete Department', value:16},
        {name:'delete Role', value:17},
        {name:'Exit Application', value:5}
    ];

    const question = {
        type: 'list',
        name: 'option',
        message: 'Select what you want to DELETE:',
        choices: choicesArray
    };

    inquirer.prompt(question)
    .then(controller);
};

const deleteEmployee = () => {
    queries.displayEmployees()
    .then((data) => inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: `Please select which employee to Delete:`,
            choices: data,
        },
        {
            type: 'confirm',
            name: 'delete',
            message: `Are you sure you want to delete this employee?`,
            default: false
        },
    ]))
    .then((data2) => {
        if(!data2.delete){
            deleteOption(); 
        }else{
            queries.deleteEmployee(data2)
            .then(() => startApp())
            .then(controller);
        }
    })
    .catch((err) => console.log(err));   
}

const deleteDepartment = () => {
    queries.displayDepartments()
    .then((data) => inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: `Please select which Department to DELETE:`,
            choices: data,
        },
        {
            type: 'confirm',
            name: 'delete',
            message: `Are you sure you want to delete this Department?`,
            default: false
        },
    ]))
    .then((data2) => {
        if(!data2.delete){
            deleteOption(); 
        }else{
            queries.deleteDepartment(data2)
            .then(() => startApp())
            .then(controller)
        }
    })
    .catch((err) => console.log(err));
}

const deleteRole = () => {
    queries.displayRoles()
    .then((data) => inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: `Please select which Role to DELETE:`,
            choices: data,
        },
        {
            type: 'confirm',
            name: 'delete',
            message: `Are you sure you want to delete this Role?`,
            default: false
        },
    ]))
    .then((data2) => {
        if(!data2.delete){
            deleteOption(); 
        }else{
            queries.deleteRole(data2)
            .then(() => startApp())
            .then(controller)
        }
    })
    .catch((err) => console.log(err));

}

//function to run when exiting the application
const exitApplication = () => {
    console.log('\nYou Are Exiting the Application\n')
    connection.end();
};

// export module
module.exports = {
    startApp,
    controller,
}