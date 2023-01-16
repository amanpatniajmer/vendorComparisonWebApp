import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CapabilityAssessmentDashboard from './Components/CapabilityAssessmentDashboard';
import FeaturesAssessmentDashboard from './Components/FeaturesAssessmentDashboard';

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to='/capability-dashboard'>CapabilityAssessmentDashboard</Link>
        </li>
        <li>
          <Link to='/feature-assessment-dashboard'>FeatureAssessmentDashboard</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/capability-dashboard' element={<CapabilityAssessmentDashboard/>}>
        </Route>
        <Route path='/feature-assessment-dashboard' element={<FeaturesAssessmentDashboard/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
