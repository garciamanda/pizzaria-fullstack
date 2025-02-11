import api from "../../services/api";
import React, { useRef, useState } from "react";

import { GoogleLogin } from "@react-oauth/google";

function Modal({ modalOpen, setModalOpen, handleLogin, handleSignup }) {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const avatarRef = useRef();
  const formRef = useRef();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    handleLogin(emailRef.current.value, passwordRef.current.value);
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);

    if (avatarRef.current.files[0]) {
      formData.append("avatar", avatarRef.current.files[0]);
    }

    try {
      const { data } = await api.post("/cadastro", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleLogin(emailRef.current.value, passwordRef.current.value);
      setModalOpen(false);
    } catch (error) {
      alert("Erro ao cadastrar");
      console.error(error);
    }
  }

  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential;

      const { data } = await api.post("/auth/google", { token: googleToken });

      localStorage.setItem("accessToken", data.accessToken);

      window.location.reload();
      setModalOpen(false);
    } catch (error) {
      alert("Erro ao autenticar com o Google");
      console.error(error);
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
                <input
                  type="file"
                  placeholder="Avatar"
                  accept="image/*"
                  className="w-full text-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  ref={avatarRef}
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

export default Modal;
