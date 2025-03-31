import React, { useState } from "react";
import ModalProduto from "../Modal/ModalProduto";

function Produto({ imagem, nome, descricao, preco, onClick }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className="cardapio-content m-0 p-3 flex border border-gray-300 rounded-lg bg-white shadow-md max-w-[400px] gap-4"
      onClick={onClick || (() => setModalOpen(true))} // Usa onClick se fornecido, caso contrário, abre o ModalProduto
    >
      <img
        src={imagem}
        alt={nome}
        className="img-cardapio mt-8 w-20 h-20 rounded-lg object-cover mr-4"
      />
      <div className="detalhes flex-1">
        <p className="nome-cardapio text-base font-bold mb-2 text-gray-800">
          {nome}
        </p>
        {descricao && <p className="text-sm text-gray-500 mb-3">{descricao}</p>}

        <div className="preco">
          <p className="preco-cardapio text-[15px] font-bold">R$ {preco}</p>
        </div>
      </div>
      <ModalProduto
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        imagem={imagem}
        nome={nome}
        descricao={descricao}
        preco={preco}
      />
    </div>
  );
}

export default Produto;
