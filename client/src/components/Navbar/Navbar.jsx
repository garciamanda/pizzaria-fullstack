import React, { useState, useEffect, useContext } from "react";
import Logo from "/assets/logo.png";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../features/auth/Auth";
import { UserContext } from "../../contexts/UserContext";
import Spinner from "../Spinner/Spinner";
import "./navbar.css";
import api from "../../services/api";

function Navbar() {
  const { setUserData, userData, loading } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  async function handleLogin(email, password) {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      localStorage.setItem("accessToken", data.accessToken);

      setUserData(data);
      setIsLoggedIn(true);
      setModalOpen(false);
    } catch (error) {
      alert("Erro ao fazer login");
    }
  }

  async function handleSignup(name, email, password) {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("accessToken", data.accessToken);

      setUserData(data);
      setIsLoggedIn(true);
      setModalOpen(false);
    } catch (error) {
      alert("Erro ao cadastrar");
    }
  }

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/user-settings");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner /> {/* Certifique-se de ter um componente Spinner! */}
      </div>
    );
  }

  return (
    <header className="flex items-center justify-between p-4 bg-[#a50c0c] text-white shadow-md z-50 fixed top-0 left-0 w-[100%] pt-[5px] pr-[100px]">
      <div className="logo">
        <img
          src={Logo}
          alt="Logo"
          className="w-[110px] rounded-[50%] ml-14"
        />
      </div>

      <button
        className="block lg:hidden text-white text-4xl focus:outline-none"
        onClick={toggleMenu}
      >
        <i className="bx bx-menu " />
      </button>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute lg:static top-33 right-0 w-[250px] lg:h-auto h-screen justify-items-start lg:w-auto bg-[#640606] lg:flex lg:flex-row flex flex-col items-center  gap-4 lg:gap-8 lg:bg-transparent lg:text-white lg:shadow-none shadow-lg navbar lg:pt-0 pt-10`}
      >
        <a href="/" className="hover:text-gray-300 transition">
          Home
        </a>
        <a href="/feedback" className="hover:text-gray-300 transition">
          Feedback
        </a>

        {isLoggedIn ? (
          <div className="relative">
            {userData?.avatar ? (
              <img
                src={
                  userData.avatar.startsWith("http")
                    ? userData.avatar
                    : `http://localhost:3000${userData.avatar}`
                }
                alt="Avatar"
                className="h-12 w-12 rounded-full cursor-pointer"
                onClick={toggleSubMenu}
              />
            ) : (
              <i
                className="bx bxs-user-circle text-4xl cursor-pointer"
                onClick={toggleSubMenu}
              />
            )}

            {subMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg p-4">
                <div className="flex items-center gap-2">
                  {userData?.avatar ? (
                    <img
                      src={
                        userData.avatar.startsWith("http")
                          ? userData.avatar
                          : `http://localhost:3000${userData.avatar}`
                      }
                      alt="Avatar"
                      className="h-12 w-12 rounded-full cursor-pointer"
                      onClick={toggleSubMenu}
                    />
                  ) : (
                    <i
                      className="bx bxs-user-circle text-4xl cursor-pointer"
                      onClick={toggleSubMenu}
                    />
                  )}
                  <h3 className="text-lg font-medium">Olá, {userData.name}!</h3>
                </div>
                <hr className="my-2" />
                <button
                  onClick={handleSettings}
                  className="block py-2 hover:bg-gray-200 w-full text-left"
                >
                  <i className="bx bx-cog mr-2" />
                  Configurações
                </button>
                <button
                  className="block py-2 hover:bg-gray-200 w-full text-left"
                  onClick={() => {
                    navigate("/support");
                  }}
                >
                  <i className="bx bx-support mr-2" />
                  Suporte
                </button>
                <button
                  onClick={handleLogout}
                  className="block py-2 hover:bg-gray-200 w-full text-left"
                >
                  <i className="bx bx-log-out mr-2" />
                  Sair
                </button>
                {/* botao com icone de suporte */}
              </div>
            )}
          </div>
        ) : (
          <button
            className="flex items-center gap-2 text-white bg-transparent border-2 border-white rounded-md cursor-pointer text-lg font-medium ml-4 transition-all duration-500 hover:bg-white hover:text-[#162938] py-2 px-4"
            onClick={() => {
              setModalOpen(true);
              setMenuOpen(false);
            }}
          >
            <i className="bx bx-user " /> Login / Cadastro
          </button>
        )}
      </nav>

      <AuthModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />
    </header>
  );
}

export default Navbar;
