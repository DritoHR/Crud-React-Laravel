import React, { useState, useRef } from 'react';
import axios from 'axios';
import { validateFields, adaptBackendErrors } from './SurveyFormValidation';
import { useNavigate } from "react-router-dom";
import './surveys_styles/CreateSurvey.css';


const endPoint = 'http://localhost:8000/api';

const SurveyForm = () => {
    const [formData, setFormData] = useState({
        customer_dni: '',
        product: '',
        subproduct: '',
        subproduct_gas: '',
        maintenance: '',
        maintenance_gas: '',
        maintenance_light: '',
        state: ''
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const formRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');


    const createSurvey = async () => {
        try {
            if (formData.product !== "DUAL") {
                formData.maintenance_gas = null;
                formData.maintenance_light = null;
            } else {
                formData.maintenance = null;
            }
            const response = await axios.post(`${endPoint}/survey`, formData);
            console.log(response.data);
            setErrors({});
    
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('Encuesta creada exitosamente!');
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
    
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const backendErrors = error.response.data.errors;
                setErrors(adaptBackendErrors(backendErrors));
            } else {
                console.error("There was an error sending data.", error);
                setErrors({ general: 'An unexpected error occurred. Please try again.' });
    
                setShowAlert(true);
                setAlertType('danger');
                setAlertMessage('An unexpected error occurred. Please try again.');
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        }
    };
    
    const getProductOptions = () => {
        switch (formData.product) {
            case 'LUZ':
                return ['TARIFA PLANA', 'TARIFA POR USO'];
            case 'GAS':
                return ['PLENA', 'TOTAL'];
            case 'DUAL':
                return ['TARIFA PLANA', 'TARIFA POR USO'];
            default:
                return [];
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        // Clear the error when the user modifies the field
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting form");

        if (validateFields(formData, setErrors)) {
            createSurvey();
        }
    };

    const backToPrincipal = () => {
        navigate('/home');
    }

    return (
        <div className="survey-outer-container">
            {showAlert && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert" style={{position: 'fixed', top: '20px', right: '20px', zIndex: 9999}}>
                    {alertMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                </div>
            )}

            <div className="survey-inner-container">
                <h1>Create Survey</h1>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="customer_dni" className="form-label">DNI de cliente</label>
                        <input type="text" className="form-control" id="customer_dni" name="customer_dni" maxLength={9} onChange={handleChange} required />
                        {errors.customer_dni && <span className="text-danger">{errors.customer_dni}</span>}
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="product" className="form-label">Producto</label>
                        <select className="form-control" id="product" name="product" onChange={handleChange} required>
                            <option value="">Seleccionar...</option>
                            <option value="LUZ">LUZ</option>
                            <option value="GAS">GAS</option>
                            <option value="DUAL">DUAL</option>
                        </select>
                        {errors.product && <span className="text-danger">{errors.product}</span>}
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="subproduct" className="form-label">Subproducto</label>
                        <select className="form-control" id="subproduct" name="subproduct" onChange={handleChange} required={formData.product !== ''}>
                            <option value="">Seleccionar...</option>
                            {getProductOptions().map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        {errors.subproduct && <span className="text-danger">{errors.subproduct}</span>}
                    </div>
    
                    {formData.product === 'DUAL' && (
                        <div className="mb-3">
                            <label htmlFor="subproductGas" className="form-label">Subproducto GAS</label>
                            <select className="form-control" id="subproductGas" name="subproduct_gas" onChange={handleChange} required>
                                <option value="">Seleccionar...</option>
                                <option value="PLENA">PLENA</option>
                                <option value="TOTAL">TOTAL</option>
                            </select>
                            {errors.subproductGas && <span className="text-danger">{errors.subproductGas}</span>}
                        </div>
                    )}
    
                    {(formData.product === 'LUZ' || formData.product === 'GAS') && (
                        <div className="mb-3">
                            <label htmlFor="maintenance" className="form-label">Mantenimiento</label>
                            <select className="form-control" id="maintenance" name="maintenance" onChange={handleChange} required>
                                <option value="">Seleccionar...</option>
                                <option value="SI">SI</option>
                                <option value="NO">NO</option>
                            </select>
                            {errors.maintenance && <span className="text-danger">{errors.maintenance}</span>}
                        </div>
                    )}
    
                    {formData.product === 'DUAL' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="maintenanceLight" className="form-label">Mantenimiento LUZ</label>
                                <select className="form-control" id="maintenanceLight" name="maintenance_light" onChange={handleChange} required>
                                    <option value="">Seleccionar...</option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                                </select>
                                {errors.maintenanceLight && <span className="text-danger">{errors.maintenanceLight}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="maintenanceGas" className="form-label">Mantenimiento GAS</label>
                                <select className="form-control" id="maintenanceGas" name="maintenance_gas" onChange={handleChange} required>
                                    <option value="">Seleccionar...</option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                                </select>
                                {errors.maintenanceGas && <span className="text-danger">{errors.maintenanceGas}</span>}
                            </div>
                        </>
                    )}
    
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">Estado</label>
                        <select className="form-control" id="state" name="state" onChange={handleChange} required>
                            <option value="">Seleccionar...</option>
                            <option value="VENDIDO">VENDIDO</option>
                            <option value="EN PROCESO">EN PROCESO</option>
                            <option value="NO VENDIDO">NO VENDIDO</option>
                            <option value="NO VÁLIDO">NO VÁLIDO</option>
                        </select>
                        {errors.state && <span className="text-danger">{errors.state}</span>}
                    </div>
                </form>
            </div>
            <div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Crear Encuesta</button>
                <div className='btn-right'>
                    <button type="button" className="btn btn-outline-secondary" onClick={backToPrincipal}>Back</button>
                </div>
            </div>
        </div>
    );    
}

export default SurveyForm;
