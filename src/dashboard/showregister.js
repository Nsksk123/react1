//import react  
import React, { useState, useEffect } from "react";

//import BASE URL API
import Api from "../api";

import { useLocation, Link } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

import Vaccination from "./vaccination";
function ShowRegister() {

	//title page
    document.title = "Categories - Administrator Travel GIS";

    const token = Cookies.get("token");
    const [user_id, setuser_id] = useState("");
    
    const fetchData1 = async () => {
        await Api.get('api/v1/auth/consultations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setuser_id(response.data);
        });
    }

    useEffect(() => {
        fetchData1();
    });


    //state posts
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

    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    return (
        <React.Fragment>
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
                                        <td className="bg-primary text-light rounded-1 text-center">{Cookies.get('status')}</td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td className="text-center">{Cookies.get('date')}</td>
                                    </tr>
                                    <tr>
                                        <td>Spot</td>
                                        <td className="text-center">{Cookies.get('spot')}</td>
                                    </tr>
                                    <tr>
                                        <td>Vaccine</td>
                                        <td className="text-center">{Cookies.get('vaccine')}</td>
                                    </tr>
                                    <tr>
                                        <td>Doctor Name</td>
                                        <td className="text-center">{consultations.doctor}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
<Vaccination></Vaccination>
            </div>
        </React.Fragment>
    )
    
    
    
}

export default ShowRegister