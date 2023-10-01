import React, { useState, useEffect, useContext } from "react";


const HomePage = () => {

    const handleSignOut = () => {
        localStorage.removeItem('userToken');
        window.location.href = '/login'; // Redirect to homepage
    }

    return(
        <div>
            
            This is the homepage!
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};
export default HomePage;