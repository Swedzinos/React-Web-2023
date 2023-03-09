import express from "express";
import db from "./config/db.js";
import cors from "cors";

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all things
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM inwentarz", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});


// Route for creating the thing in progress
app.post("/api/create", (req, res) => {
  const nr_laboranta = req.body.Nr_laboranta;
  const ilosc = req.body.Ilosc;
  const miejsce = req.body.Miejsce;
  const nazwa_sprzetu = req.body.Nazwa_sprzetu;
  const nr_inwentarzowy = req.body.Nr_inwentarzowy;
  const uzytkownik_sprzetu = req.body.Uzytkownik_sprzetu;
  const rodzaj_sprzętu = req.body.Rodzaj_sprzetu;
  const typ_sprzętu = req.body.Typ_sprzetu;
  const do_wybrakowania = req.body.Do_wybrakowania;

  db.query("INSERT INTO inwentarz (Nr_laboranta, Ilość, Miejsce, Nazwa_sprzętu, Nr_inwentarzowy, Uzytkownik_sprzetu, Rodzaj_sprzętu, Typ_sprzętu, Do_wybrakowania) VALUES (?,?,?,?,?,?,?,?,?)",
    [nr_laboranta, ilosc, miejsce, nazwa_sprzetu, nr_inwentarzowy, uzytkownik_sprzetu, rodzaj_sprzętu, typ_sprzętu, do_wybrakowania],
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
