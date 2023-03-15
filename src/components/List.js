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
        this.state = {count: props.initialCount};
        this.TableUI = this.TableUI.bind(this);
      }
    
    TableUI = () => {
    
      
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
            <tr id="insertDataRow">
                <td>
                    <SelectData url="labs" dataToShow="id" innerRef={lab_id} />
                </td>
                <td>
                    <div className="inp-box">
                        <input className="inp-effect" type="text" placeholder="Ilość..." ref={amount} />
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
    
        const [isClicked, setIsClicked] = useState(false);
    
        const buttonHandler = () => {
            setIsClicked(current => !current);
        }
    
        useEffect(() => {
            console.log(isClicked);
        }, [isClicked]);
    
    
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
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(20); {/* Ilość wierszy na strone */}
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const cos = GetData().slice(indexOfFirstPost, indexOfLastPost);
        const [data, setdata] = useState([]);
        const generatePDF = useReactToPrint({
            content: () => SetupTableToExport(),
            documentTitle: "Inventory raport",
            onAfterPrint: () => console.log("")
        });
        console.log(data);
        const sortHeader = (column) =>{
            if(order === "ASC"){ 
                const sorted = cos.sort((a,b)=>
                a[column].toString().toLowerCase() > b[column].toString().toLowerCase() ? 1 : -1
                );
                setdata(sorted);
                setorder("DESC");
            }
            if(order === "DESC"){ 
                const sorted = cos.sort((a,b)=>
                a[column].toString().toLowerCase() < b[column].toString().toLowerCase() ? 1 : -1
                );
                setdata(sorted);
                setorder("ASC");
            }
        };
        
        const paginate = pageNumber => setCurrentPage(pageNumber);
        
        const showData =
                data.map((val) => (
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
                                <th onClick={() => sortHeader("lab_id")}>Nr laboranta</th>
                                <th onClick={() => sortHeader("amount")}>Ilość</th>
                                <th onClick={() => sortHeader("place")}>place</th>
                                <th onClick={() => sortHeader("name")}>Nazwa sprzętu</th>
                                <th onClick={() => sortHeader("inventory_number")}>Nr inw.</th>
                                <th onClick={() => sortHeader("user_name")}>Użytkownik</th>
                                <th onClick={() => sortHeader("category")}>Rodzaj sprzętu</th>
                                <th onClick={() => sortHeader("state_type")}>Typ sprzętu</th>
                                <th onClick={() => sortHeader("damaged")}>Do wybrakowania</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                {tableData}
                                { SearchValue == "undefined" || SearchValue == ""  ? showData : showDataSearch(SearchValue) }
                            </tbody>
                        </table>
    
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={GetData().length}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
    
                    <aside className={(isClicked ? "sidebarActive":"") + " sidebar"} >
    
                        <button className={isClicked ? "navElementOpen" : "navElementClosed"} onClick={submitPost}>Dodaj</button>
                        <button className={isClicked ? "navElementOpen" : "navElementClosed"} onClick={generatePDF}>Export PDF</button>
                        <h3 className={isClicked ? "navElementOpen" : "navElementClosed"}>Filtr</h3>
                        <input className={isClicked ? "navElementOpen" : "navElementClosed"} id="Search" type="text" value={SearchValue} onChange={(e) => {setSearchValue(e.target.value)}}></input>
                        <a className={isClicked ? "navElementOpen" : "navElementClosed"} href="#">Link 3</a>
    
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