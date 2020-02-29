///// YATA: Yet Another Todo-list App /////
///// Abdalrahim G. Fakhouri /////
///// github:abdilra7eem/yata-backend /////
///// Please refer to README.md for more details /////

/////////////////// Set up: //////////////////////////////
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

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

//Body parser needed mostly for 'POST' requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


////////////////// Routes : /////////////////////


// Get all todos
app.get('/getTodos', (req,res)=>{
    let sql="select * from yataTodo";
    db.query(sql, (err, result)=>{
        if (err) throw err;
        res.send(result);
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
        if (err) console.log(err);
        res.send("deleted");
    });
});

app.post('/setTodo', (req,res)=>{
    let id = parseInt(req.body.id);
    let isDone = req.body.isDone === true ? true: false;
    let todo = req.body.todo;

    let MyReq = {
        'id': id,
        'isDone' : isDone,
        'todo':todo
    }

    console.log(MyReq);

    if (MyReq.id === 0 || Number.isNaN(MyReq.id)){
        let sql = 'insert into yataTodo (isDone, todo) values (?, ?)';
        db.query(sql, [MyReq.isDone, MyReq.todo], (err, result)=>{
            if (err) console.log(err);
            res.send("created");
        });
    } else {
        if (MyReq.isDone == undefined || MyReq.todo == undefined){
            res.send("To update an entry, you must provide all arguments");
        } else {
            let sql = 'update yataTodo set isDone = ? , todo = ? where id = ?';
            db.query(sql, [MyReq.isDone, MyReq.todo, MyReq.id], (err, result)=>{
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