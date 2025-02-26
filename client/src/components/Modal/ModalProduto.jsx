import api from "../../services/api";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Produto from "../Produto/Produto";

function ModalProduto({ modalOpen, setModalOpen, imagem }) {
  function closeModal() {
    setModalOpen(false);
  }

  
  return (
    modalOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/65 bg-opacity-50 z-50">
        <div className="max-w-md mx-auto w-full mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg relative">
          <div id="produtos">
            <img src={imagem} alt="" />
          </div>
        </div>
      </div>
    )
  );
}

export default ModalProduto;
