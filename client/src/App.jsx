import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


import AdminPage from "./pages/Admin";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <NavbarConditional />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function NavbarConditional() {
  const location = useLocation();
  const showNavbar = !["/admin"].includes(location.pathname);

  return showNavbar ? <Navbar /> : null;
}

export default App;
