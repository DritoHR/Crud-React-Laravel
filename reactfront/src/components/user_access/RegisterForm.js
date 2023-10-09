import React, { useState } from 'react';
import axios from 'axios';
import Icon from '../tools/icons';
import { faUser, faLock, faSignature, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import validate from './UserFormValidation';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {

    const endPoint = 'http://localhost:8000/api';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccessMessage('');
        setErrorMessage('');    

        const validationErrors = validate({
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }else {
            setErrors(validationErrors);
        }

        try {
            const response = await axios.post(`${endPoint}/register`, {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                password_confirmation: confirmPassword
            });

            if (response.data && response.data.user) {
                const userData = {
                    email: response.data.user.email,
                    role: response.data.user.role
                };
                localStorage.setItem("user", JSON.stringify(userData));
            }

            setSuccessMessage('User sucessfully registered!');
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('There was an error with the registration, please try again.');
            }
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="border p-5 rounded shadow">
                <form onSubmit={handleSubmit} className="w-100">
                    <h3 className="text-center mb-4">Register</h3>
                    <div className="form-row mb-3">
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text icon-container">
                                        <Icon icon={faSignature} />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder={errors.firstName || "Enter your first name"}
                                    style={errors.firstName ? { color: 'red' } : {}}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text icon-container">
                                        <Icon icon={faUser} />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder={errors.lastName || "Enter your last name"}
                                    style={errors.lastName ? { color: 'red' } : {}}
                                />
                            </div>
                        </div>
                    </div>
    
                    <div className="form-group mb-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <Icon icon={faEnvelope} />
                                </span>
                            </div>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={errors.email || "Enter your email"}
                                style={errors.email ? { color: 'red' } : {}}
                            />
                        </div>
                    </div>
    
                    <div className="form-group mb-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <Icon icon={faLock} />
                                </span>
                            </div>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={errors.password || "Enter your password"}
                                style={errors.password ? { color: 'red' } : {}}
                            />
                        </div>
                    </div>
    
                    <div className="form-group mb-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text icon-container">
                                    <Icon icon={faLock} />
                                </span>
                            </div>
                            <input
                                type="password"
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                id="confirm_password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder={errors.confirmPassword || "Confirm your password"}
                                style={errors.confirmPassword ? { color: 'red' } : {}}
                            />
                        </div>
                    </div>
    
                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );        
}

export default RegisterForm;
