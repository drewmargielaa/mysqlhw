const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'rootpass',
    database: 'employee-tracker'
});

connection.connect();



class sql {
    constructor(connection) {
        this.connection = connection;
    };

findEmployee() {
    return this.connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manger_id");
};

addEmployee(employee) 
{
    return this.connection.query("INSERT INTO employee SET ?", employee)
console.log("Inserting newemployee...\n")
};

updateEmployee(employeeID, employeeRole_ID) 
{
    return this.connection.query(
        "UPDATE employee SET employee.Role_ID=? WHERE employee.ID=?",

        [employee.Role_Id, employee.ID]
    )}
};

module.exports = new connection(connection);