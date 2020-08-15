use employee_tracker;
insert into department (name)
values ( "Payroll"),
( "Dev"),
( "IT");


insert into role (title, salary, department_id)
values ("Accountant", 45000.00, 1),
("Admin", 55000.00, 1),
("Sr. Developer", 75000.00, 2),
("Jr. Developer", 60000.00, 2),
("Server Technichen", 65000.00, 3),
("It Ops", 50000,3);

insert into employee (first_name, last_name, role_id)
values ("Andrew", "Souza", 1),
("Bobby ", "Shmurda", 2),
("tom ", "cruise", 3),
("travis", "scott", 4),
("M &", "M", 5),
("Tom", "Wang", 6);

-- INSERT INTO department (department_name)
-- VALUES ("Develop");
-- INSERT INTO department (department_name)
-- VALUES ("Accounting");
-- INSERT INTO department (department_name)
-- VALUES ("Research");
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Manager", 200000, 1);
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Engineer", 100000, 2);
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("intern", 5000, 3);
-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ("Bobby","Shmurda", 2);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Andrew", "Souza", 3, 1);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("cruise", "Souza", 1, 2);
-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ("tom ", "cruise", 3);


