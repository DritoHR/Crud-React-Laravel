const validate = (values) => {
    let errors = {};

    if (values.firstName && !values.firstName) {
        errors.firstName = "First name is required.";
    }

    if (values.lastName && !values.lastName) {
        errors.lastName = "Last name is required.";
    }

    if (!values.email) {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email format.";
    }

    if (!values.password) {
        errors.password = "Password is required.";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    if (values.confirmPassword) {
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirmation is required.";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
    }

    return errors;
}

export default validate;
