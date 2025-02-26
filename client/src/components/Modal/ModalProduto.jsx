import api from "../../services/api";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function ModalProduto({ modalOpen, setModalOpen }) {
  const modalProduct = useRef();

  // Função para fechar o modal
  function closeModal() {
    console.log("Modal fechado");
    setModalOpen(false);
  }

  function handleOutsideClick(e) {
    if (modalProduct.current && !modalProduct.current.contains(e.target)) {
      setModalOpen(false);
    }
  }

  return (
    modalOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/65 bg-opacity-50 z-50">
        <div
          className="max-w-md mx-auto w-full mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg relative"
          ref={modalProduct}
        >
          <button
            onClick={() => setModalOpen(false)}
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

          <h2 className="text-2xl mt-30 font-bold mb-6 text-center text-gray-800"></h2>
          <form className="flex flex-col gap-5">
            <>
              <input
                type="text"
                placeholder="Nome"
                className="w-full text-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </>

            <input
              type="text"
              placeholder="Email"
              className="w-full text-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full text-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"></button>
          </form>

          <div className="text-center text-blue-700 mt-4">
            <p>
              Não tem uma conta?{" "}
              <span className="text-blue-700 cursor-pointer hover:underline">
                Cadastre-se
              </span>
            </p>

            <p>
              Já tem uma conta?{" "}
              <span className="text-blue-700 cursor-pointer hover:underline">
                Fazer login
              </span>
            </p>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-t-2 border-gray-300" />
              <p className="mx-4 text-gray-600">OU</p>
              <hr className="flex-1 border-t-2 border-gray-300" />
            </div>
            <div className="flex justify-center"></div>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalProduto;
