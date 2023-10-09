import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validateFields, adaptBackendErrors } from './SurveyFormValidation';
import './surveys_styles/EditSurvey.css';

const endPoint = 'http://localhost:8000/api/survey/';

const EditSurvey = () => {
    const navigate = useNavigate();
    
    const [customer_dni, setCustomer_dni] = useState('');
    const [product, setProduct] = useState('');
    const [subproductOptions, setSubproductOptions] = useState([]); 
    const [subproduct, setSubproduct] = useState('');
    const [subproduct_gas, setSubproduct_gas] = useState('');
    const [maintenance, setMaintenance] = useState('');
    const [maintenance_light, setMaintenance_light] = useState('');
    const [maintenance_gas, setMaintenance_gas] = useState('');
    const [state, setState] = useState('');
    const { id } = useParams();

    const [errors, setErrors] = useState({});

    const update = async () => {

        const validationErrors = validateFields({
            customer_dni,
            product,
            subproduct,
            subproduct_gas,
            maintenance,
            maintenance_light,
            maintenance_gas,
            state
        }, setErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            try {
                await axios.put(`${endPoint}${id}`, {
                    customer_dni,
                    product,
                    subproduct,
                    subproduct_gas,
                    maintenance,
                    maintenance_light,
                    maintenance_gas,
                    state
                });

                setShowAlert(true);
                setAlertType('success');
                setAlertMessage('Survey updated successfully!');
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);

            } catch (error) {
                const backendErrors = adaptBackendErrors(error.response.data);
                setErrors(prevErrors => ({ ...prevErrors, ...backendErrors }));
            }
        } else {
            setErrors(prevErrors => ({ ...prevErrors, ...validationErrors }));
        }
    };

    useEffect(() => {
        const getSurveyById = async () => {
            try {
                const response = await axios.get(`${endPoint}${id}`);
                
                const {
                    customer_dni, product, subproduct, subproduct_gas, 
                    maintenance, maintenance_light, maintenance_gas, state
                } = response.data;
    

                console.log(response.data);

                setCustomer_dni(customer_dni);
                setProduct(product);
                setSubproduct(subproduct);
                setSubproduct_gas(subproduct_gas);
                setMaintenance(maintenance);
                setMaintenance_light(maintenance_light);
                setMaintenance_gas(maintenance_gas);
                setState(state);
                const options = getProductOptions(product);
                setSubproductOptions(options);
            } catch (error) {
                console.error("Error al cargar la encuesta:", error);
            }
        }
        getSurveyById();
    }, [id]);

    const getProductOptions = (selectedProduct) => {
        switch (selectedProduct) {
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

    const handleProductChange = (event) => {
        const selectedProduct = event.target.value;
        setProduct(selectedProduct);
        setSubproduct(''); 
        setSubproductOptions(getProductOptions(selectedProduct));
    
        switch (selectedProduct) {
            case 'LUZ':
            case 'GAS':
                setMaintenance_gas(null);
                setMaintenance_light(null);
                setSubproduct_gas(null);
                break;
            case 'DUAL':
                setMaintenance(null);
                break;
            default:
                setSubproduct(null);
                setSubproduct_gas(null);
                setMaintenance(null);
                setMaintenance_light(null);
                setMaintenance_gas(null);
                break;
        }
    };

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');


    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log("Submitting form");
    
        const formData = {
            customer_dni,
            product,
            subproduct,
            subproduct_gas,
            maintenance,
            maintenance_light,
            maintenance_gas,
            state
        };
    
        const formErrors = validateFields(formData, setErrors);
        

        console.log(formData);

        if (Object.keys(formErrors).length === 0) {
            update();
        }
    };

    const backToPrincipal = () => {
        navigate('/home');
    }

    return (
        <div className="survey-container">
            {showAlert && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert" style={{position: 'fixed', top: '20px', right: '20px', zIndex: 9999}}>
                    {alertMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                </div>
             )}
            <div className="survey-inner">
                <h1>Edit Survey</h1>
                <form className="survey-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="customer_dni" className="form-label">DNI de cliente</label>
                        <input type="text" className="form-control" id="customer_dni" name="customer_dni" maxLength={9} value={customer_dni} onChange={e => setCustomer_dni(e.target.value)} />
                        {errors.customer_dni && <small className="text-danger">{errors.customer_dni}</small>}
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="product" className="form-label">Producto</label>
                        <select className="form-control" id="product" name="product" required value={product} onChange={handleProductChange}>
                            <option value="">Seleccionar...</option>
                            {['LUZ', 'GAS', 'DUAL'].map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                        </select>
                        {errors.product && <small className="text-danger">{errors.product}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="subproduct" className="form-label">Subproducto</label>
                        <select className="form-control" id="subproduct" name="subproduct" required value={subproduct} onChange={e => setSubproduct(e.target.value)}>
                            <option value="">Seleccionar...</option>
                            {subproductOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                        </select>
                        {errors.subproduct && <small className="text-danger">{errors.subproduct}</small>}
                    </div>
                    
    
                    {product === 'DUAL' && (
                        <div className="mb-3">
                            <label htmlFor="subproductGas" className="form-label">Subproducto GAS</label>
                            <select className="form-control" id="subproductGas" name="subproduct_gas" required value={subproduct_gas} onChange={e => setSubproduct_gas(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                {['PLENA', 'TOTAL'].map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                            </select>
                            {errors.subproduct_gas && <small className="text-danger">{errors.subproduct_gas}</small>}
                        </div>
                    )}
    
                    {product && product !== 'DUAL' && (
                        <div className="mb-3">
                            <label htmlFor="maintenance" className="form-label">Mantenimiento</label>
                            <select className="form-control" id="maintenance" name="maintenance" required value={maintenance} onChange={e => setMaintenance(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                {['SI', 'NO'].map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                            </select>
                            {errors.maintenance && <small className="text-danger">{errors.maintenance}</small>}
                        </div>
                    )}
    
                    {product === 'DUAL' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="maintenanceLight" className="form-label">Mantenimiento LUZ</label>
                                <select className="form-control" id="maintenanceLight" name="maintenance_light" required value={maintenance_light} onChange={e => setMaintenance_light(e.target.value)}>
                                    <option value="">Seleccionar...</option>
                                    {['SI', 'NO'].map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                                </select>
                                {errors.maintenance_light && <small className="text-danger">{errors.maintenance_light}</small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="maintenanceGas" className="form-label">Mantenimiento GAS</label>
                                <select className="form-control" id="maintenanceGas" name="maintenance_gas" required value={maintenance_gas} onChange={e => setMaintenance_gas(e.target.value)}>
                                    <option value="">Seleccionar...</option>
                                    {['SI', 'NO'].map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                                </select>
                                {errors.maintenance_gas && <small className="text-danger">{errors.maintenance_gas}</small>}
                            </div>
                        </>
                    )}
    
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">Estado</label>
                        <select className="form-control" id="state" name="state" required value={state} onChange={e => setState(e.target.value)}>
                            <option value="">Seleccionar...</option>
                            {['VENDIDO', 'EN PROCESO', 'NO VENDIDO', 'NO VÁLIDO'].map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                        </select>
                        {errors.state && <small className="text-danger">{errors.state}</small>}
                    </div>
                </form>
            </div>
            <div className="btn-container">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Confirm</button>
                <div className="btn-right">
                    <button type="button" className="btn btn-outline-secondary" onClick={backToPrincipal}>Back</button>
                </div>
            </div>
        </div>
    );    
}

export default EditSurvey