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
        tempErrors.customer_dni = "DNI no válido";
    }
    
    if (!(formData.product ? formData.product.trim() : "")) {
        valid = false;
        tempErrors.product = "Producto es requerido";
    }
    
    if (!(formData.subproduct ? formData.subproduct.trim() : "")) {
        valid = false;
        tempErrors.subproduct = "Subproducto es requerido";
    }
    
    if (formData.product === 'DUAL' && !(formData.subproduct_gas ? formData.subproduct_gas.trim() : "")) {
        valid = false;
        tempErrors.subproductGas = "Subproducto GAS es requerido";
    }
    
    if ((formData.product === 'LUZ' || formData.product === 'GAS') && !(formData.maintenance ? formData.maintenance.trim() : "")) {
        valid = false;
        tempErrors.maintenance = "Mantenimiento es requerido";
    }
    
    if (formData.product === 'DUAL' && !(formData.maintenance_light ? formData.maintenance_light.trim() : "")) {
        valid = false;
        tempErrors.maintenanceLight = "Mantenimiento LUZ es requerido";
    }
    
    if (formData.product === 'DUAL' && !(formData.maintenance_gas ? formData.maintenance_gas.trim() : "")) {
        valid = false;
        tempErrors.maintenanceGas = "Mantenimiento GAS es requerido";
    }
    
    if (!(formData.state ? formData.state.trim() : "")) {
        valid = false;
        tempErrors.state = "Estado es requerido";
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
