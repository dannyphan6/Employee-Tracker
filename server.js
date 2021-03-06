const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sassygirl3991",
    database: "employee_trackerdb"
});

connection.connect(function (err) {
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
            choices: ["Add Department", "Remove Department", "View All Departments", "Add Role", "Remove Role", "Update Employee Role", "View All Roles", "Add Employee", "Remove Employee", "Update Employee Manager", "View All Employees", "View All Employees by Manager", "Done"]
        }
    ]).then((response) => {
        switch (response.choices) {
            case "Add Department":
                addDepartment();
                break;
            case "Remove Department":
                removeDepartment();
                break;
            case "View All Departments":
                viewAllDepartments();
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
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employees by Manager":
                viewEmployeeManager();
                break;
            case "Done":
                connection.end();
                break;
        };
    });
};

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
        });
    });
};

function removeDepartment() {
    connection.query("SELECT * FROM departments", (err, res) => {
        // console.log(res)

        const allDepartments = res.map(({ id, department_name }) => ({
            name: `${department_name}`,
            value: id
        }));

        inquirer.prompt([
            {
                type: "list",
                name: "removeDepartment",
                message: "Please select the department you would like to remove.",
                choices: allDepartments
            }
        ]).then((answer) => {
            // console.log(answer.removeDepartment)
            connection.query("DELETE FROM departments where id = ?", answer.removeDepartment)
            console.log("Department has been removed successfully!")
            startApp();
        });
    });
};

function viewAllDepartments() {
    // Views departments from 'departments' table
    connection.query("SELECT * FROM departments", (err, res) => {
        console.table(res)
        startApp();
    });
};

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
        });
    });
};

function removeRole() {
    connection.query("SELECT * FROM roles", (err, res) => {
        // console.log(res);

        const allRoles = res.map(({ id, title }) => ({
            name: `${title}`,
            value: id
        }));

        inquirer.prompt([
            {
                type: "list",
                name: "removeRole",
                message: "Please select the role you would like to remove.",
                choices: allRoles
            }
        ]).then((answer) => {
            connection.query("DELETE FROM roles WHERE id = ?", answer.removeRole)
            console.log("Role has been removed successfully!")
            startApp();
        });
    });
};

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
        });
    });
};

function viewAllRoles() {
    // Views roles from 'roles' table
    connection.query("SELECT * FROM roles", (err, res) => {
        console.table(res)
        startApp();
    });
};

function addEmployee() {
    // If manager_id is null, then that means the employee is a manager
    connection.query("SELECT * FROM employees WHERE manager_id IS null", (err, res) => {
        // console.log(res)

        // Loops through the query to grab all the employees who have an manager_id of null, which states that they're a manager
        const employeeManager = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        // unshift adds a value to the beginning of the array
        employeeManager.unshift({ name: "None", value: null });

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
                type: "list",
                name: "managerId",
                message: "Please select the Manager for this employee.",
                choices: employeeManager
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
            });
        });
    });
};

function removeEmployee() {
    // Shows all employees for the user to choose from
    connection.query("SELECT * FROM employees", (err, res) => {
        // console.log(res)

        // Creates an array that breaks down the object and grabs the values of id, first_name, and last_name
        const allEmployees = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        // console.log(allEmployees)
        inquirer.prompt([
            {
                type: "list",
                name: "removeEmployee",
                message: "Please select the employee you would like to remove.",
                choices: allEmployees
            }
        ]).then((answer) => {
            // console.log(answer.removeEmployee)

            // answer.removeEmployee is plugged into the id, which allows for deletion of an employee from the table 'employees'
            connection.query("DELETE FROM employees WHERE id = ?", answer.removeEmployee)
            console.log("Employee has been removed successfully!")
            startApp();
        });
    });
};

function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "Please enter employee's ID."
        },
        {
            type: "input",
            name: "newId",
            message: "Please enter the new manager ID."
        }
    ]).then((response) => {
        connection.query("UPDATE employees SET manager_id = ? WHERE id = ?",
        // 'id' correlates with the specific employee in the table, and then updates their role_id
        [response.newId, response.employeeId],
        err => {
            if (err) throw err;
            console.log("Manager ID has been updated!")
            startApp();
        });
    });
};

function viewAllEmployees() {
    // Selects all rows up to FROM where employees is joined with roles (IF roles.id and employee.role_id match then grab all data from 'SELECT')
    connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS departments, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on roles.id = employees.role_id LEFT JOIN departments ON departments.id = roles.department_id LEFT JOIN employees manager ON manager.id = employees.manager_id;", (err, res) => {
        console.table(res);
        startApp();
    });
};

function viewEmployeeManager() {
    // If manager_id is null, then that means the employee is a manager
    connection.query("SELECT * FROM employees WHERE manager_id IS null", (err, res) => {
        // console.log(res);

        const employeeManager = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        inquirer.prompt([
            {
                type: "list",
                name: "viewEmployeeManager",
                message: "Please select the manager who's employees you would like to view.",
                choices: employeeManager
            }
        ]).then((answer) => {
            // Views employees where the manager_id matches with the user choice that is selected
            connection.query("SELECT * FROM employees WHERE manager_id = ?", answer.viewEmployeeManager, (err, res) => {
                console.table(res);
                startApp();
            });
        });
    });
};