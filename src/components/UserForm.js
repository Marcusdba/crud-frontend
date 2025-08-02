import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function UserForm({ selectedUser, onSave }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setNome(selectedUser.nome);
      setEmail(selectedUser.email);
      setIdade(selectedUser.idade);
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await api.put(`/usuarios/${selectedUser._id}`, { nome, email, idade });
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await api.post("/usuarios", { nome, email, idade });
        toast.success("Usuário criado com sucesso!");
      }

      // Limpa o formulário e recarrega a lista
      setNome("");
      setEmail("");
      setIdade("");
      onSave();
    } catch (error) {
      toast.error("Erro ao salvar usuário!");
      console.error("Erro ao salvar usuário:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="mb-3">{selectedUser ? "Editar Usuário" : "Novo Usuário"}</h2>
      <div className="row g-2 mb-2">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {selectedUser ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
}
