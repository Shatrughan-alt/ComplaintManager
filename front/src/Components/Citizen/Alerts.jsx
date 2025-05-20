import React, { useEffect, useState } from 'react';
import './css/Alerts.css';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Replace this with your API call if needed
    setAlerts([
      { id: 1, title: "Curfew Notice", message: "Curfew in effect from 10 PM to 5 AM in your area." },
      { id: 2, title: "Missing Person", message: "A missing person alert has been issued. Check details in the news section." }
    ]);
  }, []);

  return (
    <div className="alerts-container">
      {alerts.map(alert => (
        <div className="alert-card" key={alert.id}>
          <h3>{alert.title}</h3>
          <p>{alert.message}</p>
        </div>
      ))}
    </div>
  );
}