import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/CitizenNavbar.css'
import { ToastContainer, toast } from 'react-toastify';

export default function CitizenLogin() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9090/api/citizen/login", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      localStorage.setItem("citizen_token", response.data.token);
      localStorage.setItem("UUID", response.data.UUID);
      
        toast.success("Login Successful", {
                              position: "bottom-right",
                              autoClose: 1000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: false,
                              progress: undefined,
                              theme: "dark",
                          });

      setTimeout(()=> window.location = "/citizenDashboard",1000);




    } catch (error) {
          toast.error("Email or Password is invalid", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "dark",
                    });
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
<>
     <form className = "mainDiv" onSubmit={handleSubmit}>
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
    
        <h2>The Citizen Portal</h2>
        

        <input type="email" placeholder="Email"
          name="email"
          id="email"
          onChange={handleChange}
          value={data.email} />
        <input type="password" placeholder="Password" name="password"
          id="password"
          onChange={handleChange}
          value={data.password}
        />
       
        <button className="button-13" type="submit">Login</button>
        <button className="button-13" onClick={()=> navigate("/citizenRegister")}>Register</button>

        <h2>&nbsp;</h2>

      </div>
    </div> </form>

    <ToastContainer/>

                </>
  );
}