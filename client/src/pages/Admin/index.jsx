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

  return (
    <h1>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus aspernatur provident ratione saepe exercitationem neque consectetur aut quam! Eos, sed quaerat adipisci amet inventore quibusdam corrupti eaque minus cumque praesentium!
    </h1>
  )
}

export default AdminPage;
