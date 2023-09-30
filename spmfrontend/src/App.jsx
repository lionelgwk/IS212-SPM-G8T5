// import { useContext, useState, Fragment } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
// import ProtectedRoute from "./components/ProtectedRoute";
// import HomePage from "./pages/HomePage";
// import SkillsPage from "./pages/SkillsPage";
// import ProfilePage from "./pages/ProfilePage";
// import LoginPage from "./pages/LoginPage";
// import NavBar from "./components/NavBar";
// // import { useAuth } from "./components/useAuth";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Fragment>
//           <Routes>
//             <Route path="/" element={<ProtectedRoute />}>
//               <Route path="/" element={<NavBar/>}>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/skills" exact element={<SkillsPage />} />
//                 <Route path="/profile" exact element={<ProfilePage />} />
//                 {/* Add protected routes here... */}
//                 {/* Add protected routes here... */}
//                 {/* Add protected routes here... */}
//                 {/* Add protected routes here... */}
//               </Route>
//             </Route>
//             <Route path="/login" exact element={<LoginPage />} />
//             {/* Add unprotected routes here... */}
//             {/* Add unprotected routes here... */}
//             {/* Add unprotected routes here... */}
//           </Routes>
//         </Fragment>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillsPage";
import ProfilePage from "./pages/ProfilePage";
import AppliedPage from "./pages/AppliedPage"
import ApplicantsPage from "./pages/ApplicantsPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" exact element={<SkillsPage />} />
            <Route path="/applied" exact element={<AppliedPage />} />
            <Route path="/profile" exact element={<ProfilePage />} />
            <Route path="/applicants" exact element={<ApplicantsPage />} />
            {/* Add protected routes here... */}
            {/* Add protected routes here... */}
            {/* Add protected routes here... */}
          </Route>
          <Route path="/login" exact element={<LoginPage />} />
          {/* Add unprotected routes here... */}
          {/* Add unprotected routes here... */}
          {/* Add unprotected routes here... */}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
