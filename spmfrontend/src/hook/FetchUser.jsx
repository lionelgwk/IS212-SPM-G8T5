import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchUser = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5050/staff/" + localStorage.getItem("staffId"))
            .then((response) => {
                setUser(response.data.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return { user };
}

export default FetchUser;

