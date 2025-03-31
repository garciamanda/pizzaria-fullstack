import React, { useRef, useEffect, useState } from "react";
import "./ModalProduto.css";
import Modalbutton from "../modalbuton/Modalbotão";

function ModalProduto({
  modalOpen,
  setModalOpen,
  imagem,
  nome,
  descricao, 
  preco,
}) {
  const formRef = useRef(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [message, setMessage] = useState("escolha até 10 opções");
  const [quantity, setQuantity] = useState(1); // Estado para controlar a quantidade

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
      document.body.classList.add("modal-open");
      console.log("abrindo modal")
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.body.classList.remove("modal-open");
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [modalOpen]);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSelectedCount((prevCount) => {
      const newCount = checked ? prevCount + 1 : prevCount - 1;
      if (newCount > 10) {
        setMessage("você escolheu mais que 10 opções");
      } else {
        setMessage("escolha até 10 opções");
      }
      return newCount;
    });
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    modalOpen && (
      <div
        className="fixed inset-0 flex justify-center items-center bg-black/65 bg-opacity-50 z-50"
        onClick={closeModal} // Fecha ao clicar fora do modal
      >
        <div
          ref={formRef}
          className="w-[60rem] h-[39rem] mt-10 bg-white border border-gray-300 rounded-lg shadow-lg relative flex"
          onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar no conteúdo
        >
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
          <div
            className="flex flex-col w-2/3 border-l border-gray-300"
            id="produtos"
          >
            <div
              className="bg-gray-200 p-3 h-[4rem] rounded-tr-lg mb-[-20px]"
              id="nome"
            >
              <h2 className="text-1xl text-[#666666] font-bold">Produtos</h2>
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
            <div
              id="ingrediente-escolha"
              className="bg-gray-200 p-3 h-[5rem] border-t border-b border-gray-300"
            >
              <h2 className="text-1xl text-[#141414] font-bold">
                Igredientes adicionais
              </h2>
              <p
                className={`text-[14px] font-serif ${
                  selectedCount > 10 ? "text-red-500" : "text-[#666666]"
                } opacity-80`}
              >
                {message}
              </p>
            </div>
            <div
              id="ingrediente"
              className="ingrediente border-b border-gray-300 h-[19rem] leading-[2.2rem] p-[1rem] m-[rem] bg-gray-100 overflow-y-auto"
            >
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente1">Cebola</label>
                <input
                  type="checkbox"
                  id="ingrediente1"
                  name="ingrediente1"
                  value="ingrediente1"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente2">Tomate</label>
                <input
                  type="checkbox"
                  id="ingrediente2"
                  name="ingrediente2"
                  value="ingrediente2"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente3">Queijo</label>
                <input
                  type="checkbox"
                  id="ingrediente3"
                  name="ingrediente3"
                  value="ingrediente3"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente4">Presunto</label>
                <input
                  type="checkbox"
                  id="ingrediente4"
                  name="ingrediente4"
                  value="ingrediente4"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente5">Azeitona</label>
                <input
                  type="checkbox"
                  id="ingrediente5"
                  name="ingrediente5"
                  value="ingrediente5"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente6">Pimentão</label>
                <input
                  type="checkbox"
                  id="ingrediente6"
                  name="ingrediente6"
                  value="ingrediente6"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente7">Milho</label>
                <input
                  type="checkbox"
                  id="ingrediente7"
                  name="ingrediente7"
                  value="ingrediente7"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente8">Bacon</label>
                <input
                  type="checkbox"
                  id="ingrediente8"
                  name="ingrediente8"
                  value="ingrediente8"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente9">Frango</label>
                <input
                  type="checkbox"
                  id="ingrediente9"
                  name="ingrediente9"
                  value="ingrediente9"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente10">Calabresa</label>
                <input
                  type="checkbox"
                  id="ingrediente10"
                  name="ingrediente10"
                  value="ingrediente10"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente11">Palmito</label>
                <input
                  type="checkbox"
                  id="ingrediente11"
                  name="ingrediente11"
                  value="ingrediente11"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="ingrediente12">Champignon</label>
                <input
                  type="checkbox"
                  id="ingrediente12"
                  name="ingrediente12"
                  value="ingrediente12"
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            <div id="quantidade/botão" className="flex justify-center items-center space-x-2 h-[4.9rem] ml-[4.6rem]">
                <button onClick={decrementQuantity} className="bg-gray-200 rounded px-6 h-[3.4rem]">
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button onClick={incrementQuantity} className="bg-gray-200 rounded px-6 h-[3.4rem]">
                  +
                </button>
                <Modalbutton />
              </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalProduto;