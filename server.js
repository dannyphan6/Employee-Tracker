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
    // Views employees from 'employees' table
    connection.query("SELECT * FROM employees", (err, response) => {
        console.table(response)
        startApp();
    })
}

function viewAllDepartments() {
    // Views departments from 'departments' table
    connection.query("SELECT * FROM departments", (err, response) => {
        console.table(response)
        startApp();
    })
}

function viewEmployeeManager() {

}

function viewAllRoles() {
    // Views roles from 'roles' table
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
            message: "Please enter employee's first name."
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter employee's last name."
        },
        {
            type: "input",
            name: "roleId",
            message: "Please enter employee's role ID."
        },
        {
            type: "input",
            name: "managerId",
            message: "Please enter employee's Manager ID.",
            default: "Null"
        }
    ]).then((response) => {
        // Inserts values into 'employees' table
        connection.query("INSERT INTO employees SET ?", {

            // Inserts values into 'employees' table and their respective columns
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
    connection.query("SELECT * FROM employees", (err, res) => {
        console.log(res)

        const allEmployees = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))

        console.log(allEmployees)
        inquirer.prompt([
            {
                type: "list",
                name: "removeEmployee",
                message: "Please select the employee you would like to remove.",
                choices: allEmployees
            }
        ]).then((answer) => {
            console.log(answer.removeEmployee)
        })
    })
    
    let employeeId = 1
    connection.query("DELETE FROM employees WHERE id = ?", employeeId)
    
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

            // Inserts values into 'department' table and their respective columns
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
            message: "Please enter employee's role title."
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter employee's salary."
        },
        {
            type: "input",
            name: "departmentId",
            message: "Please enter employee's department ID."
        }
    ]).then((response) => {
        connection.query("INSERT INTO roles SET ?", {
            // Inserts values into 'roles' table and their respective columns
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
            message: "Please enter employee's ID."
        },
        {
            type: "input",
            name: "newId",
            message: "Please enter the new role ID for the employee."
        }
    ]).then((response) => {
        connection.query("UPDATE employees SET role_id = ? WHERE id = ?", 
        // 'id' correlates with the specific employee in the table, and then updates their role_id
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
