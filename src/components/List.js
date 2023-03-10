import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import GetData from "./GetData.js";
import "../css/Sidebar.css";
import "../css/List.css";

const TableUI = () => {
    
    const showData = GetData().map((val) => (
        <tr key={val.id}>
            <td>{val.lab_id}</td>
            <td>{val.amount}</td>
            <td>{val.place}</td>
            <td>{val.name}</td>
            <td>{val.inventory_number}</td>
            <td>{val.user_name}</td>
            <td>{val.category}</td>
            <td>{val.state}</td>
            <td>{val.damaged}</td>
        </tr>  
    ));
    
    const [SearchValue, setSearchValue] = useState("");  
    const filteredData = GetData().filter((val) => {
        return Object.values(val).join('').toLowerCase().includes(SearchValue.toLowerCase())
    })

    const showDataSearch = (SearchValue) =>{
        
        const showSearchData = filteredData.map((val) => (
            <tr key={val.id}>
                <td>{val.lab_id}</td>
                <td>{val.amount}</td>
                <td>{val.place}</td>
                <td>{val.name}</td>
                <td>{val.inventory_number}</td>
                <td>{val.user_name}</td>
                <td>{val.category}</td>
                <td>{val.state}</td>
                <td>{val.damaged}</td>
            </tr>  
        ));
        return showSearchData;
    }
      

    /*  Aby uzyskac dostep do wartosci z zmiennych uzywajacych useRef (te poniezej):

        <nazwa_zmiennej>.current.value

        https://medium.com/@shriharim006/react-how-to-stop-re-rendering-in-react-components-bab286f13d33#fb48
    */
    const lab_id = useRef(null);
    const amount = useRef(null);
    const place = useRef(null);
    const name = useRef(null);
    const inventory_number = useRef(null);
    const user_name = useRef(null);
    const category = useRef(null);
    const state_type = useRef(null);
    const damaged = useRef(null);
    
    const SelectData = (props) => {
        const data = [];
        const url = props.url;
        const dataName = props.dataToShow;
        {/* To get value from ref:
            
            props.innerRef.current.value
        */}
        GetData(url).map((val, idx) => (
            data.push(val[dataName])
        ))
        return(
            <>
                <select className="addElementTable" url={props.url} name={dataName} ref={props.innerRef}>
                { data.map((val, idx) => (
                        <option key={idx} value={val} > 
                            {val} 
                        </option>  
                ))}
                </select>  
            </>
        );
        
                
         
    }

    const tableData = (
        <tr>
            <th>
                <SelectData url="labs" dataToShow="id" innerRef={lab_id} />
            </th>
            <th>
                <div className="inp-box">
                    <input className="inp-effect" type="text" placeholder="Ilość..." ref={amount} />
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
            </th>
            <th>
                <SelectData url="places" dataToShow="name" innerRef={place} />
            </th>
            <th>
                <div className="inp-box">
                    <input className="inp-effect" type="text" placeholder="Nazwa sprzętu..." ref={name} />
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
            </th>
            <th>
                <div className="inp-box">
                    <input className="inp-effect" type="text" placeholder="Nr inwentarzowy..." ref={inventory_number} />
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
            </th>
            <th>
                <SelectData url="users" dataToShow="username" innerRef={user_name} />
            </th>
            <th>
                <select className="addElementTable" name="rodzajsprzetu" ref={category} >
                    <option value="elektronika">Elektronika</option>
                    <option value="mebel">Mebel</option>
                </select>
            </th>
            <th>
                <select className="addElementTable" name="typsprzetu" ref={state_type} >
                    <option value="Stanowy">Stanowy</option>
                    <option value="Bezstanowy">Bezstanowy</option>
                </select>
            </th>
            <th>
                <select className="addElementTable" name="dowybrakowania" ref={damaged} >
                    <option value="Tak">Tak</option>
                    <option value="Nie">Nie</option>
                </select>
            </th>
        </tr>
    );

    
    const submitPost = async (e) => {
        e.preventDefault();

        await Axios.post("http://localhost:3002/api/create", {
            lab_id: lab_id.current.value,
            amount: amount.current.value,
            place_id: place.current.value, //todo
            name: name.current.value,
            inventory_number: inventory_number.current.value,
            user_id: user_name.current.value, //todo
            category_id: category.current.value, //todo
            state_type: state_type.current.value,
            damaged: damaged.current.value,
        }).then(res => {
            console.log(res.status);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });

        window.location.reload(false);
        console.log("Wysłano");
    };

    const SortingItems = value =>{
        console.log(value);
    }

    const header = (
        <tr>
            <button  onClick={SortingItems("lab_id")}><th>Nr laboranta</th></button>
            <th onClick={SortingItems("amount")}>Ilość</th>
            <th onClick={SortingItems("place")}>place</th>
            <th onClick={SortingItems("name")}>Nazwa sprzętu</th>
            <th onClick={SortingItems("inventory_number")}>Nr inw.</th>
            <th onClick={SortingItems("user_name")}>Użytkownik</th>
            <th onClick={SortingItems("category")}>Rodzaj sprzętu</th>
            <th onClick={SortingItems("state_type")}>Typ sprzętu</th>
            <th onClick={SortingItems("damaged")}>Do wybrakowania</th>
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
                    
                    {SearchValue == "undefined" || SearchValue == ""  ? <tbody>{showData}</tbody>:<tbody>{showDataSearch(SearchValue)}</tbody>}
                    
                    <tfoot>

                    </tfoot> 
                </table>
            </div>

            <div className={(isClicked ? "sidebarActive":"") + " sidebar"} >
                <button onClick={buttonHandler} >
                    <i className="fa-solid fa-bars"></i>
                </button>
                <button className={isClicked ? "navElementOpen" : "navElementClosed"} onClick={submitPost}>Dodaj</button>
                <h3 className={isClicked ? "navElementOpen" : "navElementClosed"}>Filtr</h3>
                <input className={isClicked ? "navElementOpen" : "navElementClosed"} id="Search" type="text" value={SearchValue} onChange={(e) => {setSearchValue(e.target.value)}}></input>
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