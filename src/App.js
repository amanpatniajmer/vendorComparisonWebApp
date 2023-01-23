import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ActivitiesAssessmentDashboard from './Pages/ActivitiesAssessmentDashboard';
import CapabilityAssessmentDashboard from './Pages/CapabilityAssessmentDashboard';
import FeaturesAssessmentDashboard from './Pages/FeaturesAssessmentDashboard';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';

function App() {

  const [active, setActive] = useState("Home")
  return (
    <div className="App">
      <Navbar active={active} heading={"Workforce Management Vendor Assessment"}/>
      <Routes>
        <Route path='/' element={<Home setActive={setActive}/>}>
        </Route>
        <Route path='/capability-assessment-dashboard' element={<CapabilityAssessmentDashboard setActive={setActive}/>}>
        </Route>
        <Route path='/feature-assessment-dashboard' element={<FeaturesAssessmentDashboard setActive={setActive}/>}>
        </Route>
        <Route path='/activities-assessment-dashboard' element={<ActivitiesAssessmentDashboard setActive={setActive}/>}>
        </Route>
        <Route path='/*' element={<Home setActive={setActive}/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
