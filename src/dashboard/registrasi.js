import React from "react";

import { useState, useEffect } from "react";

//import BASE URL API
import Api from "../api";

//import hook history dari react router dom
import { useHistory, useParams } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import toats
import toast from "react-hot-toast";
import axios from "axios";


function Register() {

    const [spots, setSpots] = useState([]);
    const [Spot, setSpot] = useState('');
    const [vaccines, setVaccines] = useState([]);
    const [Vaccine, setVaccine] = useState('');
    const token = Cookies.get('token')

    const fetchData = async () => {
        await Api.get('api/v1/auth/spots', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setSpots(response.data.body);
        })
    }
    
    const fetchData1 = async (event) => {
        await Api.get(`api/v1/auth/spots`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            const vaccines = response.data.vaccines;
            setVaccines(vaccines);
            setVaccine('');
        })
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleHospitalSelect = (event) => {
        setSpot(event.target.value);
        fetchData1();
    }
    
    const handleVaksinChange = (event) => {
        setVaccine(event.target.value);
    }

    const filterVaccines = vaccines.filter(spot => spot.spot_id == Spot);
    const history =  useHistory()
    const [validation, setValidation] = useState({});

    const handleSubmit = async (event) =>  {
        event.preventDefault();

        await Api.post('api/v1/auth/vaccinations', {Spot, Vaccine}, {

            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }

        })
        .then(() => {

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

    return(
    <React.Fragment>
    <form onSubmit={handleSubmit}>
        <select value={Spot} onChange={handleHospitalSelect}>
            <option>ppp</option>
            {spots.map(spot => (
                <option key={spot.spot_id} value={spot.spot_id}>{spot.name}</option>
            ))}
        </select>    
        {validation.Spot && (
                                        <div className="alert alert-danger">
                                            {validation.Spot[0]}
                                        </div>
                                    )}    
        <select value={Vaccine} onChange={handleVaksinChange}>
        <option>p</option>
            {filterVaccines.map(spot => (
                <option key={spot.id} value={spot.nama_vaksin}>{spot.nama_vaksin}</option>
            ))}
        </select>
        {validation.Vaccine && (
                                        <div className="alert alert-danger">
                                            {validation.Vaccine[0]}
                                        </div>
                                    )}
        <button type="submit">submit</button>
        </form>
    </React.Fragment>

    )
}
export default Register;