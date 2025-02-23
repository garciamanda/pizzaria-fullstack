import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Criando a pagina de admin para o admin

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole !== "admin") {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return <div className="mt-50">Admin</div>;
}

export default AdminPage;
