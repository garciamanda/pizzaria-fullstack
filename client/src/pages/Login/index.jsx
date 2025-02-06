import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post("/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      localStorage.setItem("accessToken", data.accessToken);


      
      navigate("/listar-usuarios");

      return true;

      
    } catch (error) {
      alert("Senha ou email incorretos");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
      <Link
        to="/"
        className="text-blue-700 hover:underline mt-4 block text-center"
      >
        Nao possui uma conta? Cadastre-se
      </Link>
    </div>
  );
}

export default Login;
