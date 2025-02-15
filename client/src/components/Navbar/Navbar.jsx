import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../features/auth/Auth";

import "./navbar.css";
import api from "../../services/api";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar: null,
    name: "Usuário",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingDelay, setLoadingDelay] = useState(true);
  const navigate = useNavigate();

  const loadUserData = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const { data } = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoggedIn(true);
        setUserInfo({ name: data.name, avatar: data.avatar });
        console.log(data);
      } catch (error) {
        console.error(
          "Erro ao obter dados do usuário:",
          error.response || error.message
        );
        setIsLoggedIn(false);
        setUserInfo({ name: "Usuário", avatar: null });
      }
    } else {
      setIsLoggedIn(false);
      setUserInfo({ name: "Usuário", avatar: null });
    }

    setTimeout(() => {
      setLoading(false);
      setLoadingDelay(false);
    }, 1000);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  async function handleLogin(email, password) {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken); 

      loadUserData();
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
      localStorage.setItem("refreshToken", data.refreshToken); 

      setIsLoggedIn(true);
      setUserInfo({ name: data.name, avatar: data.avatar });

      await loadUserData();

      setModalOpen(false);
    } catch (error) {
      alert("Erro ao cadastrar");
    }
  }

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserInfo({ name: "Usuário", avatar: null });
    navigate("/");
  };

  if (loadingDelay) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-red-800 bg-opacity-50">
        <div className="spinner opacity-100">Carregando...</div>
      </div>
    );
  }

  return (
    <header className="flex items-center justify-between p-4 bg-[#a50c0c] text-white shadow-md z-50 fixed top-0 left-0 w-[100%] pt-[5px] pr-[100px]">
      <div className="logo">
        <img
          src="/assets/logo.png"
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
            {userInfo.avatar ? (
              <img
                src={
                  userInfo.avatar.startsWith("http")
                    ? userInfo.avatar
                    : `http://localhost:3000${userInfo.avatar}`
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
                  {userInfo.avatar ? (
                    <img
                      src={
                        userInfo.avatar.startsWith("http")
                          ? userInfo.avatar
                          : `http://localhost:3000${userInfo.avatar}`
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
                  <h3 className="text-lg font-medium">Olá, {userInfo.name}!</h3>
                </div>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="block py-2 hover:bg-gray-200 w-full text-left"
                >
                  <i className="bx bx-log-out mr-2" />
                  Sair
                </button>
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
