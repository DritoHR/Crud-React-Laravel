export const validateFields = (formData, setErrors) => {
    let valid = true;
    let tempErrors = {};

    const isValidDNI = (dni) => {
        const letter = dni.slice(-1);
        const numbers = parseInt(dni.slice(0, -1));

        if ("TRWAGMYFPDXBNJZSQVHLCKE"[numbers % 23] === letter && letter.length === 1 && numbers.toString().length === 8) {
            return true;
        }
        return false;
    };

    if (!(formData.customer_dni ? formData.customer_dni.trim() : "")) {
        valid = false;
        tempErrors.customer_dni = "DNI es requerido";
    } else if (!isValidDNI(formData.customer_dni)) {
        valid = false;
        tempErrors.customer_dni = "Invalid ID format.";
    }
    
    if (!(formData.product ? formData.product.trim() : "")) {
        valid = false;
        tempErrors.product = "Product is required";
    }
    
    if (!(formData.subproduct ? formData.subproduct.trim() : "")) {
        valid = false;
        tempErrors.subproduct = "Subproduct is required";
    }
    
    if (formData.product === 'DUAL' && !(formData.subproduct_gas ? formData.subproduct_gas.trim() : "")) {
        valid = false;
        tempErrors.subproductGas = "GAS subproduct is required";
    }
    
    if ((formData.product === 'LUZ' || formData.product === 'GAS') && !(formData.maintenance ? formData.maintenance.trim() : "")) {
        valid = false;
        tempErrors.maintenance = "Maintenance is required.";
    }
    
    if (formData.product === 'DUAL' && !(formData.maintenance_light ? formData.maintenance_light.trim() : "")) {
        valid = false;
        tempErrors.maintenanceLight = "Light maintenance is required.";
    }
    
    if (formData.product === 'DUAL' && !(formData.maintenance_gas ? formData.maintenance_gas.trim() : "")) {
        valid = false;
        tempErrors.maintenanceGas = "Gas maintenance is required.";
    }
    
    if (!(formData.state ? formData.state.trim() : "")) {
        valid = false;
        tempErrors.state = "State is required";
    }
    
    setErrors(tempErrors);
    return valid;
};

export const adaptBackendErrors = (backendErrors) => {
    const errorMapping = {
        customer_dni: 'customer_dni',
        product: 'product',
        subproduct: 'subproduct',
        subproduct_gas: 'subproductGas',
        maintenance: 'maintenance',
        maintenance_light: 'maintenanceLight',
        maintenance_gas: 'maintenanceGas',
        state: 'state'
    };

    let adaptedErrors = {};

    for (let key in backendErrors) {
        if (backendErrors.hasOwnProperty(key) && errorMapping[key]) {
            adaptedErrors[errorMapping[key]] = backendErrors[key][0];
        }
    }

    return adaptedErrors;
};
