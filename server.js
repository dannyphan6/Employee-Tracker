const inquirer = require("inquirer");
const connection = require("./config/connection");
const consoleTable = require('console.table');

function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "View All Employees by Role", "Add Employee", "Remove Employee", "Add Department", "Remove Department", "Add Role", "Remove Role", "Update Employee Role", "Update Employee Manager"]
        }
    ]);
};