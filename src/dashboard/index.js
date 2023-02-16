//import react  
import Cookies from "js-cookie";

import { useState, useEffect } from "react";

import React from "react";

import Consul from "./Consul";

import NavBar from "./nav";

import Api from "../api";


function Dashboard() {

	//title page
    document.title = "Dashboard - Administrator Travel GIS";

    const status = Cookies.get('role');
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


    const [consultations, setConsultations] = useState([]);

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
    };

    //hook
    useEffect(() => {
        //call function "fetchData"
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(status == 1){
        return (
            <React.Fragment>
            <NavBar></NavBar>
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
                                    <table className="table table-striped">
                                        <tbody>
                                        <tr>
                                            <td>Status</td>
                                            <td className="bg-primary text-light rounded-1 text-center">{user_id.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Disease History</td>
                                            <td className="text-center">{consultations.disease_history}</td>
                                        </tr>
                                        <tr>
                                            <td>Current Symptoms</td>
                                            <td className="text-center">{consultations.current_symptoms}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Name</td>
                                            <td className="text-center">{consultations.doctor}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Note</td>
                                            <td className="text-center">{consultations.doctor_note}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
}
if(status == 0){
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
            <Consul></Consul>
        </React.Fragment>
    )
}



}

export default Dashboard