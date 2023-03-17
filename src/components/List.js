import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import GetData from "./GetData.js";
import logo from "../images/amw_logo.png";
import { useReactToPrint } from "react-to-print";
import Pagination from "./Pagination.js";
import "../css/Sidebar.css";
import "../css/List.css";
class List extends React.Component {
    constructor(props) {
        super(props);
        this.TableUI = this.TableUI.bind(this);
    }
    
    TableUI = () => {
        const [data, setdata] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(20);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        let currentData = data.slice(indexOfFirstPost, indexOfLastPost);

        useEffect(() => {
            Axios.get(`http://localhost:3002/api/get/`).then((data) => {
                setdata(data.data);
            });
        }, []);
      
        const [SearchValue, setSearchValue] = useState("");  
        const filteredData = data.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(SearchValue.toLowerCase())
        })
    
        const showDataSearch = () => {
            
            const showSearchData = filteredData.slice(indexOfFirstPost, indexOfLastPost).map((val) => (
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
          
        const lab_id = useRef(null);
        const amount = useRef(null);
        const place = useRef(null);
        const name = useRef(null);
        const inventory_number = useRef(null);
        const user_name = useRef(null);
        const category = useRef(null);
        const state_type = useRef(null);
        const damaged = useRef(null);
        const changeUsername = useRef(null);
        
        const SelectData = (props) => {
            const data = [];
            const setnul = (
                <option value="" >

                </option> 
            )
            const change = (columntoshow) => (
                <option value={columntoshow}>
                    {columntoshow}
                </option>
            )
            GetData(props.url).map((val, idx) => (
                data.push(val[props.dataToShow])
            ))
            return(
                <>
                    <select className="addElementTable" url={props.url} name={props.dataToShow} ref={props.innerRef} columntoshow = {props.columntoshow}>
                    { (props.columntoshow !== undefined || props.columntoshow !== "" )? 
                        change(props.columntoshow)
                    :
                        undefined
                    }
                    {props.url === "places" || props.url === "users" ? setnul : undefined}
                    {
                    data.map((val, idx) => (
                            <option key={idx} value={val} > 
                                {val} 
                            </option>  
                    ))
                    }
                    </select>  
                </>
            );
        }
    
        const tableData = (
            <tr id="insertDataRow">
                <td>
                    <SelectData url="labs" dataToShow="id" innerRef={lab_id}  />
                </td>
                <td>
                    <div className="inp-box">
                        <input className="inp-effect" type="number" placeholder="Ilość..." ref={amount} />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                </td>
                <td>
                    <SelectData url="places" dataToShow="name" innerRef={place} />
                </td>
                <td>
                    <div className="inp-box">
                        <input className="inp-effect" type="text" placeholder="Nazwa sprzętu..." ref={name} />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                </td>
                <td>
                    <div className="inp-box">
                        <input className="inp-effect" type="text" placeholder="Nr inwentarzowy..." ref={inventory_number} />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                </td>
                <td>
                    <SelectData url="users" dataToShow="username" innerRef={user_name} />
                </td>
                <td>
                    <select className="addElementTable" name="rodzajsprzetu" ref={category} >
                        <option value="elektronika">Elektronika</option>
                        <option value="mebel">Mebel</option>
                    </select>
                </td>
                <td>
                    <select className="addElementTable" name="typsprzetu" ref={state_type} >
                        <option value="Stanowy">Stanowy</option>
                        <option value="Bezstanowy">Bezstanowy</option>
                    </select>
                </td>
                <td>
                    <select className="addElementTable" name="dowybrakowania" ref={damaged} >
                        <option value="Tak">Tak</option>
                        <option value="Nie">Nie</option>
                    </select>
                </td>
            </tr>
        );
        const submitUpdatePost = async (id, username) => {

            // await Axios.post("http://localhost:3002/api/update", {
            //     username: changeUsername.current.value,
            //     id: idToChange.current.value
            // }).then(res => {
            //     console.log(res.status);
            //     console.log(res.data);
            // }).catch(err => {
            //     console.log(err);
            // });
            console.log(id+" "+username);
        }
        
        const submitPost = async (e) => {
            e.preventDefault();
            if(amount.current.value === !null && name.current.value === !null && inventory_number.current.value === !null)
            {
                await Axios.post("http://localhost:3002/api/create", {
                    lab_id: lab_id.current.value,
                    amount: amount.current.value,
                    place_id: place.current.value,
                    name: name.current.value,
                    inventory_number: inventory_number.current.value,
                    user_id: user_name.current.value,
                    category_id: category.current.value,
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
        }else{
            alert("Dane które wprowadziłeś są złe sprawdź je i spróbuj ponownie!");
        }
        };
    
        const [isClicked, setIsClicked] = useState(false);
    
        const buttonHandler = () => {
            setIsClicked(current => !current);
        }
    
        const componentPDF = useRef();
        const SetupTableToExport = () => {
            const root = componentPDF.current;
            const copyOfRoot = root.cloneNode(true);
            const rowToRemove = copyOfRoot.querySelector("#insertDataRow");
            rowToRemove.remove();
            
            console.log(copyOfRoot);
            return copyOfRoot;
        }
        
        const [order, setorder] = useState("ASC");
       
        const generatePDF = useReactToPrint({
            content: () => SetupTableToExport(),
            documentTitle: "Inventory raport",
            onAfterPrint: () => console.log("")
        });

        const sortHeader = (column, isNumber=false) =>{
            let sorted = "";
            if(order === "ASC"){ 
                if(isNumber) {
                    sorted = data.sort((a,b) => a[column] > b[column] ? 1 : -1);
                } else {
                    sorted = data.sort((a,b) => a[column].toString().toLowerCase() > b[column].toString().toLowerCase() ? 1 : -1);
                }
                
                setorder("DESC");
            }
            if(order === "DESC"){ 
                if(isNumber) {
                    sorted = data.sort((a,b) => a[column] < b[column] ? 1 : -1);
                } else {
                    sorted = data.sort((a,b) => a[column].toString().toLowerCase() < b[column].toString().toLowerCase() ? 1 : -1);
                }

                setorder("ASC");
            }

            setdata(sorted)
            paginate(1)
        };
        
        const paginate = pageNumber => setCurrentPage(pageNumber);
        
        const showData =
            currentData.map((val) => (
                <tr key={val.id}>
                    <td>{val.lab_id}</td>
                    <td>{val.amount}</td>
                    <td>{val.place}</td>
                    <td>{val.name}</td>
                    <td>{val.inventory_number}</td>
                    <td><SelectData url = "users" dataToShow = "username" innerRef = {changeUsername} columntoshow = {val.user_name}/></td>
                    <td>{val.category}</td>
                    <td>{val.state}</td>
                    <td>{val.damaged}</td>
                    <td><button onClick={() => submitUpdatePost(val.id, changeUsername.current.value)}>zatwierdz zmiany</button> </td>
                </tr>  
            ));
        
        return (
            <>
                <nav>
                    <div className="brand">
                        <div className="brand-logo">
                            <img src={logo} alt="Logo Akademii Marynarki Wojennej" />
                        </div>
                        <h2 className="brand-name">Wykaz ewidencyjny materiałów katedry informatyki</h2>
                    </div>
    
                    <div className="sidebar-trigger" >
                        <button onClick={buttonHandler} >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                </nav>
    
                <section>
                    <div className="table-wrapper">
                        <table className={"fl-table " + (isClicked ? "clicked" : "")} ref={componentPDF}>
                            <thead>
                            <tr>
                                <th onClick={() => sortHeader("lab_id", true)}>Nr laboranta</th>
                                <th onClick={() => sortHeader("amount", true)}>Ilość</th>
                                <th onClick={() => sortHeader("place")}>place</th>
                                <th onClick={() => sortHeader("name")}>Nazwa sprzętu</th>
                                <th onClick={() => sortHeader("inventory_number")}>Nr inw.</th>
                                <th onClick={() => sortHeader("user_name")}>Użytkownik</th>
                                <th onClick={() => sortHeader("category")}>Rodzaj sprzętu</th>
                                <th onClick={() => sortHeader("state")}>Typ sprzętu</th>
                                <th onClick={() => sortHeader("damaged")}>Do wybrakowania</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                {tableData}
                                { SearchValue === "undefined" || SearchValue === ""  ? showData : showDataSearch() }
                            </tbody>
                        </table>
    
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={SearchValue ? filteredData.length : data.length}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
    
                    <aside className={(isClicked ? "sidebarActive":"") + " sidebar"} >
    
                        <button className={isClicked ? "navElementOpen" : "navElementClosed"} onClick={submitPost}>Dodaj</button>
                        <button className={isClicked ? "navElementOpen" : "navElementClosed"} onClick={generatePDF}>Export PDF</button>
                        <h3 className={isClicked ? "navElementOpen" : "navElementClosed"}>Filtr</h3>
                        <input className={isClicked ? "navElementOpen" : "navElementClosed"} id="Search" type="text" value={SearchValue} onChange={(e) => {setSearchValue(e.target.value)}}></input>
                        <button className={isClicked ? "navElementOpen" : "navElementClosed"} onClick={submitUpdatePost}>wprowadz zmiane w wierszy</button>
    
                    </aside>
                </section>
            </>
        );
    }

    render() {
        return (
            <>
                <this.TableUI/>
            </>
            
        );
    }
}

export default List;