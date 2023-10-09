import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'; 
import './user_styles/userFormStyles.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <p>
        {isLogin
          ? "¿No tienes una cuenta? "
          : "¿Ya tienes una cuenta? "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Registrarse" : "Ingresar"}
        </span>
      </p>
    </div>
  );
}

export default Auth;