import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import './AuthPopup.css';

export default function AuthPopup({ onAuthSuccess }) {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    document.querySelector('.modal').style.animation = 'SlideOut 0.3s';
    setTimeout(() => {
      setShow(false);
    }, 290); 
  }
  const handleToggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      <button className="auth-button" onClick={handleShow}>
        Login/Register
      </button>

      {show && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isLogin ? 'Login' : 'Register'}</h2>
              <span className="close" onClick={handleClose}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              {isLogin ? (
                <LoginForm onLoginSuccess={onAuthSuccess} />
              ) : (
                <RegistrationForm onRegisterSuccess={() => setIsLogin(true)} />
              )}
              <p>
                {isLogin ? (
                  <span>
                    Don't have an account?{' '}
                    <button onClick={handleToggleForm}>
                      Register
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button onClick={handleToggleForm}>
                      Login
                    </button>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};