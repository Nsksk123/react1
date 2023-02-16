//import hook useState from react
import React, { useEffect, useState } from "react";

//import BASE URL API
import Api from "../api";

import NavBar from "./nav";

//import js cookie
import Cookies from "js-cookie";

//import toats
import toast from "react-hot-toast";

import { useHistory } from "react-router-dom";

function Request() {

    //title page
    document.title = "Add New Category - Administrator Travel GIS";
    const token = Cookies.get("token");

    //state
    const [disease_history, setdisease_history] = useState("");
    const [current_symptoms, setcurrent_symptoms] = useState("");
    const [user_id, setuser_id] = useState("");
    
    const fetchData = async () => {
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
        fetchData();
    });



    //state validation
    const [validation, setValidation] = useState({});

    const history =  useHistory()

    //token

    //function "storeCategory"
    const storeCategory = async (e) => {
        e.preventDefault();

        await Api.post('/api/v1/auth/consultations', {disease_history, current_symptoms, user_id}, {

                //header
                headers: {
                    //header Bearer + Token
                    Authorization: `Bearer ${token}`,
                }

            }).then(() => {

                //show toast
                toast.success("Data success send", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });

                //redirect dashboard page
                history.push("/admin/dashboard");

            })
            .catch((error) => {

                //set state "validation"
                setValidation(error.response.data);
            })

    }

    return (
        <React.Fragment>
        <NavBar></NavBar>
        
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-body">
                                <form onSubmit={storeCategory}>
                                    <div className="mb-3">
                                        <input type="text" id="disease" className="form-control" value={user_id} onChange={(e) => setuser_id(e.target.value)} placeholder="Enter Disease History"/>
                                        
                                        <label className="form-label fw-bold">Disease History</label>
                                        <input type="text" id="disease" className="form-control" value={disease_history} onChange={(e) => setdisease_history(e.target.value)} placeholder="Enter Disease History"/>
                                        {validation.disease_history && (
                                        <div className="alert alert-danger">
                                            {validation.disease_history[0]}
                                        </div>
                                    )}
                                    </div>
                                    {validation.image && (
                                        <div className="alert alert-danger">
                                            {validation.image[0]}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        
                                        <label className="form-label fw-bold">Current Symptoms</label>
                                        <input type="text" id="current" className="form-control" value={current_symptoms} onChange={(e) => setcurrent_symptoms(e.target.value)} placeholder="Enter Current Symptoms"/>
                                    {validation.current_symptoms && (
                                        <div className="alert alert-danger">
                                            {validation.current_symptoms[0]}
                                        </div>
                                    )}
                                    </div>
                                    {validation.name && (
                                        <div className="alert alert-danger">
                                            {validation.name[0]}
                                        </div>
                                    )}
                                    <div>
                                        <button type="submit" id="submit" className="btn btn-md btn-success me-2">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            
        </React.Fragment>
    );
}

export default Request;