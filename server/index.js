import express from "express";
import db from "./config/db.js";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());

// Route to get all things
app.get("/api/get/", (req, res) => {
    const selectQuery = "SELECT * FROM inventory_list";
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.get("/api/get/users", (req, res) => {
    const selectQuery = "SELECT `username` FROM `users`";
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
app.get("/api/get/labs", (req, res) => {
    const selectQuery = "SELECT `lab_id` FROM `labs`";
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
app.get("/api/get/places", (req, res) => {
    const selectQuery = "SELECT `name` FROM `places`";
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
app.get("/api/get/categories", (req, res) => {
    const selectQuery = "SELECT `category_name` FROM `categories`";
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

// Route for creating
app.post("/api/create", (req, res) => {
    const lab_id = req.body.lab_id;
    const amount = req.body.amount;
    const name = req.body.name;
    const inventory_number = req.body.inventory_number;
    const state_type = req.body.state_type;
    const damaged = req.body.damaged;
    let place_id = req.body.place_id;
    let user_id = req.body.user_id;
    let category_id = req.body.category_id;
    if(place_id == "" ||place_id == undefined){
        place_id = null;
    }
    if(user_id == "" || user_id == undefined){
        user_id = null;
    }
    if(category_id == "" || category_id == undefined){
        category_id = null;
    }


    db.query("INSERT INTO `inventory_list`(`lab_id`, `user_name`, `place`, `category`, `amount`, `name`, `inventory_number`, `state`, `damaged`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [lab_id, user_id, place_id, category_id, amount, name, inventory_number, state_type, damaged],
        (err, queryRes) => {
            if (err) {
                res.send({message: "Nieprawidłowe dane!"});
                console.log(err);
            }
            res.send({message: "Dodano"});
        }
    );
});


app.post("/api/update", (req, res) => {
    const id = req.body.id;
    const labID = req.body.labID;
    const amount = req.body.amount;
    const name = req.body.name;
    const inventory_number = req.body.inventory_number;
    const state = req.body.state;
    const damaged = req.body.damaged;
    let place = req.body.place;
    let username = req.body.username;
    let category = req.body.category;
    
    let queryupdate = "UPDATE `inventory_list` SET  `lab_id` = ?, `amount` = ?, `place` = ?, `name` = ?, `inventory_number` = ?, `user_name` = ?, `category` = ?, `state` = ?, `damaged` = ? WHERE `id` = ?;";
    if(username == 'null' || username == ""){
        username = null;
    }
    if(place == 'null' || place == ""){
        place = null;
    }
    if(category == 'null' || category == ""){
        category = null;
    }

    if(amount.trim().replace(" ", "") == "" || name.trim().replace(" ", "") == "" || inventory_number.trim().replace(" ", "") =="") {
        res.send({warn: "Uzupełnij potrzebne dane!"});
    } else {
        db.query(queryupdate,
            [labID, amount, place, name, inventory_number, username, category, state, damaged, id],
            (err, queryRes) => {
                if (err) {
                    res.send(err.message);
                    console.log(err);
                }

                if(queryRes.changedRows > 0){
                    res.send({message: "Dane zmieniono pomyślnie"});
                }else{
                    res.send({message: "Zmień dane aby zatwierdzić zmiany"});
                }
            }
        );
    }
});

const encrypt = (content) => {
    return crypto.createHash('sha3-256').update(content).digest("base64");
}

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = encrypt(req.body.password);
    
    db.query("SELECT * FROM `logins` WHERE username = ? AND password = ?;", [username, password], (err, queryRes) => {
        if(err) {
            req.setEncoding({err: err});
        }

        if(queryRes.length > 0){
            res.send(queryRes);
        }else{
            res.send({message: "Podane dane są nieprawidłowe!"})
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
   
    db.query("DELETE FROM `inventory_list` WHERE `id` = ?;", [id], (err, queryRes) => {
        if(err) {
            console.log(err);
            res.send(err);
        } 
        
        if(queryRes.affectedRows <= 0){
            res.send({message: "Cos poszlo nie tak!"})
        } else {
            res.send({message: "Usunięto"})
        }

    })
})

app.post("/api/create/places", (req, res) => {
    const colName = req.body.colName;

    db.query("INSERT INTO `places`(`name`) VALUES (?) ON DUPLICATE KEY UPDATE `name` = ?;",
        [colName, colName],
        (err, queryRes) => {
            if (err) {
                res.send({message: "Nieprawidłowe dane!"});
                console.log(err.sqlMessage);
            }
            res.send({message: "Dodano", successed: true});
        }
    );
});

app.post("/api/create/users", (req, res) => {
    const colName = req.body.colName;

    db.query("INSERT INTO `users`(`username`) VALUES (?) ON DUPLICATE KEY UPDATE `username` = ?;",
        [colName, colName],
        (err, queryRes) => {
            if (err) {
                res.send({message: "Nieprawidłowe dane!"});
                console.log(err.sqlMessage);
            }
            res.send({message: "Dodano", successed: true});
        }
    );
});

app.post("/api/create/categories", (req, res) => {
    const colName = req.body.colName;

    db.query("INSERT INTO `categories`(`category_name`) VALUES (?) ON DUPLICATE KEY UPDATE `category_name` = ?;",
        [colName, colName],
        (err, queryRes) => {
            if (err) {
                res.send({message: "Nieprawidłowe dane!"});
                console.log(err.sqlMessage);
            }
            res.send({message: "Dodano", successed: true});
        }
    );
});

app.delete("/delete/places/:colName", (req, res) => {
    const colName = req.params.colName;
   
    db.query("DELETE FROM `places` WHERE `name` = ?;", [colName], (err, queryRes) => {
        if(err) {
            console.log(err);
            res.send(err);
        } 
        
        if(queryRes.affectedRows <= 0){
            res.send({message: "Brak pasujących danych!"})
        } else {
            res.send({message: "Usunięto", successed: true})
        }
        console.log(queryRes);
    })
});

app.delete("/delete/users/:colName", (req, res) => {
    const colName = req.params.colName;
   
    db.query("DELETE FROM `users` WHERE `username` = ?;", [colName], (err, queryRes) => {
        if(err) {
            console.log(err);
            res.send(err);
        } 
        
        if(queryRes.affectedRows <= 0){
            res.send({message: "Brak pasujących danych!"})
        } else {
            res.send({message: "Usunięto", successed: true})
        }
        console.log(queryRes);
    })
});

app.delete("/delete/categories/:colName", (req, res) => {
    const colName = req.params.colName;
   
    db.query("DELETE FROM `categories` WHERE `category_name` = ?;", [colName], (err, queryRes) => {
        if(err) {
            console.log(err);
            res.send(err);
        } 
        
        if(queryRes.affectedRows <= 0){
            res.send({message: "Brak pasujących danych!"})
        } else {
            res.send({message: "Usunięto", successed: true})
        }
    })
});

app.listen(PORT, process.env.SERVER_ADDR, () => {
    console.log(`Server is running on ${process.env.SERVER_ADDR}:${PORT}`);
});
