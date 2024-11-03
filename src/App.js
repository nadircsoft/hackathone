// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Notes from './components/notes/Notes';
import Home from './components/Home'; // Ensure this component exists
import './'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/notes" component={Notes} />

                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
