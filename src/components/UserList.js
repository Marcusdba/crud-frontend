import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function UserList({ onEdit }) {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await api.get("/usuarios");
      setUsers(response.data);
    } catch (error) {
      toast.error("Erro ao carregar usuários!");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      toast.success("Usuário excluído com sucesso!");
      loadUsers();
    } catch (error) {
      toast.error("Erro ao excluir usuário!");
    }
  };

  return (
    <div>
      <h2 className="mb-3">Lista de Usuários</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {user.nome} - {user.email} ({user.idade} anos)
            </span>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(user)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteUser(user._id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
