import React, { useState } from 'react';
import axios from 'axios';
import Icon from '../tools/icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import validate from './UserFormValidation';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const endPoint = 'http://localhost:8000/api';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate({
            email,
            password
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        } else {
            setErrors({});
        }

        try {
            const response = await axios.post(`${endPoint}/login`, {
                email,
                password
            });

            if (response.data && response.data.user) {
                const userData = {
                    email: response.data.user.email,
                    role: response.data.user.role
                };
                localStorage.setItem("user", JSON.stringify(userData));
            }

            setErrorMessage('');
            setSuccessMessage('User successfully logged in!');
            navigate('/home');
        } catch (error) {
            setSuccessMessage('');
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error al iniciar sesión, intenta de nuevo.');
            }
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="border p-5 rounded shadow">
                <form onSubmit={handleSubmit} className="w-100">
                    <h3 className="text-center mb-4">Login</h3>
                    
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
                                placeholder={errors.email || "Email"}
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
                                placeholder={errors.password || "Contraseña"}
                                style={errors.password ? { color: 'red' } : {}}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
