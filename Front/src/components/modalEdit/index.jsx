import React, { useState, useEffect } from "react";
import axios from "axios";
import "../modalAdd/stylesModal.css";

export default function ModalEdit({ isOpen, onClose, professorId }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    ni: "",
    nome: "",
    email: "",
    cel: "",
    ocup: "",
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (professorId) {
      const fetchProfessor = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/id/${professorId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFormData(response.data);
        } catch (error) {
          console.error("Erro ao buscar professor:", error);
        }
      };

      fetchProfessor();
    }
  }, [professorId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/id/${professorId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Dados atualizados com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao editar professor:", error);
      alert("Erro ao editar professor.");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Editar Dados do Professor</h2>
        <form onSubmit={handleSubmit}>

          <input type="text" name="ni" placeholder="NI" value={formData.ni} onChange={handleChange} className="modal-input" required />

          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="modal-input" required />

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="modal-input" required />

          <input type="tel" name="cel" placeholder="Celular" value={formData.cel} onChange={handleChange} className="modal-input" required />

          <input type="text" name="ocup" placeholder="Ocupação" value={formData.ocup} onChange={handleChange} className="modal-input" required/>

          <div className="modal-buttons">
            <button type="submit" className="btnSave">Salvar</button>
            <button type="button" onClick={onClose} className="btnCancel">Cancelar</button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
