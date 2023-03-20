import express from "express";
import db from "./config/db.js";
import cors from "cors";
import crypto from "crypto";

const app = express();
const PORT = 3002;
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
    const selectQuery = "SELECT `id` FROM `labs`";
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
    let username = req.body.username;
    let place = req.body.place;
    let category = req.body.category;
    let queryupdate = "UPDATE `inventory_list` SET `user_name`= ?, `place`= ?, `category`= ? WHERE `id` =  "+ id +" ;";
    if(username == 'null' || username == ""){
        username = null;
    }
    if(place == 'null' || place == ""){
        place = null;
    }
    if(category == 'null' || category == ""){
        category = null;
    }

    db.query(queryupdate,
        [username, place, category, id],
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

            console.log(queryRes);
        }
    );
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
        console.log(queryRes);
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
