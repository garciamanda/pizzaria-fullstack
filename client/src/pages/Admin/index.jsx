import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Criando a pagina de admin para o admin

function AdminPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole !== "admin") {
      if (
        window.confirm(
          "Você não tem permissão para acessar esta página. Clique em OK para voltar."
        )
      ) {
        navigate("/");
      }
    }
  }, [navigate]);

  return <div className="mt-50">Admin</div>;
}

export default AdminPage;
