///// YATA: Yet Another Todo-list App /////
///// Abdalrahim G. Fakhouri /////
///// github:abdilra7eem/yata-backend /////
///// Please refer to README.md for more details /////

/////////////////// Set up: //////////////////////////////
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')

// Database setup
const dbaccess = require('./.db-settings.js');
console.log("Connecting to: ",dbaccess);
const db = mysql.createConnection(dbaccess);

db.connect((err)=>{
    if (err){
        throw err;
    }
    console.log('MySQL connected ...');
});

// Create app
const app = express();

// Set up Cross Origin Resource Sharing (CORS)
// Edit the 'whitelist' array of allowed origins:
const whitelist = ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

//Body parser needed mostly for 'POST' requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////////////////// Routes : /////////////////////


// Get all todos
app.get('/getTodos', (req,res)=>{
    let sql="select * from yataTodo";
    db.query(sql, (err, result)=>{
        if (err) throw err;
        // (result)=>{
        //     let result2 = JSON.stringify(result);
            res.send(result);
        // }
    });
});

// Get a single todo
app.get('/getTodo/:id', (req,res)=>{
    let id = parseInt(req.params.id);
    let sql=`select * from yataTodo where id = ?`;
    db.query(sql, id, (err, result)=>{
        if (err) console.log(err);
        res.send(result);
    });
});

// Delete todo by id
app.get('/deleteTodo/:id', (req,res)=>{
    let id = parseInt(req.params.id);
    console.log("id = ",id);
    let sql=`delete from yataTodo where id = ?`;
    db.query(sql, id, (err, result)=>{
        if (err) { 
            console.log(err); 
            res.send("error");
        } else {
        res.send("deleted");
        }
    });
});

app.post('/setTodo', (req,res)=>{
    console.log(req.body);
    let id = parseInt(req.body.id);
    let isdone = (req.body.isdone === true || req.body.isdone === 1) ? 1: 0;
    let todo = req.body.todo;

    if (id === 0 || Number.isNaN(id)){
        console.log('inserting a new todo');
        let sql = 'insert into yataTodo (isdone, todo) values (?, ?)';
        db.query(sql, [isdone, todo], (err, result)=>{
            if (err) {
                console.log(err) 
                res.send("Error");
            }else {
                let todoid = ""+result.insertId+"";  // converted the "status" to a "string" to avoid multiple types of results on the client side.
                res.send(todoid);
            }
        });
    } else {
        if (isdone == undefined || todo == undefined){ // weak '==' used to compare both 'undefined' and 'NULL'
            res.send("To update an entry, you must provide all arguments");
        } else {
            console.log('updating an existing todo');
            let sql = 'update yataTodo set isdone = ? , todo = ? where id = ?';
            db.query(sql, [isdone, todo, id], (err, result)=>{
                if (err) console.log(err);
                res.send("updated");
            });
        }
    }

});

////////////////////// Server Listen : ////////////////////

app.listen(4000, ()=>{
    console.log('Yata backend server started on port 4000');
});
