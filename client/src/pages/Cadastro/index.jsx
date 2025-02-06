import { useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/cadastro", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      alert("Cadastro realizado com sucesso");
    } catch (error) {
      alert("Erro ao cadastrar");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Cadastro
      </h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="nome"
          className="w-full  px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          ref={nameRef}
        />
        <input
          type="text"
          placeholder="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="senha"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          ref={passwordRef}
        />
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Cadastrar
        </button>
      </form>
      <Link
        to="/login"
        className="text-blue-700 hover:underline mt-4 block text-center"
      >
        Já tem conta? Faça login
      </Link>
    </div>
  );
}

export default Cadastro;
