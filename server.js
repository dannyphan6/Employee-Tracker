const inquirer = require("inquirer");
const mysql = require("mysql");
require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sassygirl3991",
    database: "employee_trackerdb"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log(`App listening on PORT ${connection.threadId}`)
    startApp();
});

function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Employees by Manager", "View All Roles", "Add Employee", "Remove Employee", "Add Department", "Remove Department", "Add Role", "Remove Role", "Update Employee Role", "Update Employee Manager", "Done"]
        }
    ]).then((response) => {
        switch(response.choices) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Employees by Manager":
                viewEmployeeManager();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Remove Department":
                removeDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Done":
                connection.end();
                break;
        }
    })
};

function viewAllEmployees() {
    connection.query("SELECT * FROM employees", (err, response) => {
        console.table(response)
        startApp();
    })
}

function viewAllDepartments() {
    connection.query("SELECT * FROM departments", (err, response) => {
        console.table(response)
        startApp();
    })
}

function viewEmployeeManager() {

}

function viewAllRoles() {
    connection.query("SELECT * FROM roles", (err, response) => {
        console.table(response)
        startApp();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter your first name."
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter your last name."
        },
        {
            type: "input",
            name: "roleId",
            message: "Please enter your role ID."
        },
        {
            type: "input",
            name: "managerId",
            message: "Please enter your Manager ID.",
            default: "Null"
        }
    ]).then((response) => {
        connection.query("INSERT INTO employees SET ?", {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: response.roleId,
            manager_id: response.managerId
        }, err => {
            if (err) throw err;
            console.log("Employee was added successfully!")
            startApp();
        }) 
    })
}

function removeEmployee() {

}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "Please enter the department name."
        }
    ]).then((response) => {
        connection.query("INSERT INTO departments SET ?", {
            department_name: response.departmentName
        }, err => {
            if (err) throw err;
            console.log("Department was added successfully!")
            startApp();
        }) 
    })
}

function removeDepartment() {

}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter your role title."
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter your salary."
        },
        {
            type: "input",
            name: "departmentId",
            message: "Please enter your department ID."
        }
    ]).then((response) => {
        connection.query("INSERT INTO roles SET ?", {
            title: response.title,
            salary: response.salary,
            department_id: response.departmentId,
        }, err => {
            if (err) throw err;
            console.log("Role was added successfully!")
            startApp();
        }) 
    })
}

function removeRole() {

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "Please enter your Employee ID."
        },
        {
            type: "input",
            name: "newId",
            message: "Please enter the new role ID for the employee."
        }
    ]).then((response) => {
        connection.query("UPDATE employees SET role_id = ? WHERE id = ?", 
        [response.newId, response.employeeId],
        err => {
            if (err) throw err;
            console.log("Employee Role has been updated!")
            startApp();
        }) 
    })
}

function updateEmployeeManager() {

}
