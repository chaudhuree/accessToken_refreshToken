import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
axios.defaults.withCredentials = true;
export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  )
}
