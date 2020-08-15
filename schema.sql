DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;
USE employee_tracker;
 
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) not NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) not NULL,
  salary DECIMAL(30,2) not NULL,
  department_id INT,
  PRIMARY KEY (id)

);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) not NULL,
  last_name VARCHAR(30) not NULL,
  role_id INT not NULL,
  manager_id INT,
  PRIMARY KEY (id)

);


select * from role cross join employee;

-- replace into employee(first_name, last_name)
-- values("Andrew", "Souza"),
-- ("Tom", "Cruise"),
-- ("Bobby", "Shmurda"),
-- ("Travis", "Scott");


