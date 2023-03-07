import React, { useState, useEffect } from "react";
import Axios from "axios";

const SearchData = (id) => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3002/api/get/${id}`).then((data) => {
            setPostList(data.data);
        });
    }, []);

    return postList;
}

export default SearchData;