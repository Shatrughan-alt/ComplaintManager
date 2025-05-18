import React from 'react'

export default function Complaint() {
    const handleLogout = () => {
      localStorage.removeItem("citizen_token");
        window.location.reload();
      };
  return (
    <>
        <h1>Post Complaints</h1>
          <button
              onClick={handleLogout}>
              Log Out
          </button>
    </>
  )
}
