import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import GetData from "./GetData.js";
import logo from "../images/main-logo.png";
import { useReactToPrint } from "react-to-print";
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
        const filteredData = data.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(SearchValue.toLowerCase())
        })
        const update =()=>{
            Axios.get(`http://localhost:3002/api/get/`).then((data) => {
                setdata(data.data);
            });
        }
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
        
        const showDataSearch = () => {
            const showSearchData = filteredData.slice(indexOfFirstPost, indexOfLastPost).map((val) => {
                return (
                <tr key={val.id} id={val.id}>
                    <td>{val.lab_id}</td>
                    <td>{val.amount}</td>
                    <td className="select-cell-place">
                            <SelectData url="places" dataToShow="name" columntoshow={val.place}/>
                    </td>
                    <td>{val.name}</td>
                    <td>{val.inventory_number}</td>
                    <td className="select-cell-user">
                        <SelectData url="users" dataToShow="username" columntoshow={val.user_name}/>
                    </td>
                    <td className="select-cell-category">
                            <SelectData url="categories" dataToShow="category_name" columntoshow={val.category}/>
                    </td>
                    <td>{val.state}</td>
                    <td>{val.damaged}</td>
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
                            val != "" && val != props.columntoshow ?

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
            if(amount.current.value != '' && name.current.value != '' && inventory_number.current.value != '')
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
                    <SelectData url="labs" dataToShow="id" innerRef={lab_id} />
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
            // let username,place,category = "";
            const row = document.getElementById(id);
            let usernameToChange = row.querySelector(".select-cell-user select").value != "" ? row.querySelector(".select-cell-user select").value : null;
            let placeToChange = row.querySelector(".select-cell-place select").value;
            let categoryToChange = row.querySelector(".select-cell-category select").value;

            Axios.post("http://localhost:3002/api/update", {
                username: usernameToChange,
                place: placeToChange,
                category: categoryToChange,
                id: id
            }).then(res => {
                alert(res.data.message);
                Axios.get(`http://localhost:3002/api/get/`).then((data) => {
                    setdata(data.data);
                });
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

            for (let i = 0; i < data.length; i++) {
                const row = tbody.insertRow();
                const currData = data[i];

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
        
        const showData = () =>{
            return(
                currentData.map((val) => (
                    <tr key={val.id} id={val.id}>
                        <td>{val.lab_id}</td>
                        <td>{val.amount}</td>
                        <td className="select-cell-place">
                            <SelectData url="places" dataToShow="name" columntoshow={val.place}/>
                        </td>
                        <td>{val.name}</td>
                        <td>{val.inventory_number}</td>
                        <td className="select-cell-user">
                            <SelectData url="users" dataToShow="username" columntoshow={val.user_name}/>
                        </td>
                        <td className="select-cell-category">
                            <SelectData url="categories" dataToShow="category_name" columntoshow={val.category}/>
                        </td>
                        <td>{val.state}</td>
                        <td>{val.damaged}</td>
                        <td>
                            <button onClick={() => submitUpdatePost(val.id)} className="func-btn">
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button> 
                            <button onClick={() => deleteHandler(val.id)} className="func-btn">
                                <i className="fa-solid fa-trash"></i>    
                            </button> 
                        </td>
                    </tr>  
                ))
            );
                
        };
        
        return (
            <>
                <nav>
                    <div className="brand">
                        <div className="brand-logo">
                            <img src={logo} alt="Logo Akademii Marynarki Wojennej" />
                        </div>
                    </div>

                    <div className="filter-box">
                        <div className="inp-box">
                            <input className="inp-effect" id="Search" type="text" value={SearchValue} onChange={(e) => { setSearchValue(e.target.value) }} onKeyUp={() => paginate(1)} placeholder="Szukaj..." />
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                    </div>

                    <div className="rightside-panel" >
                        <h2>
                            <i className="fa-solid fa-user"></i> 
                            <span>
                                {this.loggedAs}
                            </span>
                        </h2>
                    </div>
                </nav>
            
                <section>
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
                                { SearchValue === undefined || SearchValue === ""  ? showData() : showDataSearch() }
                            </tbody>
                        </table>
    
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={SearchValue ? filteredData.length : data.length}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
                </section>

                <footer>
                    <div className="brand-logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="info">
                        <div className="export">
                            <button onClick={generatePDF} className="func-btn">
                                Exportuj do PDF
                                <i className="fa-solid fa-download"></i>
                            </button>
                            <button className="func-btn">
                                Panel zarządzania
                                <i className="fa-solid fa-hammer"></i>
                            </button>
                        </div>
                        <div>
                            <p>
                                Aplikacja inwentarzowa stworzona przez
                                <a href="https://github.com/Wierzba13" target="_blank">Raula Wierzbińskiego</a> oraz 
                                <a href="https://github.com/Swedzinos" target="_blank">Kamila Banka</a> 
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