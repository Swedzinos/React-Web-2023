import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"przedmioty_inwentarzowe",
    connectionLimit: 10
});

export default db;