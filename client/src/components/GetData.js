import { useState, useEffect } from "react";
import Axios from "axios";
import API_URL from "./API_URL.js";

const GetData = (endpoint="") => {
    const [postList, setPostList] = useState([]);
    let url = `${API_URL}/api/get/`;

    if(endpoint !== "") {
        url += `${endpoint}`;
    }

    useEffect(() => {
        Axios.get(url).then((data) => {
            setPostList(data.data);
        });
    }, []);

    return postList;
}

export default GetData;