import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import ActivitiesAssessmentDashboard from './Components/ActivitiesAssessmentDashboard';
import CapabilityAssessmentDashboard from './Components/CapabilityAssessmentDashboard';
import FeaturesAssessmentDashboard from './Components/FeaturesAssessmentDashboard';

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to='/capability-dashboard'>Capability Assessment Dashboard</Link>
        </li>
        <li>
          <Link to='/feature-assessment-dashboard'>Feature Assessment Dashboard</Link>
        </li>
        <li>
          <Link to='/activities-assessment-dashboard'>Activities Assessment Dashboard</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/capability-dashboard' element={<CapabilityAssessmentDashboard/>}>
        </Route>
        <Route path='/feature-assessment-dashboard' element={<FeaturesAssessmentDashboard/>}>
        </Route>
        <Route path='/activities-assessment-dashboard' element={<ActivitiesAssessmentDashboard/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
