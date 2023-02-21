//import react  
import React, { useState, useEffect } from "react";

import Api from "../api";

//import js cookie
import Cookies from "js-cookie";

import { useHistory, useLocation, useParams } from "react-router-dom";

import "bootstrap/dist/js/bootstrap"

import toast from "react-hot-toast";

import { Link } from "react-router-dom";
function CategoriesIndex() {

	//title page
    document.title = "Categories - Administrator Travel GIS";

    const [status, setstatus] = useState('');

    const [doctor_notes, setdoctor_notes] = useState('');

    const [validation, setValidation] = useState({});

    const history = useHistory();

    const location = useLocation();
    //get ID from parameter URL
    const id = 'categories.id';

    const getUserById = async () => {
    const response = await Api.get(`/api/v1/auth/consultations/${categories.id}`, {

        //header
        headers: {
            //header Bearer + Token
            Authorization: `Bearer ${token}`,
        }
    });

    //get response data
    const data = await response.data.body

    //assign data to state "name"
    setstatus(data.status);
    //assign data to state "email"
    setdoctor_notes(data.doctor_notes);
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

    const formData = new FormData();

    //append data to "formData"
    formData.append('status', status);
    formData.append('note', doctor_notes);
    formData.append('_method', 'PATCH');

    await Api.post(`/api/v1/auth/consultations/${categories.id}`, formData, {

            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }

        }).then(() => {

            //show toast
            toast.success("Data Updated Successfully!", {
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


    //state posts
    const [categories, setCategories] = useState([]);

    //state currentPage
    const [currentPage, setCurrentPage] = useState(1);

    //state perPage
    const [perPage, setPerPage] = useState(0);

    //state total
    const [total, setTotal] = useState(0);

    //token
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

    return(
        <React.Fragment>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Disease History</th>
                                            <th scope="col">Current Symptoms</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {categories.map((category, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{++index + (currentPage-1) * perPage}</td>
                                                <td>{category.name}</td>
                                                <td>{category.disease_history}</td>
                                                <td>{category.current_symptoms}</td>
                                                <td className="text-center">
                                                {/* model */}

                                                
                                                        <div class="dropdown-center">
                                                            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Select Confirm
                                                            </button>
                                                            <ul class="dropdown-menu">
                                                                <li><Link to={`/admin/edit/${category.id}`} id="accept" className="dropdown-item">accept</Link></li>
                                                                <li><Link to={`/admin/edit/${category.id}`} id="reject" className="dropdown-item">reject</Link></li>
                                                            </ul>
                                                        </div>
                                                {/* model */}
                                                </td>
                                            </tr>
                                        ))}
                                        
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

export default CategoriesIndex