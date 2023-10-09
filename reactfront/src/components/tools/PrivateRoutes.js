import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role === 'user') {
    // Permitir acceso a los usuarios normales a las rutas
    return element;
  }

  if (role === 'admin' && user.role === 'admin') {
    // Permitir acceso a los administradores a las rutas
    return element;
  }else{
    return <Navigate to="/home" />;
  }
};

export default PrivateRoute;
