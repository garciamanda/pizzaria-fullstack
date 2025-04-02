import React, { useRef, useEffect, useState } from "react";
import "./ModalProduto.css"; // Certifique-se de que o estilo está correto
import Modalbutton from "../modalbuton/Modalbotão";

function ModalEntradas({
  modalEntradasOpen,
  setModalEntradasOpen,
  imagem,
  nome,
  descricao,
  preco,
}) {
  const formRef = useRef(null);
  const [observacao, setObservacao] = useState(""); // Estado para controlar a observação
  const [quantidade, setQuantidade] = useState(1); // Estado para controlar a quantidade

  // Fecha o modal ao clicar fora dele
  function handleOutsideClick(e) {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setModalEntradasOpen(false);
    }
  }

  // Fecha o modal ao clicar no botão de fechar
  function closeModal(event) {
    event.stopPropagation(); // Previne conflitos de clique
    setModalEntradasOpen(false);
  }

  // Adiciona e remove o evento de clique fora do modal
  useEffect(() => {
    if (modalEntradasOpen) {
      document.body.classList.add("modal-open");
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.body.classList.remove("modal-open");
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [modalEntradasOpen]);

  // Funções para aumentar e diminuir a quantidade
  const aumentarQuantidade = () => setQuantidade((prev) => prev + 1);
  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade((prev) => prev - 1);
  };

  return (
    modalEntradasOpen && (
      <div
        className="fixed inset-0 flex justify-center items-center bg-black/65 bg-opacity-50 z-50"
        onClick={closeModal} // Fecha ao clicar fora do modal
      >
        <div
          ref={formRef}
          className="w-[60rem] h-[27rem] mt-10 bg-white border border-gray-300 rounded-lg shadow-lg relative flex"
          onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar no conteúdo
        >
          {/* Imagem do produto */}
          <button
            onClick={closeModal}
            className="hover:text-red-700 size-0.5 text-black font-bold py-2 px-4 rounded absolute top-[-0rem] right-1"
            title="Fechar"
          >
            &times;
          </button>
          <div
            className="m-3 flex flex-col justify-center items-center w-1/2"
            id="imagem"
          >
            <img
              className="max-h-full max-w-full h-[22rem] rounded-xl"
              src={imagem}
              alt={nome}
            />
          </div>

          {/* Informações do produto */}
          <div
            className="flex flex-col w-2/3 border-l border-gray-300"
            id="produtos"
          >
            <div
              className="bg-gray-200 p-3 rounded-tr-lg mb-[-16px]"
              id="nome"
            >
              <h2 className="text-1xl text-[#666666] font-bold">Entradas</h2>
            </div>
            <div
              className="bg-white p-2 rounded-t-[1.5rem] z-[1] border-t border-gray-300 top-[14.4rem] w-[35rem]"
              id="descricao"
            >
              <h2 className="text-2xl font-bold text-[#141414] text-center">
                {nome}
              </h2>
              <p className="text-[13.7px] px-2 text-[#666666] tracking-[-1px] opacity-75">
                {descricao}
              </p>
              <p className="text-[17px] px-2 text-[#141414]">R$ {preco}</p>
            </div>

            {/* Campo de observação */}
            <div
              id="observacao"
              className="bg-gray-100 p-3 h-[30rem] border-t border-b border-gray-300"
            >
              <h2 className="text-1xl text-[#141414] font-bold">
                Alguma observação?
              </h2>
              <input
                type="text"
                className="h-[9rem] w-full p-2 border border-gray-300 rounded"
                placeholder="Digite aqui sua observação"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>

            {/* Contador de quantidade */}
            <div
              id="quantidade-e-botao"
              className="flex justify-between items-center space-x-4 h-[4.9rem] ml-[4.6rem]"
            >
              {/* Contador de quantidade */}
              <div
                id="quantidade"
                className="flex justify-center items-center space-x-3 h-[4rem]"
              >
                <button
                  onClick={diminuirQuantidade}
                  className="bg-gray-200 rounded px-6 h-[3.4rem] font-bold"
                >
                  -
                </button>
                <span className=" font-bold">{quantidade}</span>
                <button
                  onClick={aumentarQuantidade}
                  className="bg-gray-200 rounded px-6 h-[3.4rem] font-bold"
                >
                  +
                </button>
              </div>

              {/* Botão de ação */}
              <div id="botao" className="p-[1rem]">
                <Modalbutton />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalEntradas;
