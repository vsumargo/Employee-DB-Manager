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
    // return new Promise ((resolve) => {
    //     const {startOption} = result
    //     switch (startOption){
    //         case 1: resolve(viewOption()); break;
    //         case 2: resolve(addOption()); break;
    //         case 3: resolve(updateOption()); break;
    //         case 4: resolve(deleteOption()); break;
    //         case 5: resolve(exitApplication()); break;
    //         case 6: resolve(viewAllEmployee()); break;
    //     }
    // })
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
            case 11: addRoles(); break;
            case 12: updateEmployee(); break;
            case 13: updateDepartment(); break;
            case 14: updateRoles(); break;
            case 15: deleteEmployee(); break;
            case 16: deleteDepartment(); break;
            case 17: deleteRoles(); break;
            case 18: sortEmployeeByID(); break;
            case 19: sortEmployeeByManager(); break;
            default:break;
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

    inquirer.prompt(question).then((result) => {
        console.log(result);
        controller(result);
    });
};

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

    inquirer.prompt(question).then((result) => {
        console.log(result);
        controller(result);
    });
};

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

    inquirer.prompt(question).then((result) => {
        console.log(result);
        controller(result);
    });
};

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

    inquirer.prompt(question).then((result) => {
        console.log(result);
        controller(result);
    });
};

const exitApplication = () => {
    console.log('You Are Exiting the Application')
    connection.end();
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

    inquirer.prompt(question).then((result) => {
        console.log(result);
        controller(result);
    });
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
    //run mySQL query here
    queries.viewAllRolesAsync()
    .then(() => startApp())
    .then(controller);
}

module.exports = {
    startApp,
    controller,
}