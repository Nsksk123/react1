//import react  
import Cookies from "js-cookie";

import { useState, useEffect } from "react";

import React from "react";

import Consul from "./Consul";

import NavBar from "./nav";

import Api from "../api";

import Success from "./succees";

import { useLocation, Link } from "react-router-dom";



function Dashboard() {

	//title page
    document.title = "Dashboard - Administrator Travel GIS";

    const status = Cookies.get('role');
    const token = Cookies.get("token");

    const [user_id, setuser_id] = useState("");
    
    const fetchData1 = async () => {
        await Api.get('api/v1/auth/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setuser_id(response.data.id_card);
        });
    }

    useEffect(() => {
        fetchData1();
    });


    const [consultations, setConsultations] = useState([]);
    const [showconsultations, setShowConsultations] = useState([]);

    //token

    //function "fetchData"
    const fetchData = async () => {

        //fetching data from Rest API
        await Api.get('/api/v1/auth/consultations', {
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            //set data response to state "categories"
            setConsultations(response.data.body);
        });
        await Api.get('/api/v1/auth/showconsultations', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            .then(response => {setShowConsultations(response.data.body);
                
            })
        })
    };

    //hook
    useEffect(() => {
        //call function "fetchData"
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    if(status == 1){
        return (
            <React.Fragment>
            <NavBar></NavBar>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col">
                            <h3>Consultation</h3>
                        </div>
                    </div>
                    <div className="row">
                        <Consul></Consul>
                    </div>
                </div>
            </React.Fragment>
        )
}
if(status == 0){
    if(consultations == null){
        return(
            <React.Fragment>
                    <NavBar></NavBar>
                    <div className="row">
                            <div className="col-12">
                                <div className="card border-0 rounded shadow-sm border-top-success">
                                    <div className="card-header">
                                        <span className="font-weight-bold"><i className="fa fa-tachometer-alt"></i> user</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container mt-5">
                    <div className="row">
                        <div className="col">
                            <h3>My Consultation</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Consultation</h5>
                                </div>
                                <div className="card-body">
                                <Link className={splitLocation[2] === "consultations" ? "active" : "text-decoration-none"} to="/admin/consultations">+Request Consultation</Link>
                                </div>
                            </div>
                        </div>
                    </div>
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
        </div>
                </React.Fragment>
            )
        }
        if(consultations.user_id == user_id){
        return(
            <React.Fragment>
                <NavBar></NavBar>
                <div className="row">
                        <div className="col-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header">
                                    <span className="font-weight-bold"><i className="fa fa-tachometer-alt"></i> user</span>
                                </div>
                            </div>
                        </div>
                    </div>
                <Success></Success>
            </React.Fragment>
        )
    }
}



}

export default Dashboard