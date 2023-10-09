import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowSurveys from './components/surveys/ShowSurveys';
import CreateSurvey from './components/surveys/CreateSurvey';
import EditSurvey from './components/surveys/EditSurvey';
import Auth from './components/user_access/Auth';
import PrivateRoute from './components/tools/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<PrivateRoute role="user" element={<ShowSurveys />} />} />
          <Route path="/create" element={<PrivateRoute role="user" element={<CreateSurvey />} />} />
          <Route path="/edit" element={<PrivateRoute role="admin" element={<EditSurvey />} />} />
          <Route path="/edit/:id" element={<PrivateRoute role="admin" element={<EditSurvey />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
