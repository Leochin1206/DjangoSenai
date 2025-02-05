import React, { useState } from "react";
import axios from "axios";
import "./stylesModal.css";

export default function ModalProfessores({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    ni: "",
    nome: "",
    email: "",
    cel: "",
    ocup: "",
  });

  const token = localStorage.getItem('token'); // Obtendo o token do localStorage

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificando se o token está presente
    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      // Enviando o token no cabeçalho da requisição
      const response = await axios.post(
        "http://127.0.0.1:8000/api/professores",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adicionando o token ao cabeçalho
          },
        }
      );

      alert("Cadastro realizado com sucesso!");
      onClose(); // Fechando o modal após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Cadastro de Professor</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="ni" 
            placeholder="NI" 
            value={formData.ni} 
            onChange={handleChange} 
            className="modal-input" 
            required 
          />
          
          <input 
            type="text" 
            name="nome" 
            placeholder="Nome" 
            value={formData.nome} 
            onChange={handleChange} 
            className="modal-input" 
            required 
          />
          
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="modal-input" 
            required 
          />
          
          <input 
            type="tel" 
            name="cel" 
            placeholder="Celular" 
            value={formData.cel} 
            onChange={handleChange} 
            className="modal-input" 
            required 
          />
          
          <input 
            type="text" 
            name="ocup" 
            placeholder="Ocupação" 
            value={formData.ocup} 
            onChange={handleChange} 
            className="modal-input" 
            required 
          />
          
          <div className="modal-buttons">
            <button type="submit" className="btnSave">Salvar</button>
            <button type="button" onClick={onClose} className="btnCancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
