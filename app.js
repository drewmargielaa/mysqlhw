const mysql = require("mysql");
const { prompt } = require("inquirer");
const util = require("util");

const connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "rootpass",
    database: "employee_tracker"
});

connection.connect();

connection.query = util.promisify(connection.query);


startApp();

async function startApp() {
    const { action } = await prompt([
        {
            name: "action",
            type: "list",
            message: "What action would you like to take?",
            choices: [
                { name: "Add", value: "ADD" },
                { name: "View", value: "VIEW" },
                { name: "update", value: "UPDATE" },
                { name: "delete", value: "DELETE" },
                { name: "exit", value: "EXIT" }
            ]
        }
    ])
    switch (action) {
        case "ADD":
            return add();

        case "VIEW":
            return view();


        case "UPDATE":
            return update();


        case "DELETE":
            return remove();

        case "EXIT":
            return quit();
    };
};


async function add() {
    await prompt({
        name: "db",
        message: "What would you like to add?",
        type: "list",
        choices: ["department", "role", "employee"]
    })
}
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

async function add_department() {
    await prompt(
        {
            name: "department_name",
            message: "What is th Department's name?",
            type: "input"
        }

    )
    return connection.query(`insert into department (dname) values ('${res.department_name}')`,
    )
};


async function add_role() {
    let departments = [];
    connection.query(`select * from department`)
    await prompt([
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
    let deptIndex = departments.indexOf(res.department_id);
    return connection.query(`insert into role(title, salary, department_id) values ("${res.position}", "${res.salary}", "${deptIndex}")`)

}


async function add_employee() {
    let employees = [];
    let roles = [];
    connection.query(`select * from employee`)

    await prompt([
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
    return connection.query(`insert into employee(first_name, last_name, role_id) values ("${res.first_name}", "${res.last_name}", "${res.role}")`);
}


async function view() {
    await prompt(
        {
            name: "db",
            message: "What would you like to view?",
            type: "list",
            choices: ["department", "role", "employee"]
        }
    )
    switch (res.db) {
        case "department":
            return connection.query(`SELECT * FROM department ${res.db};`,)
        case "role":
            return connection.query(`SELECT *FROM role ${res.db}`,)

        case "employee":
            connection.query(`select department_name, first_name, last_name, employee.role_id, role.department_id, title, salary, employee_id from department, role, employee;`,)
            connection.query(`select * from employee ,department group by department_name  order by role_id; `,)
    }
}

async function update() {
    await prompt(
        {
            name: "update",
            message: "What would you like to update?",
            type: "list",
            choices: ["role", "manager"]
        }

    )
    switch (update) {
        case "role":
            update_role();
            break;
        case "manager":
            update_manager();
            break;
    }
}



async function update_role() {
    connection.query(`SELECT employee.employee_id, employee.first_name, employee.role_id, employee.last_name, role.title, role.department_id, department_name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id ;`,)
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


    await prompt([
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
    return connection.query(`UPDATE role,employee SET title = "${res.role}", department_id = ${res.departmentID}  WHERE first_name = "${res.employeeName}"`,)
}

async function update_manager() {


    connection.query(`select * from employee`,)
    await prompt([
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
    if (employees.includes(res.manager_id)) {
        console.log(res)
    }
}

async function remove() {
    await prompt({
        name: "deleteOptions",
        message: "Anything you would like to remove",
        type: "list",
        choices: ["Department", "Role", "Employee"]
    })
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
};

async function removeDept() {
    connection.query(`SELECT * FROM department`,)
    await prompt({
        name: "deptRemoval",
        message: "What department is beig removed?",
        type: "list",
        choices: department
    })

    return connection.query(`DELETE FROM department where department_name = "${res.deptRemoval}"`);

}

async function removeRole() {
    connection.query(`SELECT * FROM role`,)
    await prompt({
        name: "roleRemoval",
        message: "Which role do you wanna remove ?",
        type: "list",
        choices: role
    })
    return connection.query(`DELETE FROM role where title = "${res.roleRemoval}"`)
};

async function removeEmployee() {
    connection.query(`SELECT * FROM employee`,)
    await prompt({
        name: "employeeRemoval",
        message: "Which employee is being removed?",
        type: "list",
        choices: employee
    })
};