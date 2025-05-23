import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './css/CitizenRegister.css'

export default function CitizenRegister() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: ""
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9090/api/citizen/register";
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
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
      <form className="mainDiv" onSubmit={handleSubmit}>
        <div className="container">
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="center">

            <h2>Citizen Registeration</h2>


            <input required placeholder= "Name" type="text" name="name" id="name" onChange={handleChange} value={data.name} />
            <input required placeholder= "Email"  type="email" name="email" id="email" onChange={handleChange} value={data.email} />
            <input required placeholder= "Mobile Number" type="number" name="phoneNumber" id="phoneNumber" onChange={handleChange} value={data.phoneNumber} />
            <input required placeholder= "Password" type="password" name="password" id="password"  onChange={handleChange} value={data.password} />


            <button className="button-13" type="submit">Register</button>
            <button className="button-13" onClick={() => navigate("/citizenLogin")}>Login Here</button>

            <h2>&nbsp;</h2>

          </div>
        </div> </form>
    </>
  )
}
