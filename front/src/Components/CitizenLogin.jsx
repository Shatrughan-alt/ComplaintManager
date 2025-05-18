import React, { useState } from 'react';
import axios from 'axios';

export default function CitizenLogin() {
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
      const api = "http://localhost:9090/api/citizen/login";
      const response = await axios.post(api, data, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem("citizen_token", response.data.token);
      window.location = "/complaint"; 
      console.log("Login successful:", response.data.token);
      // Optionally store token or navigate to dashboard
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <>
    <h1>Citizen Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
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
      </form>
    </>
  );
}
