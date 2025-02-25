import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function User() {
  // só pode acessar essa pagina se o user estiver logado
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (!userRole) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }
  return <div className="mt-50">User</div>;
}

export default User;
