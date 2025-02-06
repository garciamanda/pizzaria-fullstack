import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import ListarUsuarios from "./pages/Lista";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listar-usuarios" element={<ListarUsuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
