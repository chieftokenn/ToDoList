const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

app.get('/', (re, res)=> {
    return res.json("From backend")
})

app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/users', (req, res) => {
    const { username, email, password } = req.body; 
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "User created", id: result.insertId });
    });
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body; // Adaptez à vos besoins
    const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    db.query(sql, [name, email, password, id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
        return res.json({ message: "User updated" });
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM user WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
        return res.json({ message: "User deleted" });
    });
})

app.listen(8081, ()=> {
    console.log("listening")
})