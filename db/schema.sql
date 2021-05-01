DROP DATABASE IF EXISTS employee_trackerdb;
CREATE DATABASE employee_trackerdb;
USE employee_trackerdb;

CREATE TABLE departments (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
CONSTRAINT fk_dtp FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);