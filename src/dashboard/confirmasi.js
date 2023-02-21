import React from "react";

import { useState, useEffect } from "react";

//import BASE URL API
import Api from "../api";

//import hook history dari react router dom
import { useHistory, useLocation, useParams } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import toats
import toast from "react-hot-toast";

function Confirmasi() {

    //title page
    document.title = "Edit User - Administrator Travel GIS";

    //state
    const [doctor_notes, setdoctor_notes] = useState("");
    const [status, setstatus] = useState("");

    //state validation
    const [validation, setValidation] = useState({});

    //token
    const token = Cookies.get("token");

    //history
    const history = useHistory();

    const location = useLocation()
    //get ID from parameter URL
    const id = location.pathname.split('/').pop();

    const [categories, setCategories] = useState([]);

    //state currentPage
    const [currentPage, setCurrentPage] = useState(1);

    //state perPage
    const [perPage, setPerPage] = useState(0);

    //state total
    const [total, setTotal] = useState(0);

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

    //function "fetchData"
    const fetchData = async () => {

        //fetching data from Rest API
        await Api.get('/api/v1/auth/showconsultations', {
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            //set data response to state "categories"
            setCategories(response.data.data.data);

            //set currentPage
            setCurrentPage(response.data.data.current_page);

            //set perPage
            setPerPage(response.data.data.per_page);

            //total
            setTotal(response.data.data.total);
        });
    };

    //hook
    useEffect(() => {
        //call function "fetchData"
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    //function "getUserById"
    const getUserById = async () => {

        //get data from server
        const response = await Api.get(`/api/v1/auth/consultations/${id}`, {

            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        });

        //get response data
        const data = await response.data.body

        //assign data to state "name"
        setdoctor_notes(data.note);
        //assign data to state "email"
        setstatus(data.status);
    };

    //hook useEffect
    useEffect(() => {

        //panggil function "getUserById"
        getUserById();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //function "updateUser"
    const updateUser = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('status', status);
        formData.append('doctor_notes', doctor_notes);
        formData.append('_method', 'PATCH');

        await Api.post(`/api/v1/auth/consultations/${id}`, formData, {

                //header
                headers: {
                    //header Bearer + Token
                    Authorization: `Bearer ${token}`,
                }

            }).then(() => {

                //show toast
                toast.success("Data Updated Successfully!", {
                    duration: 4000,
                    position: "top-center",
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
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-users"></i> EDIT USER</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateUser}>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Doctor Note</label>
                                                <input type="text" className="form-control" value={doctor_notes} onChange={(e) => setdoctor_notes(e.target.value)} placeholder="Enter Full Name"/>
                                            </div>
                                            {validation.doctor_notes && (
                                                <div className="alert alert-danger">
                                                    {validation.doctor_notes[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Confirm</label>
                                                <input type="text" className="form-control" value={'accept'} onChange={(e) => setstatus(e.target.value)} placeholder="Enter Email Address"/>
                                            </div>
                                            {validation.status && (
                                                <div className="alert alert-danger">
                                                    {validation.status[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i> UPDATE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
              </div>
        </React.Fragment>
    );
}
export default Confirmasi;