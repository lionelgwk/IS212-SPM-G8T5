import React from 'react';

const LoginPage = () => {
  const handleLogin = () => {
    localStorage.setItem('userToken', true);
    window.location.href = '/'; // Redirect to homepage
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
