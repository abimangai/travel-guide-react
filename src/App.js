
import './App.css';
import Places from './components/screens/Places';
import { Place } from './components/screens/Place';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/screens/Login';
import { SignUp } from './components/screens/SignUp';
import React, { useState, useEffect } from 'react';


export const userContext = React.createContext();

function App() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const updateUserData = (action) => {
    switch (action.type) {
      case 'LOGOUT':
        setUserData(null);
        localStorage.clear();
        break;
        case'LOGIN':
        setUserData(action.payload);
        break;
      default:
        break;
    }

  }
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user_data")));
    setLoading(false);
  }, []);

  return loading ? (
  <h1>Loading</h1>
  ):(
    <div>
      <userContext.Provider value={{ userData, updateUserData }}>
        <Router>
          <Routes>
            <Route path='/' element={<Places />} />
            <Route path='/place/:id' element={<Place />} />
            <Route path='/auth/login/' element={<Login />} />
            <Route path='/auth/create/' element={<SignUp />} />
          </Routes>
        </Router>
      </userContext.Provider>
    </div>


  );
}

export default App;
