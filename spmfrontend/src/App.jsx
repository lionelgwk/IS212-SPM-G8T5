import { useContext, useState, Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillsPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import CreateRolePage from "./pages/CreateRolePage";
// import { useAuth } from "./components/useAuth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<NavBar/>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/skills" exact element={<SkillsPage />} />
                <Route path="/create" exact element={<CreateRolePage />} />
                {/* Add protected routes here... */}
                {/* Add protected routes here... */}
                {/* Add protected routes here... */}
                {/* Add protected routes here... */}
                {/* Add protected routes here... */}
              </Route>
            </Route>
            <Route path="/login" exact element={<LoginPage />} />
            {/* Add unprotected routes here... */}
            {/* Add unprotected routes here... */}
            {/* Add unprotected routes here... */}
          </Routes>
        </Fragment>
      </BrowserRouter>
    </>
  );
}

export default App;
