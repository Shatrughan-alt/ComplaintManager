import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CitizenLogin from './Components/Citizen/CitizenLogin';
import CitizenRegister from './Components/Citizen/CitizenRegister';
import './App.css';

import CitizenDashboard from './Components/Citizen/CitizenDashboard'
import LawEnforcementLogin from './Components/LawEnforcement/LawEnforcementLogin';
import LawEnforcementRegister from './Components/LawEnforcement/LawEnforcementRegister';
import GetAllComplaints from './Components/LawEnforcement/GetAllComplaints';
import Errorpage from "./Components/ErrorPage";
import { CitizenBlock, LawEnforcementBlock } from "./Components/CitizenLawEnforcementBlocks";
import ComplaintWithId from './Components/Citizen/ComplaintWithId';
import RegisterComplaint from './Components/Citizen/RegisterComplaint';

function Home() {
  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <CitizenBlock />
      <LawEnforcementBlock />
    </div>
  );
}

function App() {
  const citizen = localStorage.getItem("citizen_token");
  const law = localStorage.getItem("law_token");
  console.log(law);
  console.log(citizen);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        {law && <Route path="/allComplaints" exact element={<GetAllComplaints />} />}
        <Route path='/allComplaints' exact element={<Navigate replace to="/lawEnforcementLogin" />} />
        <Route path="/lawEnforcementRegister" exact element={<LawEnforcementRegister />} />
        <Route path="/lawEnforcementLogin" exact element={<LawEnforcementLogin />} />
        {citizen && <Route path="/citizenDashboard" exact element={<CitizenDashboard />} />}
        <Route path='/citizenDashboard' exact element={<Navigate replace to="/citizenLogin" />} />
        <Route path="/citizenLogin" exact element={<CitizenLogin />} />
        <Route path="/citizenRegister" exact element={<CitizenRegister />} />
        <Route path="/citizen/complaints" exact element={<ComplaintWithId />} />
        <Route path="/citizen/RegisterComplaint" exact element={<RegisterComplaint />} />

        <Route path="*" element={<Errorpage />} />
      </Routes>
    </Router>
  );
}

export default App;

