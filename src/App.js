import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./index.css";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const handleSave = () => {
    setSelectedUser(null);
    window.location.reload();
  };

  // Alternar dark mode e salvar no localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="container py-4">
      {/* Ícone fixo para alternar tema */}
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <h1 className="text-center mb-4">CRUD de Usuários - Frontend</h1>
      <UserForm selectedUser={selectedUser} onSave={handleSave} />
      <UserList onEdit={setSelectedUser} />
    </div>
  );
}

export default App;
