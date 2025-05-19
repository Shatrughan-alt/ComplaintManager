import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import './css/CitizenRegister.css'

export default function CitizenRegister() {

  const navigate = useNavigate();

    const [data,setData]=useState({
        name:"",
        email:"",
        phoneNumber:"",
        password:""
    })

    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const url="http://localhost:9090/api/citizen/register";
            const response=await axios.post(url,data,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
        console.log("Registration successful:", response.data); 
          window.location = "/citizenLogin";
        } catch (error) {
            console.error("Error logging in:", error.response?.data || error.message);
        }
    }
  return (
    <>
    <div className='citizen-register-wrapper'>
    <h1>Citizen Registration</h1>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">Name</label>
              <input type="text" name="name" id="name" onChange={handleChange} value={data.name} />
      
            <label htmlFor="">Email</label>
              <input type="email" name="email" id="email" onChange={handleChange} value={data.email} />
    
            <label htmlFor="">PhoneNumber</label>
              <input type="number" name="phoneNumber" id="phoneNumber" onChange={handleChange} value={data.phoneNumber} />
          
            <label htmlFor="">Password</label>
              <input type="password" name="password" id="password" onChange={handleChange} value={data.password} />

              <button type="submit">Register</button>
              <button onClick={()=> navigate("/citizenLogin") }>Already Register? Login Here</button>
        </form>
        </div>
    </>
  )
}
