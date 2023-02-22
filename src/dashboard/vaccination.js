import React from "react";

import { useState, useEffect } from "react";

import Api from "../api";

import { Link, useLocation } from "react-router-dom";

import Cookies from "js-cookie";

function Vaccination(){

    const token = Cookies.get("token");
    const [user_id, setuser_id] = useState("");
    
    const fetchData1 = async () => {
        await Api.get('api/v1/auth/consultations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setuser_id(response.data.body);
        });
    }

    useEffect(() => {
        fetchData1();
    });

    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");
   if(user_id.status == 'pending' || user_id.status == 'reject'){
    return(
        <React.Fragment>
            <div className="row mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>First Vaccination</h5>        
                        </div>
                        <div className="card-body">
                        <p className="alert alert-warning">Your consultation must be approved by doctor to get the vaccine</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
   }
   return(
    <React.Fragment>
        <div className="row mt-5">
            <div className="col-4">
                <div className="card">
                    <div className="card-header">
                        <h5>First Vaccination</h5>
                    </div>
                    <div className="card-body">
                    <Link className={splitLocation[2] === "registrasi" ? "active" : "text-decoration-none"} to="/admin/register">+Register Vaccination</Link>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
)
}

export default Vaccination;