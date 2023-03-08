import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import GetData from "./GetData.js";
import SearchData from "./SearchData.js"
import "../css/Sidebar.css";
import "../css/List.css";

const TableUI = () => {
    
    const showData = GetData().map((val) => (
        <tr key={val.id}>
            <td>{val.Nr_laboranta}</td>
            <td>{val.Ilość}</td>
            <td>{val.Miejsce}</td>
            <td>{val.Nazwa_sprzętu}</td>
            <td>{val.Nr_inwentarzowy}</td>
            <td>{val.Uzytkownik_sprzetu}</td>
            <td>{val.Rodzaj_sprzętu}</td>
            <td>{val.Typ_sprzętu}</td>
            <td>{val.Do_wybrakowania}</td>
        </tr>  
    ));
    const showDataSearch = (id) =>{
        const showSearchData = SearchData(id).map((val) => (
            <tr key={val.id}>
                <td>{val.Nr_laboranta}</td>
                <td>{val.Ilość}</td>
                <td>{val.Miejsce}</td>
                <td>{val.Nazwa_sprzętu}</td>
                <td>{val.Nr_inwentarzowy}</td>
                <td>{val.Uzytkownik_sprzetu}</td>
                <td>{val.Rodzaj_sprzętu}</td>
                <td>{val.Typ_sprzętu}</td>
                <td>{val.Do_wybrakowania}</td>
            </tr>
        ));
        return showSearchData;
    }
        
    const [SearchValue, setSearchValue] = useState("");    

    /*  Aby uzyskac dostep do wartosci z zmiennych uzywajacych useRef (te poniezej):

        <nazwa_zmiennej>.current.value

        https://medium.com/@shriharim006/react-how-to-stop-re-rendering-in-react-components-bab286f13d33#fb48
    */
    const Nr_laboranta = useRef(null);
    const Ilosc = useRef(null);
    const Miejsce = useRef(null);
    const Nazwa_sprzetu = useRef(null);
    const Nr_inwentarzowy = useRef(null);
    const Uzytkownik_sprzetu = useRef(null);
    const Rodzaj_sprzetu = useRef(null);
    const Typ_sprzetu = useRef(null);
    const Do_wybrakowania = useRef(null);
    const test = useRef(null);
    
    const GetLabsNrs = () => {
        return (
            <>
                <select className="addElementTable" name="labNr" ref={Nr_laboranta} >
                    { GetData().map((val) => (
                        <option key={val.id} value={val.Nr_laboranta} > 
                            {val.Nr_laboranta} 
                        </option>  
                    ))}
                </select>
            </>
        );
    }

    const GetPlaces = () => {
        return (
            <>
                <select className="addElementTable" name="place" ref={Miejsce} >
                    { GetData().map((val) => (
                        <option key={val.id} value={val.Miejsce}> 
                            {val.Miejsce} 
                        </option>  
                    ))}
                </select>
            </>
        );
    }

    const GetUsers = () => {
        return (
            <>
                <select className="addElementTable" name="user" ref={Uzytkownik_sprzetu} >
                    { GetData().map((val) => (
                        <option key={val.id} value={val.Uzytkownik_sprzetu}> 
                            {val.Uzytkownik_sprzetu} 
                        </option>  
                    ))}
                </select>
            </>
        );
    }

    const tableData = (
        <tr>
            <th>
                <GetLabsNrs />
            </th>
            <th>
                <div className="inp-box">
                    <input className="inp-effect" type="text" placeholder="Ilość..." ref={Ilosc} />
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
            </th>
            <th>
                <GetPlaces />
            </th>
            <th>
                <div className="inp-box">
                    <input className="inp-effect" type="text" placeholder="Nazwa sprzętu..." ref={Nazwa_sprzetu} />
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
            </th>
            <th>
                <div className="inp-box">
                    <input className="inp-effect" type="number" min={1} placeholder="Numer inwentarzowy..." ref={Nr_inwentarzowy} />
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
            </th>
            <th>
                <GetUsers />
            </th>
            <th>
                <select className="addElementTable" name="rodzajsprzetu" ref={Rodzaj_sprzetu} >
                    <option value="elektronika">Elektronika</option>
                    <option value="mebel">Mebel</option>
                </select>
            </th>
            <th>
                <select className="addElementTable" name="typsprzetu" ref={Typ_sprzetu} >
                    <option value="Stanowy">Stanowy</option>
                    <option value="Bezstanowy">Bezstanowy</option>
                </select>
            </th>
            <th>
                <select className="addElementTable" name="dowybrakowania" ref={Do_wybrakowania} >
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie</option>
                </select>
            </th>
        </tr>
    );

    const SubmitPost = () => {
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
        window.location.reload(false);
        console.log("Wysłano");
        };
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

    const [isClicked, setIsClicked] = useState(false);

    const buttonHandler = () => {
        setIsClicked(current => !current);
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
                        {tableData}
                    </thead>
                    
                    {SearchValue == "undefined" || SearchValue == ""  ? <tbody>{showData}</tbody>:<tbody></tbody>}
                    
                    <tfoot>

                    </tfoot>
                </table>
            </div>

            <div className={(isClicked ? "sidebarActive":"") + " sidebar"} >
                <button onClick={buttonHandler} >
                    <i className="fa-solid fa-bars"></i>
                </button>
                <button className={isClicked ? "navElementOpen" : "navElementClosed"}>Dodaj</button>
                <h3 className={isClicked ? "navElementOpen" : "navElementClosed"}>Filtr</h3>
                <input className={isClicked ? "navElementOpen" : "navElementClosed"} id="Search" type="text" value={SearchValue} onChange={(e) => {setSearchValue(e.target.value); showDataSearch(SearchValue)}}></input>
                <a className={isClicked ? "navElementOpen" : "navElementClosed"} href="#">Link 3</a>
            </div>
        </>
    );

}


class List extends React.Component {
    render() {
        return (
            <TableUI />
        );
    }
}

export default List;