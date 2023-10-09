import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import './surveys_styles/ShowSurveys.css';

const endPoint = 'http://localhost:8000/api';

const ShowSurveys = () => {
    const [surveys, setSurveys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [surveysLoaded, setSurveysLoaded] = useState(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userRole = storedUser ? storedUser.role : null;
    const navigate = useNavigate();

    useEffect(() => {
        getAllSurveys();
    }, []);

    const getAllSurveys = async (page = 1) => {
        try {
            const response = await axios.get(`${endPoint}/surveys?page=${page}`);
            setSurveys(response.data.data);
            setPaginationInfo({
                currentPage: response.data.current_page,
                lastPage: response.data.last_page
            });
            setSurveysLoaded(true);
        } catch (error) {
            console.error('Error fetching surveys:', error);
        }
    };

    const deleteSurvey = async (id) => {
        try {
            await axios.delete(`${endPoint}/survey/${id}`);
            getAllSurveys();
        } catch (error) {
            console.error('Error deleting survey:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
      };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getAllSurveys(page);
    };

    return (
        <div className="container">
          <div className="text-center mb-4">
            <Link to="/create" className="btn btn-success btn-lg text-white btn-create">Create</Link>
            <Link to="/" onClick={handleLogout} className="btn btn-link btn-logout">Logout</Link>
          </div>
    
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {surveysLoaded && surveys.length > 0 ? (
              surveys.map((survey) => (
                <div key={survey.id} className="col-lg-3 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Customer DNI: {survey.customer_dni}</h5>
                      <p className="card-text">Product: {survey.product}</p>
                      <p className="card-text">Subproduct: {survey.subproduct}</p>
                      {survey.product === 'DUAL' && (
                        <>
                          <p className="card-text">Subproduct GAS: {survey.subproduct_gas}</p>
                          <p className="card-text">Maintenance LIGHT: {survey.maintenance_light}</p>
                          <p className="card-text">Maintenance GAS: {survey.maintenance_gas}</p>
                        </>
                      )}
                      {survey.product !== 'DUAL' && (
                        <p className="card-text">Maintenance: {survey.maintenance}</p>
                      )}
                      <p className="card-text">State: {survey.state}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-center">
                      {userRole !== "user" && (
                          <>
                          <Link to={`/edit/${survey.id}`} className='btn btn-warning'>Edit</Link>
                          <button onClick={() => deleteSurvey(survey.id)} className='btn btn-danger' style={{ marginLeft: '20px' }}>Delete</button>
                          </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <h1>There's no Surveys To Load</h1>
              </div>
            )}
          </div>
          <div className="pagination mt-4 d-flex justify-content-center">
            <button className="btn btn-secondary" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
            <span className="align-self-center mx-3">Page {currentPage} of {paginationInfo.lastPage}</span>
            <button className="btn btn-secondary" disabled={currentPage === paginationInfo.lastPage} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </div>
      </div>
    );
};

export default ShowSurveys;
