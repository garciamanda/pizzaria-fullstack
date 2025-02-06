import api from "../../services/api";
import { useEffect, useState } from "react";

function ListarUsuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("accessToken");
      const { data } = await api.get("/listar-usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(data);
    }

    loadUsers();
  }, []);

  return (
    <div className="max-x-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Lista de usuários</h2>
      <ul className="space-y-2">
        {users && users.length > 0 && users.map((user) => (
          <li key={user.id} className="bg-gray-100 p-4 rounded-md">
            <p className="font-semibold">Nome: {user.name}</p>
            <p className="font-semibold">Email:{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarUsuarios;
