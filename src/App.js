import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CapabilityAssessmentDashboard from './Components/CapabilityAssessmentDashboard';

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to='/capability-dashboard'>CapabilityAssessmentDashboard</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/capability-dashboard' element={<CapabilityAssessmentDashboard/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
