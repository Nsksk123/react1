import React from "react";

import { useState, useEffect } from "react";
import Login from "../pages/admin/Login";

function Jajal(){
    
    const [id, setId] = useState([]);

    const fetchData = () => {
        fetch('api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"id": "1"})
        })
        .then(response => response.json())
        .then(data => setId(id))
        .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div>
                { id.map(item => (
                    <div key={item.id}>
                        <h2>{item.id}</h2>
                    </div>
                )) }
            </div>
        </React.Fragment>
    )
}

export default Jajal;