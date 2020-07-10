const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "rootpass",
    database: "employee_tracker"
});


connection.connect(function (err) {
    if (err) {
        throw err;
    }
});


startApp();

function startApp() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What action would you like to take?",
            choices: ["Add", "View", "Update", "Delete", "Exit"]
        }
    ])
        .then(answer => {
            switch (answer.action) {
                case "Add":
                    add();
                    break;

                case "View":
                    view();
                    break;

                case "Update":
                    update();
                    break;

                case "Delete":
                    remove();
                    break;

                case "Exit":
                    connection.end();
            };
        });

}


function add() {
    inquirer.prompt({
        name: "db",
        message: "What would you like to add?",
        type: "list",
        choices: ["department", "role", "employee"]

    })

        .then(res => {
            console.log(res)
            switch (res.db) {
                case "department":
                    add_department();
                    break;
                case "role":
                    add_role();
                    break;
                case "employee":
                    add_employee();
                    break;
            }
        })

}




function add_department() {
    inquirer.prompt(
        {
            name: "department_name",
            message: "What is th Department's name?",
            type: "input"
        }

    )

        .then(res => {
            connection.query(`insert into department (department_name) values ('${res.department_name}')`, function (err, data) {
                if (err) throw err;
                console.log("Department added")


            });
        });
};


function add_role() {
    let departments = [];
    connection.query(`select * from department`, function (err, data) {
        if (err) throw err;

        for (let i = 0; i < data.length; i++) {
            departments.push(data[i].department_name);
        }
        inquirer.prompt([
            {
                name: "position",
                message: "What is your role?",
                type: "input"
            },
            {
                name: "salary",
                message: "What is your salary?",
                type: "input"
            },
            {
                name: "department_id",
                message: "Which department does it belong to?",
                type: "list",
                choices: departments
            }
        ])
            .then(res => {
                let deptIndex = departments.indexOf(res.department_id);
                connection.query(`insert into role(title, salary, department_id) values ("${res.position}", "${res.salary}", "${deptIndex}")`, function (err, data) {
                    if (err) throw err;
                    console.log("Role successfully added!")
                })
            })

    })
}



function add_employee() {
    let employees = [];
    let roles = [];
    connection.query(`select * from employee`, function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            employees.push(data[i]);
            roles.push(data[i].role_id);
        }


        inquirer.prompt([
            {
                name: "first_name",
                message: "What's is the employees First Name?",
                type: "input"
            },
            {
                name: "last_name",
                message: "What's is the employees Last Name?",
                type: "input"
            },
            {
                name: "role",
                message: "What is employees role?",
                type: "list",
                choices: roles

            }

        ])
            .then(res => {

                connection.query(`insert into employee(first_name, last_name, role_id) values ("${res.first_name}", "${res.last_name}", "${res.role}")`, function (err, data) {
                    if (err) throw err;
                    console.log("employee successfully added!")
                });
            });

    });
}


function view() {
    inquirer.prompt(
        {
            name: "db",
            message: "What would you like to view?",
            type: "list",
            choices: ["department", "role", "employee"]
        }
    )
        .then(res => {
            switch (res.db) {
                case "department":
                    connection.query(`SELECT * FROM department ${res.db};`, function (err, data) {
                        if (err) throw err;
                        console.table(data)
                    })
                    connection.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id ;`, function (err, data) {
                        if (err) throw err;
                        console.table(data)
                    })
                    connection.query(`select (manager_id) = 2, (department_id) =2, first_name, last_name   from employee inner join role;`, (err, data) => {
                        if (err) throw err;
                        console.table(data)
                    })

                case "role":
                    connection.query(`SELECT *FROM role ${res.db}`, function (err, data) {
                        if (err) throw err;
                        console.table(data)
                    })
                    connection.query(`select title, salary, department_id from role left join employee on role.role_id = employee.role_id;`, function (err, data) {
                        if (err) throw err;
                        console.table(data)
                    })
                    connection.query(`select first_name, last_name, (manager_id) = 1, 2 from employee left join role on employee.role_id = role.role_id;`, function (err, data) {
                        if (err) throw err;
                        console.table(data)
                    })
                    connection.query(`select employee_id, first_name, last_name, manager_id from employee left join role  on employee.role_id = role.role_id where (manager_id) != 0;`, function (err, data) {
                        if (err) throw err;
                        console.table(data)
                    })

                case "employee":
                    connection.query(`select department_name, first_name, last_name, employee.role_id, role.department_id, title, salary, employee_id from department, role, employee;
                    `, function (err, data) {
                        if (err) throw err;
                        console.table(data)
                    })
                    connection.query(`select * from employee ,department group by department_name  order by role_id; `, function (err, data) {
                        if (err) throw err;
                        console.table(data)
                    })



            }
        })

}



function update() {
    inquirer.prompt(
        {
            name: "update",
            message: "What would you like to update?",
            type: "list",
            choices: ["role", "manager"]
        }

    ).then(function ({ update }) {
        switch (update) {
            case "role":
                update_role();
                break;
            case "manager":
                update_manager();
                break;
        }
    })
}



function update_role() {
    connection.query(`SELECT employee.employee_id, employee.first_name, employee.role_id, employee.last_name, role.title, role.department_id, department_name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id ;`, function (err, data, field) {
        if (err) throw err;
        var employees = [];
        var roles = [];
        var object = [];
        var objectId = [];

        for (let i = 0; i < data.length; i++) {
            employees.push(data[i].first_name);
            roles.push(data[i].title)
            object.push(data[i].department_id)
            objectId.push(data[i].role_id)
        }
        for (let i = 0; i < data.length; i++) {

        }


        inquirer.prompt([
            {
                name: "employeeName",
                message: "Employee getting updated? ",
                type: "list",
                choices: employees
            },
            {
                name: "role",
                message: "What is the emloyees role?",
                type: "list",
                choices: roles

            },
            {
                name: "departmentID",
                message: "What department is it being assigned?",
                type: "list",

                choices: ["None"].concat(object)
            }
        ])
            .then(res => {

                connection.query(`UPDATE role,employee SET title = "${res.role}", department_id = ${res.departmentID}  WHERE first_name = "${res.employeeName}"`, function (err, data) {
                    if (err) throw err;
                    console.table(data)
                    console.log("Employee info Updated")
                });

            });

    });
};

function update_manager() {


    connection.query(`select * from employee`, function (err, data) {
        if (err) {
            throw err;
        }
        let employees = [];
        for (let i = 0; i < data.length; i++) {
            employees.push(data[i].first_name)
        }

        inquirer.prompt([
            {
                name: "employee_id",
                message: "Employee getting updated?",
                type: "list",
                choices: employees
            },
            {
                name: "manager_id",
                message: "Who is the Manager?",
                type: "list",
                choices: ["none"].concat(employees)
            }

        ])
            .then(res => {
                if (employees.includes(res.manager_id)) {
                    console.log(res)
                }
            })
    });
}

function remove() {
    console.log("hello");
    inquirer.prompt({
        name: "deleteOptions",
        message: "Anything you would like to remove",
        type: "list",
        choices: ["Department", "Role", "Employee"]
    })
        .then(res => {
            switch (res.deleteOptions) {
                case "Department":
                    removeDept();
                    break;

                case "Role":
                    removeRole();
                    break;

                case "Employee":
                    removeEmployee();
                    break;
            };
        });

};

function removeDept() {
    connection.query(`SELECT * FROM department`, function (err, data) {
        var department = [];
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            department.push(data[i].department_name);
        };
        console.table(department)

        inquirer.prompt({
            name: "deptRemoval",
            message: "What department is beig removed?",
            type: "list",
            choices: department
        })
            .then(res => {

                connection.query(`DELETE FROM department where department_name = "${res.deptRemoval}"`);
                console.log("Department was successfully removed")
                connection.end();
            };

    });

});

    };

function removeRole() {
    connection.query(`SELECT * FROM role`, function (err, data) {
        var role = [];
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            role.push(data[i].title);
        };
        console.table(role)


        inquirer.prompt({
            name: "roleRemoval",
            message: "Which role do you wanna remove ?",
            type: "list",
            choices: role
        })
            .then(res => {

                connection.query(`DELETE FROM role where title = "${res.roleRemoval}"`);
                console.log("Role was successfully removed")
                connection.end();
            })
    });
};

function removeEmployee() {
    connection.query(`SELECT * FROM employee`, function (err, data) {
        var employee = [];
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            employee.push(data[i].first_name);
        };
        console.table(employee)

        inquirer.prompt({
            name: "employeeRemoval",
            message: "Which employee is being remove?",
            type: "list",
            choices: employee
        })
            .then(res => {
                connection.query(`DELETE FROM employee where first_name = "${res.employeeRemoval}"`, function (err, data) {
                    if (err) throw err;
                    console.log("Employee successfully removed")
                    connection.end();
                });
            });
    });

};

