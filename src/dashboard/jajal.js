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


function Jajal() {

    const reduceStock = (vaccineId) => {
        const selectedVaccine = vaccines.find(vaccine => vaccine.id == vaccineId);

        if(vaccines.stock > 0){
            const updateVaccine = vaccines.map(vaccine => {
                if(vaccine.id === vaccineId){
                    return{
                        ...vaccine,
                        stock: vaccine.stock -1,
                    }
                }
            else{
                return vaccine;
            }
            });
            setVaccines(updateVaccine);
        }
    }

    const [spots, setSpots] = useState([]);
    const [vaccineStock, setVaccineStock] = useState(0);
    const [selectedHospital, setSelectedHospital] = useState('');
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const token = Cookies.get('token')

    const fetchData = async () => {
        await Api.get('api/v1/auth/spots', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setSpots(response.data.body);
            setVaccineStock(response.data.vaccines.stock);
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
            setSelectedVaccine('');
        })
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleHospitalSelect = (event) => {
        setSelectedHospital(event.target.value);
        fetchData1();
    }
    
    const handleVaksinChange = (event) => {
        setSelectedVaccine(event.target.value);
    }

    const filterVaccines = vaccines.filter(spot => spot.spot_id == selectedHospital);

    console.log(filterVaccines);

    return(
    <React.Fragment>
        <select value={selectedHospital} onChange={handleHospitalSelect}>
            <option>ppp</option>
            {spots.map(spot => (
                <option key={spot.spot_id} value={spot.spot_id}>{spot.spot_id}</option>
            ))}
        </select>        
        <select>
        <option>p</option>
            {filterVaccines.map(spot => (
                <option disabled={vaccineStock == 0} key={spot.id}>{spot.nama_vaksin}</option>
                
            ))}
        </select>
        {/* <button onClick={() => reduceStock(spot.id)}>klik</button> */}
    </React.Fragment>

    )
}
export default Jajal;