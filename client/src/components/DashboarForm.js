import { useState, useRef, useEffect } from "react";
import Axios from "axios";
import API_URL from "./API_URL.js";

const DashboardForm = ({sectionName, apiEndpoint}) => {

    const [data, setData] = useState([]);
    const inpVal = useRef();
    const URL = `${API_URL}/api/get/${apiEndpoint}`;

    useEffect(() => {
        Axios.get(URL).then((data) => {
            setData(data.data);
        });
    }, []);

    const addHandler = async (e) => {
        e.preventDefault();

        if(inpVal.current.value !== "") {
            await Axios.post(`${API_URL}/api/create/${apiEndpoint}`, {
            colName: inpVal.current.value
            }).then(res => {
                alert(res.data.message);

                if(res.data.successed) {
                    Axios.get(URL).then((data) => {
                        setData(data.data);
                    });
                    inpVal.current.value = "";
                }
            }).catch(err => {
                alert("Błąd");
            })
        } else {
            alert("Podaj dane");
        }
    }

    const removeHandler = async (e) => {
        e.preventDefault();

        if(inpVal.current.value !== "") {
            await Axios.delete(`${API_URL}/delete/${apiEndpoint}/${inpVal.current.value}`).then(res => {
                alert(res.data.message);

                if(res.data.successed) {
                    Axios.get(URL).then((data) => {
                        setData(data.data);
                    });
                    inpVal.current.value = "";
                }
            }).catch(err => {
                alert("Błąd");
                console.log(err);
            });
        } else {
            alert("Podaj dane");
        }
    }

    const [order, setOrder] = useState("ASC");
    const sortHeader = (column, isNumber=false) => {
        let sorted = "";
        if(order === "ASC"){ 
            if(isNumber) {
                sorted = data.sort((a,b) => a[column] > b[column] ? 1 : -1);
            } else {
                sorted = data.sort((a,b) => (a[column] == null ? "" : a[column].toString().toLowerCase()) > (b[column] == null ? "" : b[column].toString().toLowerCase()) ? 1 : -1);
            }
            
            setOrder("DESC");
        }
        
        if(order === "DESC"){ 
            if(isNumber) {
                sorted = data.sort((a,b) => a[column] < b[column] ? 1 : -1);
            } else {
                sorted = data.sort((a,b) => (a[column] == null ? "" : a[column].toString().toLowerCase()) < (b[column] == null ? "" : b[column].toString().toLowerCase()) ? 1 : -1);
            }

            setOrder("ASC");
        }

        setData(sorted)
    };
    

    return (
        <div className="crud-container">
            <h2>{sectionName}</h2>
            
           <div className="data-management">
                <div className="data-view">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th onClick={() => sortHeader(sectionName)}>{sectionName}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((val, idx) =>
                                <tr key={idx}>
                                    <td>{Object.values(val)[0]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="form-container">
                    <form>
                        <div className="inp-box">
                            <input className="inp-effect" type="text" placeholder={`${sectionName}...`} ref={inpVal} />
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        <div className="action-btns-container">
                            <button className="func-btn" onClick={(e) => {addHandler(e)}} >
                                Dodaj
                                <i className="fa-solid fa-square-plus"></i>
                            </button>
                            <button className="func-btn" onClick={(e) => removeHandler(e)}>
                                Usuń
                                <i className="fa-solid fa-trash"></i>    
                            </button>
                        </div>
                    </form>
                </div>
           </div>
        </div>
    );
}

export default DashboardForm;