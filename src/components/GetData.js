import React, { useState, useEffect } from "react";
import Axios from "axios";

const GetData = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/api/get").then((data) => {
            setPostList(data.data);
        });
    }, []);

    return postList;
}

export default GetData;