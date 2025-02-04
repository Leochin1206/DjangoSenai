import React, { useState } from "react";
import axios from "axios";

const ModalProfessores = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    ni: "",
    nome: "",
    email: "",
    cel: "",
    ocup: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/professores", formData);
      alert("Cadastro realizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Cadastro de Professor</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="ni" placeholder="NI" value={formData.ni} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <input type="tel" name="cel" placeholder="Celular" value={formData.cel} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <input type="text" name="ocup" placeholder="Ocupação" value={formData.ocup} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProfessores;