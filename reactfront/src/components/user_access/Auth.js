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
          ? "You don´t have an account? "
          : "Do you already have an account?"}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Log In"}
        </span>
      </p>
    </div>
  );
}

export default Auth;
