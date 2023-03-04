import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../css/Sidebar.css";
import "../css/List.css";


const DBThings = () => {
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
const AddThings = () => {
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
                <select name="nrlaboranta" onChange={(e) => { setNr_laboranta(e.target.value); }}>
                    {/* wczytuje z bazy */}
                    <option value="2255">2255</option>
                    <option value="145">145</option>
                    <option value="1658">1658</option>
                </select>
            </th>
            <th>
                <input type="ilosc" onChange={(e) => { setIlosc(e.target.value); }} />
            </th>
            <th>
                <select name="miejsce" onChange={(e) => { setMiejsce(e.target.value); }}>
                    {/* miejsca ma byc z bazy danych*/}
                    <option value="Sala 215">Sala 215</option>
                    <option value="Sala 105">Sala 105</option>
                    <option value="Sala 50">Sala 50</option>
                    <option value="Hala">Hala</option>
                </select>
            </th>
            <th>
                <input type="text" onChange={(e) => { setNazwa_sprzetu(e.target.value); }} />
            </th>
            <th>
                <input type="text" onChange={(e) => { setNr_inwentarzowy(e.target.value); }}
                />
            </th>
            <th>
                <select name="uzytkownik" onChange={(e) => { setUzytkownik_sprzetu(e.target.value); }}>
                    {/*ma byc z bazy danych */}
                    <option value="Kamil Bank">Kamil Bank</option>
                    <option value="Michał Psikuta">Michał Psikuta</option>
                    <option value="Raul Wierzbiński">Raul Wierzbiński</option>
                </select>
            </th>
            <th>
                <select name="rodzajsprzetu" onChange={(e) => { setRodzaj_sprzetu(e.target.value); }}>
                    <option value="elektronika">Elektronika</option>
                    <option value="mebel">Mebel</option>
                </select>
            </th>
            <th>
                <select name="typsprzetu" onChange={(e) => { setTyp_sprzetu(e.target.value); }}>
                    <option value="Bezstanowy">Stanowy</option>
                    <option value="Bezstanowy">Bezstanowy</option>
                </select>
            </th>
            <th>
                <select name="dowybrakowania" onChange={(e) => { Do_wybrakowania(e.target.value); }}>
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie</option>
                </select>
            </th>
        </tr>
    );
    return setData;
}
const Open = (props) => {
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


    const [isClicked, serIsClicked] = useState(false)
    const buttonHandler = () => {
        serIsClicked(current => !current)
    }
    useEffect(() => {
        console.log(isClicked);
    }, [isClicked]);
    return (
        <>
            <div>
                <table className={"inventory_table scroll_style " + (isClicked ? "clicked" : "")}>
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
            </div>

            <div id={isClicked ? "sidebar-clicked" : "sidebar"} >
                <button onClick={buttonHandler}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <a href="#" id={isClicked ? "navElementOpen" : "navElementClosed"}>Link 1</a>
                <a href="#" id={isClicked ? "navElementOpen" : "navElementClosed"}>Link 2</a>
                <a href="#" id={isClicked ? "navElementOpen" : "navElementClosed"}>Link 3</a>
            </div>
        </>
    );

}


class List extends React.Component {
    render() {
        return (
            <Open />
        );
    }
}

export default List;