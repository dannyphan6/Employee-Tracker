const inquirer = require("inquirer");
const connection = require("./config/connection");
const consoleTable = require('console.table');

function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "View All Employees by Role", "Add Employee", "Remove Employee", "Add Department", "Remove Department", "Add Role", "Remove Role", "Update Employee Role", "Update Employee Manager", "Done"]
        }
    ]).then((response) => {
        switch(response.choices) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employees by Department":
                viewByDepartments();
                break;
            case "View All Employees by Manager":
                viewEmployeeManager();
                break;
            case "View All Employees by Role":
                viewByRole();
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