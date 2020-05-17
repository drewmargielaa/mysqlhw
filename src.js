var mySql = require('mysql');
var inquirer = require("inquirer");
var script = require("./sql/index");

var connection = mySql.createConnection ({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'rootpass',
    database: 'employee-tracker'
});
start();

function start(){
  prompts();
};

function prompts() {
  inquirer
    .prompt({
      type:"checkbox",
      name: "bigList",
      message: "View All Employees",
      choices: [{
        name:"View Employees",
        value:"View_Employees" 
      },
      {
        name:"Add Department, Roles, Employees",
        value:"Add_Employees"
      },
      {
        name:"Update employee role",
        value:"Update_Employee_Role"
      }
      ]
    }) 
  };

  script.findEmployee();

connection.query('SELECT * FROM Department', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Database:');
    console.log(rows);
  });

  function getDepartment(){
    connection.query("SELECT * FROM Department", function(err, res){
        if(err){throw err};
        console.log(res);
    });
  }

  connection.query('SELECT * FROM Role', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Database:');
    console.log(rows);
  });

  function getRole(){
    connection.query("SELECT * FROM Role", function(err, res){
        if(err){throw err};
        console.log(res);
    });
  }

  connection.query('SELECT * FROM Employee', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Database:');
    console.log(rows);
  });

  function getEmployee(){
    connection.query("SELECT * Employee", function(err, res){
        if(err){throw err};
        console.log(res);
    });
  }
