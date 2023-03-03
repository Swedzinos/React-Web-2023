import React, { useState, useEffect } from "react";
import Axios from "axios";

import "../css/List.css";

function DBThings() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((data) => {
      setPostList(data.data);
    });
  }, []);
  const showThings = postList.map((val, key) => (
    <tr key={val.id}>
      <td>{val.Nr_laboranta}</td>
      <td>{val.Ilość}</td>
      <td>{val.Miejsce}</td>
      <td>{val.Nazwa_sprzętu}</td>
      <td>{val.Nr_inwentarzowy}</td>
      <td>{val.Użytkownik_sprzętu}</td>
      <td>{val.Rodzaj_sprzętu}</td>
      <td>{val.Typ_sprzętu}</td>
      <td>{val.Do_wybrakowania}</td>
    </tr>
  ));
  return showThings;
}
function AddThings() {
  const [Nr_laboranta, setNr_laboranta] = useState("");
  const [Ilosc, setIlosc] = useState("");
  const [Miejsce, setMiejsce] = useState("");
  const [Nazwa_sprzetu, setNazwa_sprzetu] = useState("");
  const [Nr_inwentarzowy, setNr_inwentarzowy] = useState("");
  const [Uzytkownik_sprzetu, setUzytkownik_sprzetu] = useState("");
  const [Rodzaj_sprzetu, setRodzaj_sprzetu] = useState("");
  const [Typ_sprzetu, setTyp_sprzetu] = useState("");
  const [Do_wybrakowania, setDo_wybrakowania] = useState("");

  const submitPost = () => {
    Axios.post("http://localhost:3002/api/create", {
      Nr_laboranta: Nr_laboranta,
      Ilosc: Ilosc,
      Miejsce: Miejsce,
      Nazwa_sprzetu: Nazwa_sprzetu,
      Nr_inwentarzowy: Nr_inwentarzowy,
      Uzytkownik_sprzetu: Uzytkownik_sprzetu,
      Rodzaj_sprzetu: Rodzaj_sprzetu,
      Typ_sprzetu: Typ_sprzetu,
      Do_wybrakowania: Do_wybrakowania,
    });
  };
  const setData = (
    <tr>
      <th>
        <select name="nrlaboranta">{/* wczytuje z bazy */}</select>
      </th>
      <th>
        <input
          type="ilosc"
          onChange={(e) => {
            setIlosc(e.target.value);
          }}
        />
      </th>
      <th>
        <select name="miejsce">{/* miejsca z bazy danych */}</select>
      </th>
      <th>
        <input
          type="text"
          onChange={(e) => {
            setNazwa_sprzetu(e.target.value);
          }}
        />
      </th>
      <th>
        <input
          type="text"
          onChange={(e) => {
            setNr_inwentarzowy(e.target.value);
          }}
        />
      </th>
      <th>
        <select name="uzytkownik">{/* z bazy danych */}</select>
      </th>
      <th>
        <select name="rodzajsprzetu">
          <option value="elektronika">Elektronika</option>
          <option value="mebel">Mebel</option>
        </select>
      </th>
      <th>
        <select name="typsprzetu">
          <option value="Bezstanowy">Stanowy</option>
          <option value="Bezstanowy">Bezstanowy</option>
        </select>
      </th>
      <th>
        <select name="dowybrakowania">
          <option value="Tak">Volvo</option>
          <option value="Nie">Saab</option>
        </select>
      </th>
    </tr>
  );
  return setData;
}
class List extends React.Component {
  render() {
    const header = (
      <tr>
        <th>Nr laboranta</th>
        <th>Ilość</th>
        <th>Miejsce</th>
        <th>Nazwa sprzętu</th>
        <th>Nr inw.</th>
        <th>Użytkownik</th>
        <th>Rodzaj sprzętu</th>
        <th>Typ sprzętu</th>
        <th>Do wybrakowania</th>
      </tr>
    );
    return (
      <table>
        <thead>
          {header}
          <AddThings />
        </thead>
        <tbody>
          <DBThings />
        </tbody>
        <tfoot>
          
        </tfoot>
      </table>
    );
  }
}

export default List;
