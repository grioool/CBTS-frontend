import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import SummaryPage from './pages/SummaryPage';
import UserHistoryPage from './pages/UserHistoryPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
    return (
        <Router>
            <NavBar/>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/registration" element={<RegistrationPage/>}/>
                    <Route path="/summary" element={<SummaryPage/>}/>
                    <Route path="/history" element={<UserHistoryPage/>}/>
                    <Route path="/admin/analytics" element={<AdminPage/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
