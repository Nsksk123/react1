//import hook useState from react
import React, { useState } from "react";

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

    //state
    const [disease_history, setdisease_history] = useState("");
    const [current_symptoms, setcurrent_symptoms] = useState("");

    //state validation
    const [validation, setValidation] = useState({});

    const history =  useHistory()

    //token
    const token = Cookies.get("token");

    //function "storeCategory"
    const storeCategory = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('disease_history', disease_history);
        formData.append('current_symptoms', current_symptoms);

        await Api.post('/api/v1/auth/consultations', formData, {

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
                                        <label className="form-label fw-bold">Disease History</label>
                                        <input type="text" className="form-control" value={disease_history} onChange={(e) => setdisease_history(e.target.value)} placeholder="Enter Disease History"/>
                                    </div>
                                    {validation.image && (
                                        <div className="alert alert-danger">
                                            {validation.image[0]}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Current Symptoms</label>
                                        <input type="text" className="form-control" value={current_symptoms} onChange={(e) => setcurrent_symptoms(e.target.value)} placeholder="Enter Current Symptoms"/>
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