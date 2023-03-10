import express from "express";
import db from "./config/db.js";
import cors from "cors";

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all things
app.get("/api/get", (req, res) => {
    const selectQuery = "SELECT `il`.`id`, `l`.`id` AS `lab_id`, CONCAT(`u`.`firstname`, ' ', `u`.`surname`) AS `user_name`, `p`.`name` AS `place`, `c`.`category_name` AS `category`, `il`.`amount`, `il`.`name`, `il`.`inventory_number`, `il`.`state`, `il`.`damaged` " +
        "FROM `inventory_list` `il` " +
            "INNER JOIN `labs` AS `l` ON `l`.id = `il`.`lab_id` " +
            "INNER JOIN `users` AS `u` ON `u`.`id` = `il`.`user_id` " +
            "INNER JOIN `places` AS `p` ON `p`.`id` = `il`.`place_id` " +
            "INNER JOIN `categories` AS `c` ON `c`.`id` = `il`.`category_id`; ";
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.get("/api/get/users/:name", (req, res) => {
    const selectQuery = "SELECT `id` FROM `users` WHERE CONCAT(`firstname`, ' ', `surname`) = '"+req.params.name+" '";
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.get("/api/get/categories/:name", (req, res) => {
    const selectQuery = "SELECT `id` FROM `categories` WHERE `category_name` = '"+req.params.name+"';";
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.get("/api/get/places/:name", (req, res) => {
    const selectQuery = "SELECT `id` FROM `places` WHERE `name` = '"+req.params.name+"';";
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

    db.query("INSERT INTO `inventory_list`(`lab_id`, `user_id`, `place_id`, `category_id`, `amount`, `name`, `inventory_number`, `state`, `damaged`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [lab_id, user_id, place_id, category_id, amount, name, inventory_number, state_type, damaged],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        }
    );
});


// Route to delete a thing in progress

// app.delete('/api/delete/:id',(req,res)=>{
// const id = req.params.id;

// db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
// if(err) {
// console.log(err)
//         } }) })

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
