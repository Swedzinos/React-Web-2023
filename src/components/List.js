import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import GetData from "./GetData.js";
import logo from "../images/main-logo.png";
import { useReactToPrint } from "react-to-print";
import Dashboard from "./Dashboard.js";
import Pagination from "./Pagination.js";
import "../css/List.css";
class List extends React.Component {
    constructor(props) {
        super(props);
        this.loggedAs = this.props.loggedAs;
        this.TableUI = this.TableUI.bind(this);
    }
    
    TableUI = () => {
        const [data, setdata] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(20);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        let currentData = data.slice(indexOfFirstPost, indexOfLastPost);
        const paginate = pageNumber => setCurrentPage(pageNumber);
        
        useEffect(() => {
            Axios.get(`http://localhost:3002/api/get/`).then((data) => {
                setdata(data.data);
            });
        }, []);
      
        const [SearchValue, setSearchValue] = useState("");
        const [searchAmout, setSearchAmount] = useState("");
        const [searchPlace, setSearchPlace] = useState("");
        const [searchName, setSearchName] = useState("");
        const [searchNrInw, setSearchNrInw] = useState("");
        const [searchUsername, setSearchUsername] = useState("");
        const [searchCategory, setSearchCategory] = useState("");
        const [searchType, setSearchType] = useState("");
        const [searchDamaged, setSearchDamaged] = useState("");
        const [searchLabId, setSearchLabId] = useState("");

        const conditions = [SearchValue, searchLabId];
        
        let filteredData = data.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(SearchValue.toLowerCase())
        })
        console.log(conditions);
        filteredData = filteredData.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchLabId.toLowerCase())
        })
        filteredData = filteredData.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchAmout.toLowerCase())
        })
        filteredData = filteredData.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchPlace.toLowerCase())
        })
        filteredData = filteredData.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchName.toLowerCase())
        })
        filteredData = filteredData.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchNrInw.toLowerCase())
        })
        filteredData = filteredData.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchUsername.toLowerCase())
        })
        filteredData = filteredData.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchCategory.toLowerCase())
        })
        filteredData = filteredData.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchType.toLowerCase())
        })
        filteredData = filteredData.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchDamaged.toLowerCase())
        })

        
        
        
        const deleteHandler = (id) => {
            Axios.delete(`http://localhost:3002/delete/${id}`).then(res => {
                alert(res.data.message);
                Axios.get(`http://localhost:3002/api/get/`).then((data) => {
                setdata(data.data);
                });
            }).catch(err => {
                alert("Błąd");
                console.log(err);
            });
        }
        const SearchColumn = (idk) => {
            

        }
        const showDataSearch = () => {
            const showSearchData = filteredData.slice(indexOfFirstPost, indexOfLastPost).map((val) => {
                return (
                <tr key={val.id} id={val.id}>
                    <td>{val.lab_id}</td>
                    <td className="cell-amount">
                        <InpData value={val.amount} inpType="number"/>
                    </td>
                    <td className="select-cell-place">
                            <SelectData url="places" dataToShow="name" columntoshow={val.place}/>
                    </td>
                    <td className="cell-name">
                        <InpData value={val.name} inpType="text"/>
                    </td>
                    <td className="cell-inventory_number">
                        <InpData value={val.inventory_number} inpType="text"/>
                    </td>
                    <td className="select-cell-user">
                        <SelectData url="users" dataToShow="username" columntoshow={val.user_name}/>
                    </td>
                    <td className="select-cell-category">
                        <SelectData url="categories" dataToShow="category_name" columntoshow={val.category}/>
                    </td>
                    <td className="select-cell-state">
                        <select className="addElementTable" name="rodzajsprzetu">
                            <option value="nie_zmieniono">{val.state}</option>
                            <option value="Stanowy">Stanowy</option>
                            <option value="Bezstanowy">Bezstanowy</option>
                        </select>
                    </td>
                    <td className="select-cell-damaged">
                        <select className="addElementTable" name="dowybrakowania">
                            <option value="nie_zmieniono">{val.damaged}</option>
                            <option value="Tak">Tak</option>
                            <option value="Nie">Nie</option>
                        </select>
                    </td>
                    <td>
                        <button onClick={() => submitUpdatePost(val.id)} className="func-btn">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button> 
                        <button onClick={() => deleteHandler(val.id)} className="func-btn">
                            <i className="fa-solid fa-trash"></i>    
                        </button> 
                    </td>
                </tr>  
            )});
            
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
        
        const SelectData = (props) => {
            
            const data = [];
            const change = (columntoshow) => (
                <option value={columntoshow}>
                    {columntoshow}
                </option>
            );

            GetData(props.url).map((val, idx) => (
                data.push(val[props.dataToShow])
            ));

            return (
                <>
                    <select className="addElementTable" name={props.dataToShow} ref={props.innerRef} columntoshow = {props.columntoshow}>
                        { 
                            (props.columntoshow === undefined || props.columntoshow === null ) ? 
                                null
                                : change(props.columntoshow) 
                        }

                        { data.map((val, idx) => (
                            val !== "" && val !== props.columntoshow ?

                            <option key={idx} value={val}>  
                                {val} 
                            </option>  

                            : null
                        ))}

                        { props.url === "places" || props.url === "users"  || props.url === "categories"? 
                            <option value={null}></option> 
                            : undefined }
                    </select>  
                </>
            );
        }

        const submitPost = async () => {
            if(amount.current.value !== "" && name.current.value !== "" && inventory_number.current.value !== "")
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
                    alert(res.data.message);
                    Axios.get(`http://localhost:3002/api/get/`).then((data) => {
                        setdata(data.data);
                    });
                    amount.current.value = "";
                    name.current.value = "";
                    inventory_number.current.value = "";
                }).catch(err => {
                    alert("Błąd");
                    console.log(err);
                })
            }else{
                alert("Wprowadzono błędne dane!");
            };
        };
    
        const tableData = (
            <tr id="insertDataRow">
                <td>
                    <SelectData url="labs" dataToShow="lab_id" innerRef={lab_id} />
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
                    <SelectData url="categories" dataToShow="category_name" innerRef={category} />
                </td>
                <td>
                    <select className="addElementTable" name="rodzajsprzetu" ref={state_type} >
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
                <td>
                    <button onClick={submitPost} className="func-btn">
                        <i className="fa-solid fa-square-plus"></i>
                    </button>
                </td>
            </tr>
        );

        const submitUpdatePost = async (id) => {
            const row = document.getElementById(id);
            const amountToChange = row.querySelector(".cell-amount input").value;
            const placeToChange = row.querySelector(".select-cell-place select").value;
            const nameToChange = row.querySelector(".cell-name input").value;
            const inventoryNumberToChange = row.querySelector(".cell-inventory_number input").value;
            const usernameToChange = row.querySelector(".select-cell-user select").value;
            const categoryToChange = row.querySelector(".select-cell-category select").value;
            const stateToChange = row.querySelector(".select-cell-state select").value;
            const damagedToChange = row.querySelector(".select-cell-damaged select").value;
            const labidToChange = row.querySelector(".select-cell-labid select").value;

            Axios.post("http://localhost:3002/api/update", {
                id: id,
                labID: labidToChange,
                amount: amountToChange,
                place: placeToChange,
                name: nameToChange,
                inventory_number: inventoryNumberToChange,
                username: usernameToChange,
                category: categoryToChange,
                state: stateToChange,
                damaged: damagedToChange
            }).then(res => {
                if(res.data.warn) {
                    alert(res.data.warn);
                } else {
                    alert(res.data.message);
                    Axios.get(`http://localhost:3002/api/get/`).then((data) => {
                        setdata(data.data);
                        console.log("T");
                    });
                }
            }).catch(err => {
                alert("Błąd!");
                console.log(err);
            });
        }
    
        const componentPDF = useRef();
        const SetupTableToExport = () => {

            const table = document.createElement("table");
            const thead = componentPDF.current.cloneNode(true).querySelector("thead");
            const tbody = document.createElement("tbody");
            table.classList.add("fl-table");
            thead.querySelector("tr th:last-of-type").remove(); // remove action column from thead

            table.appendChild(thead);

            for (let i = 0; i < (SearchValue !== "" ? filteredData.length : data.length); i++) {
                const row = tbody.insertRow();
                let currData = data[i];

                if(SearchValue !== "") {
                    currData = filteredData[i];
                } else {
                    currData = data[i];
                }

                const currRowData = [
                    currData["lab_id"],
                    currData["amount"],
                    currData["place"],
                    currData["name"],
                    currData["inventory_number"],
                    currData["user_name"],
                    currData["category"],
                    currData["amount"],
                    currData["damaged"] 
                ];

                for (const data of currRowData) {   
                    row.insertCell().appendChild(document.createTextNode(data));
                }
            }   

            table.appendChild(tbody);  
            return table;
        }
        
        const [order, setorder] = useState("ASC");
       
        const generatePDF = useReactToPrint({
            content: () => SetupTableToExport(),
            documentTitle: "Inventory raport"
        });

        const sortHeader = (column, isNumber=false) => {
            let sorted = "";
            if(order === "ASC"){ 
                if(isNumber) {
                    sorted = data.sort((a,b) => a[column] > b[column] ? 1 : -1);
                } else {
                    sorted = data.sort((a,b) => (a[column] == null ? "" : a[column].toString().toLowerCase()) > (b[column] == null ? "" : b[column].toString().toLowerCase()) ? 1 : -1);
                }
                
                setorder("DESC");
            }
            if(order === "DESC"){ 
                if(isNumber) {
                    sorted = data.sort((a,b) => a[column] < b[column] ? 1 : -1);
                } else {
                    sorted = data.sort((a,b) => (a[column] == null ? "" : a[column].toString().toLowerCase()) < (b[column] == null ? "" : b[column].toString().toLowerCase()) ? 1 : -1);
                }

                setorder("ASC");
            }

            setdata(sorted)
            paginate(1)
        };
        const InpData = ({value, inpType}) => {
            return (
                <div className="inp-box">
                    <input className="inp-effect" type={inpType} defaultValue={value} min={0} />
                    <span className="focus-border">
                        <i />
                    </span>
                </div>
            );
        }
        const InpSearch = ({value}) => {

            return (
                <div className="inp-box">
                    <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchLabId(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = {value}/>
                    <span className="focus-border">
                        <i />
                    </span>
                </div>

            );
        }
        
        const showData = () =>{
            return(
                currentData.map((val) => (
                    <tr key={val.id} id={val.id}>
                        <td className="select-cell-labid">
                            <SelectData url="labs" dataToShow="lab_id" columntoshow={val.lab_id} />
                        </td>
                        <td className="cell-amount">
                            <InpData value={val.amount} inpType="number"/>
                        </td>
                        <td className="select-cell-place">
                            <SelectData url="places" dataToShow="name" columntoshow={val.place}/>
                        </td>
                        <td className="cell-name">
                            <InpData value={val.name} inpType="text"/>
                        </td>
                        <td className="cell-inventory_number">
                            <InpData value={val.inventory_number} inpType="text"/>
                        </td>
                        <td className="select-cell-user">
                            <SelectData url="users" dataToShow="username" columntoshow={val.user_name}/>
                        </td>
                        <td className="select-cell-category">
                            <SelectData url="categories" dataToShow="category_name" columntoshow={val.category}/>
                        </td>
                        <td className="select-cell-state">
                            <select className="addElementTable" name="rodzajsprzetu">
                                <option value={val.state}>{val.state}</option>
                                <option value="Stanowy">Stanowy</option>
                                <option value="Bezstanowy">Bezstanowy</option>
                            </select>
                        </td>
                        <td className="select-cell-damaged">
                            <select className="addElementTable" name="dowybrakowania">
                                <option value={val.damaged}>{val.damaged}</option>
                                <option value="Tak">Tak</option>
                                <option value="Nie">Nie</option>
                            </select>
                        </td>
                        <td>
                            <button className="func-btn" onClick={() => submitUpdatePost(val.id)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button> 
                            <button className="func-btn" onClick={() => deleteHandler(val.id)}>
                                <i className="fa-solid fa-trash"></i>    
                            </button> 
                        </td>
                    </tr>  
                ))
            );
                
        };

        const [showDashboard, setShowDashboard] = useState(false);

        return (
            <>
                <nav>
                    <div className="brand">
                        <div className="brand-logo">
                            <img src={logo} alt="Logo Akademii Marynarki Wojennej" />
                        </div>
                    </div>

                    { showDashboard === false ?
                        ( <div className="filter-box">
                            <div className="inp-box">
                                <input className="inp-effect" id="Search" type="text" value={SearchValue} onChange={(e) => { setSearchValue(e.target.value) }} onKeyUp={() => paginate(1)} placeholder="Szukaj..." />
                                <span className="focus-border">
                                    <i></i>
                                </span>
                            </div>
                        </div> )
                        
                        : null
                }

                    <div className="rightside-panel" >
                        <h2>
                            <i className="fa-solid fa-user"></i> 
                            <span>
                                {this.loggedAs}
                            </span>
                        </h2>
                    </div>
                </nav>
                <section id="SearchColumns">
                    <div className="inp-column-box inp-search-labs">
                        <div className="inp-box">
                            <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchLabId(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = "Szukaj..."/>
                            <span className="focus-border">
                                <i />
                            </span>
                        </div>
                    </div>
                    <div className="inp-column-box inp-search-lab">
                        <div className="inp-box">
                            <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchAmount(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = "Szukaj..."/>
                            <span className="focus-border">
                                <i />
                            </span>
                        </div>
                    </div>
                    <div className="inp-column-box inp-search-lab"> 
                        <div className="inp-box">
                            <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchPlace(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = "Szukaj..."/>
                            <span className="focus-border">
                                <i />
                            </span>
                        </div>
                    </div>
                    <div className="inp-column-box inp-search-lab">
                        <div className="inp-box">
                            <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchName(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = "Szukaj..."/>
                            <span className="focus-border">
                                <i />
                            </span>
                        </div>
                    </div>
                    <div className="inp-column-box inp-search-lab">
                        <div className="inp-box">
                            <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchNrInw(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = "Szukaj..."/>
                            <span className="focus-border">
                                <i />
                            </span>
                        </div>
                    </div>
                    <div className="inp-column-box inp-search-lab">
                        <div className="inp-box">
                            <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchUsername(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = "Szukaj..."/>
                            <span className="focus-border">
                                <i />
                            </span>
                        </div>
                    </div>
                    <div className="inp-column-box inp-search-lab">
                        <div className="inp-box">
                            <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchCategory(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = "Szukaj..."/>
                            <span className="focus-border">
                                <i />
                            </span>
                        </div>
                    </div>
                    <div className="inp-column-box inp-search-lab">
                        <div className="inp-box">
                            <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchType(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = "Szukaj..."/>
                            <span className="focus-border">
                                <i />
                            </span>
                        </div>
                    </div>
                    <div className="inp-column-box inp-search-lab">
                        <div className="inp-box">
                            <input className="inp-effect" type="text" min={0} onChange={(e) => { setSearchDamaged(e.target.value)}} onKeyUp={() => paginate(1)} placeholder = "Szukaj..."/>
                            <span className="focus-border">
                                <i />
                            </span>
                        </div>
                    </div>
                </section>
                { showDashboard === false ? // change to false after complete development
                    ( <section>
                        <div className="table-wrapper">
                            <table className="fl-table" ref={componentPDF}>
                                <thead>
                                    <tr>
                                        <th onClick={() => sortHeader("lab_id", true)}>Nr. laboranta</th>
                                        <th onClick={() => sortHeader("amount", true)}>Ilość</th>
                                        <th onClick={() => sortHeader("place")}>Miejsce</th>
                                        <th onClick={() => sortHeader("name")}>Nazwa sprzętu</th>
                                        <th onClick={() => sortHeader("inventory_number")}>Nr. inw.</th>
                                        <th onClick={() => sortHeader("user_name")}>Użytkownik</th>
                                        <th onClick={() => sortHeader("category")}>Rodzaj sprzętu</th>
                                        <th onClick={() => sortHeader("state")}>Typ sprzętu</th>
                                        <th onClick={() => sortHeader("damaged")}>Do wybrakowania</th>
                                        <th>Akcja</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {tableData}
                                    { (SearchValue === undefined || SearchValue === "")  ? showData() : showDataSearch() }
                                </tbody>
                            </table>
        
                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={SearchValue ? filteredData.length : data.length}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                        </div>
                    </section> ) 

                    : <Dashboard />
                }
                

                <footer>
                    <div className="brand-logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="info">
                        <div className="export">
                            { showDashboard === false ?
                                 (<>
                                    <button onClick={generatePDF} className="func-btn">
                                        Exportuj do PDF
                                        <i className="fa-solid fa-download"></i>
                                    </button>
                                    <button onClick={() => setShowDashboard(true)} className="func-btn">
                                        Panel zarządzania
                                        <i className="fa-solid fa-hammer"></i>
                                    </button>    
                                </>)

                                : (<> 
                                    <button onClick={() => setShowDashboard(false)} className="func-btn">
                                        Widok danych
                                        <i className="fa-solid fa-table"></i>
                                    </button> 
                                </>)
                            }
                        </div>
                        <div>
                            <p>
                                Aplikacja inwentarzowa stworzona przez
                                <a href="https://github.com/Wierzba13" target="_blank" rel="noreferrer" >Raula Wierzbińskiego</a> oraz 
                                <a href="https://github.com/Swedzinos" target="_blank" rel="noreferrer" >Kamila Banka</a> 
                                na potrzeby praktyki zawodowej odbytej w Akademii Marynarki Wojennej - 2023r. 
                            </p>
                        </div>
                    </div>
                </footer>
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