import React, { useState } from 'react'
import axios from 'axios';

export default function LawEnforcementRegister() {
    const [data,setData]=useState({
        policeStationName:"",
        policeStationEmail:"",
        policeStationContactNo:"",
        sho:"",
        address:"",
        password:""
    });

    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        });
        }

        const handleSubmit=async(e)=>{
            e.preventDefault();
            try {
                const url="http://localhost:9090/api/lawEnforcement/register";
                const response=await axios.post(url,data,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log("Registration successful:", response.data);
                window.location = "/lawEnforcementLogin"; 
            } catch (error) {
                console.error("Error logging in:", error.response?.data || error.message);
            }
        }
  return (
    <>
    <h1>Law Enforcement Registration</h1>
    <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Police Station Name</label>
              <input type="text" name="policeStationName" id="policeStationName" onChange={handleChange} value={data.policeStationName} />
        <br />
        <label htmlFor="">Police Station Email</label>
              <input type="email" name="policeStationEmail" id="policeStationEmail" onChange={handleChange} value={data.policeStationEmail} />
        <br />
        <label htmlFor="">Police Station PhoneNumber</label>
              <input type="number" name="policeStationContactNo" id="policeStationContactNo" onChange={handleChange} value={data.policeStationContactNo} />
        <br />
              <label htmlFor="">Police Station SHO</label>
              <input type="text" name="sho" id="sho" onChange={handleChange} value={data.sho} />
              <br />
              <label htmlFor="">Address</label>
              <input type="text" name="address" id="address" onChange={handleChange} value={data.address} />
              <br />
        <label htmlFor="">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} value={data.password} />
        <br />

    <button type="submit">Register</button>
          </form>
    </>
  )
}


// "policeStationName": "2",
//     "policeStationEmail": "2",
//         "policeStationContactNo": 2,
//             "sho": "2",
//                 "address": "2",
//                     "password": "2"