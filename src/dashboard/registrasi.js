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
    const [vaccineStock, setVaccineStock] = useState('');
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
            setVaccineStock(vaccines)
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

    const filterVaccines = vaccines.filter(spot => spot.spot == Spot);
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
        .then((response) => {

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
            Cookies.set('spot' ,response.data.data.Spot)
            Cookies.set('vaccine' ,response.data.data.Vaccine)
            Cookies.set('date' ,response.data.data.created_at)
            Cookies.set('status' ,response.data.data.status)
            Cookies.set('status1' ,response.data.data.status)
            
            history.push("/admin/dashboard");
        })
        .catch((error) => {

            //set state "validation"
            setValidation(error.response.data);
        })
    }

    // function handleselectvaccine(vaccineName){
    // vaccines.forEach(function(stock){
    //     console.log(stock.stock)
    //        const newStock = {...vaccineStock};
    //        if(stock.stock > 0){
    //            stock.stock -= 1;
    //            setVaccineStock(newStock);
    //        }
    //        else{
    //            alert("vaccine out of stock")
    //        }
    //     });
        
    // }


    const updateStock = (vaccineId) => {
        axios.post('/api/v1/auth/spots', {vaccine_id: vaccineId})
}

    return(
    <React.Fragment>
    <form onSubmit={handleSubmit}>
        <select value={Spot} onChange={handleHospitalSelect}>
            <option>ppp</option>
            {spots.map(spot => (
                <option key={spot.spot_id} value={spot.name}>{spot.name}</option>
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
                <><option disabled={spot.stock === 0} key={spot.id} value={spot.nama_vaksin}>{spot.nama_vaksin}(Spot: {spot.stock})</option><button type="submit" id="submit" onClick={updateStock(spot.id)}>submit</button></>
            ))}
        </select>
        {validation.Vaccine && (
                                        <div className="alert alert-danger">
                                            {validation.Vaccine[0]}
                                        </div>
                                    )}
        </form>
    </React.Fragment>

    )
}
export default Register;