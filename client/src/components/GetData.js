import { useState, useEffect } from "react";
import Axios from "axios";

const GetData = (endpoint="") => {
    const [postList, setPostList] = useState([]);
    let url = `http://localhost:3002/api/get/`

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