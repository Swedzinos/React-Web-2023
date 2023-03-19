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

// Route for creating the thing in progress
app.post("/api/create", (req, res) => {
    const lab_id = req.body.lab_id;
    const amount = req.body.amount;
    const place_id = req.body.place_id;
    const name = req.body.name;
    const inventory_number = req.body.inventory_number;
    const user_id = req.body.user_id;
    const category_id = req.body.category_id;
    const state_type = req.body.state_type;
    const damaged = req.body.damaged;

    db.query("INSERT INTO `inventory_list`(`lab_id`, `user_name`, `place`, `category`, `amount`, `name`, `inventory_number`, `state`, `damaged`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [lab_id, user_id, place_id, category_id, amount, name, inventory_number, state_type, damaged],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        }
    );
});
app.post("/api/update", (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    console.log("UPDATE `inventory_list` SET `user_name` = " + username + " WHERE `id` = " + id + ";");
    // db.query("UPDATE `inventory_list` SET `user_name`= ? WHERE `id` = ?;",
    db.query("UPDATE `inventory_list` SET `user_name`= '" + username + "' WHERE `id` = " + id + ";",
        [username, id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
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
        } else {
            if(queryRes.length > 0){
                res.send(queryRes);
            }else{
                res.send({message: "Podane dane są nieprawidłowe!"})
            }
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
   
    db.query("DELETE FROM `inventory_list` WHERE `id` = ?;", [id], (err, queryRes) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            if(queryRes.length <= 0){
                res.send({message: "Cos poszlo nie tak!"})
            } else {
                res.send({message: "Usunięto!"})
            }
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
