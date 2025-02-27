import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../layouts/sidebar";
import { cn } from "../../utils/cn";
import { Header } from "../../layouts/header";

// Criando a pagina de admin para o admin

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const userRole = localStorage.getItem("userRole");

  //   if (userRole !== "admin") {
  //     navigate("/");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [navigate]);

  // if (loading) {
  //   return <div>Carregando...</div>;
  // }

  return (
    <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
      <Sidebar />
      <div className={cn("transition-[margin] duration-300")}>
        <Header />
        <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
