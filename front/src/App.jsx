import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CitizenLogin from './Components/CitizenLogin';
import CitizenRegister from './Components/CitizenRegister';
import './App.css';
import Complaint from './Components/Complaint';
import LawEnforcementLogin from './Components/LawEnforcementLogin';
import LawEnforcementRegister from './Components/LawEnforcementRegister';
import GetAllComplaints from './Components/GetAllComplaints';
import Errorpage from "./Components/ErrorPage";
import { CitizenBlock, LawEnforcementBlock } from "./Components/CitizenLawEnforcementBlocks";

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
        {citizen && <Route path="/complaint" exact element={<Complaint />} />}
        <Route path='/complaint' exact element={<Navigate replace to="/citizenLogin" />} />
        <Route path="/citizenLogin" exact element={<CitizenLogin />} />
        <Route path="/citizenRegister" exact element={<CitizenRegister />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </Router>
  );
}

export default App;




// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import CitizenLogin from './Components/CitizenLogin';
// import CitizenRegister from './Components/CitizenRegister';
// import './App.css';
// import Complaint from './Components/Complaint';
// import LawEnforcementLogin from './Components/LawEnforcementLogin';
// import LawEnforcementRegister from './Components/LawEnforcementRegister';
// import GetAllComplaints from './Components/GetAllComplaints';
// import Errorpage from "./Components/ErrorPage";
// import { CitizenBlock, LawEnforcementBlock } from "./Components/CitizenLawEnforcementBlocks";

// function Home() {
//   return (
//     <div style={{ maxWidth: 500, margin: "40px auto" }}>
//       <CitizenBlock />
//       <LawEnforcementBlock />
//     </div>
//   );
// }

// function PrivateRoute({ children, token, redirectTo }) {
//   return token ? children : <Navigate to={redirectTo} replace />;
// }

// function App() {
//   const citizen = localStorage.getItem("citizen_token");
//   const law = localStorage.getItem("law_token");

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/allComplaints"
//           element={
//             <PrivateRoute token={law} redirectTo="/lawEnforcementLogin">
//               <GetAllComplaints />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/lawEnforcementRegister" element={<LawEnforcementRegister />} />
//         <Route path="/lawEnforcementLogin" element={<LawEnforcementLogin />} />
//         <Route
//           path="/complaint"
//           element={
//             <PrivateRoute token={citizen} redirectTo="/citizenLogin">
//               <Complaint />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/citizenLogin" element={<CitizenLogin />} />
//         <Route path="/citizenRegister" element={<CitizenRegister />} />
//         <Route path="*" element={<Errorpage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;