import React, { useRef, useEffect } from "react";

function ModalProduto({
  modalOpen,
  setModalOpen,
  imagem,
  nome,
  descricao,
  preco,
}) {
  const formRef = useRef(null);

  function handleOutsideClick(e) {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  }

  function closeModal(event) {
    event.stopPropagation(); // Previne conflitos de clique
    console.log("Fechando modal");
    setModalOpen(false);
  }

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [modalOpen]);

  return (
    modalOpen && (
      <div
        className="fixed inset-0 flex justify-center items-center bg-black/65 bg-opacity-50 z-50"
        onClick={closeModal} // Fecha ao clicar fora do modal
      >
        <div
          ref={formRef}
          className="max-w-md mx-auto w-full mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg relative"
          onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar no conteúdo
        >
          <button
            onClick={closeModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-2 right-1"
            title="Fechar"
          >
            &times;
          </button>
          <div id="produtos">
            <img src={imagem} alt={nome} />
            <h2>{nome}</h2>
            <p>{descricao}</p>
            <p>R$ {preco}</p>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalProduto;