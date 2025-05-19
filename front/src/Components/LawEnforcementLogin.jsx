import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import {useNavigate} from 'react-router-dom';

export default function LawEnforcementLogin() {

    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const api = "http://localhost:9090/api/lawEnforcement/login";
            const response = await axios.post(api, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            localStorage.setItem("law_token", response.data.token);
            window.location = "/allComplaints";
            console.log("Login successful:", response.data.token);
        } catch (error) {
            console.error("Error logging in:", error.response?.data || error.message);
        }
    };
  return (
    <>
    <h1>Law Enforcement Login</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={data.email}
              />
              <br />
              <label htmlFor="password">Password</label>
              <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={data.password}
              />
              <br />
              <button type="submit">Login</button>
              <button onClick={()=> navigate("/lawEnforcementRegister")} >Register</button>
          </form>
    </>
  )
}
