import api from "../../services/api";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function AuthModal({ modalOpen, setModalOpen, handleLogin, handleSignup }) {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const formRef = useRef();

  const navigate = useNavigate();

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userRole", data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      window.location.reload();
      setModalOpen(false);
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const { data } = await api.post("/auth/register", formData);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userRole", data.role);

      handleLogin(emailRef.current.value, passwordRef.current.value);

      setModalOpen(false);
    } catch (error) {
      alert("Erro ao cadastrar");
      console.error(
        "Erro ao cadastrar:",
        error.response?.data || error.message
      );
    }
  }

  const handleGoogleLogin = async (response) => {
    try {
      console.log("Google login response:", response);
      const googleToken = response.credential;

      console.log("Google token:", googleToken);

      const { data } = await api.post("/auth/google", { token: googleToken });
      console.log("API response data:", data);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userRole", data.role);

      window.location.reload();
      setModalOpen(false);
    } catch (error) {
      alert("Erro ao autenticar com o Google");
      console.error(
        "Erro ao autenticar com o Google:",
        error.response?.data || error.message
      );
    }
  };

  function handleOutsideClick(e) {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  }

  function closeModal() {
    setModalOpen(false);
  }

  React.useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [modalOpen]);

  return (
    modalOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/65 bg-opacity-50 z-50">
        <div
          ref={formRef}
          className="max-w-md mx-auto w-full mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-1 right-4 text-[40px] font-bold text-black cursor-pointer hover:text-red-600"
          >
            &times;
          </button>
          <div
            className="logo bg-[#A50C0C] rounded-full w-24 h-24 absolute left-1/2 transform -translate-x-1/2"
            id="logo-login"
          >
            <img src="/assets/logo.png" alt="" />
          </div>

          <h2 className="text-2xl mt-30 font-bold mb-6 text-center text-gray-800">
            {isLogin ? "Login" : "Cadastro"}
          </h2>
          <form
            className="flex flex-col gap-5"
            onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
          >
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full text-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  ref={nameRef}
                />
              </>
            )}
            <input
              type="text"
              placeholder="Email"
              className="w-full text-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full text-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              ref={passwordRef}
            />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              {isLogin ? "Login" : "Cadastrar"}
            </button>
          </form>

          <div className="text-center text-blue-700 mt-4">
            {isLogin ? (
              <p>
                Não tem uma conta?{" "}
                <span
                  className="text-blue-700 cursor-pointer hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Cadastre-se
                </span>
              </p>
            ) : (
              <p>
                Já tem uma conta?{" "}
                <span
                  className="text-blue-700 cursor-pointer hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Fazer login
                </span>
              </p>
            )}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-t-2 border-gray-300" />
              <p className="mx-4 text-gray-600">OU</p>
              <hr className="flex-1 border-t-2 border-gray-300" />
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  alert("Erro ao autenticar com o Google");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default AuthModal;
