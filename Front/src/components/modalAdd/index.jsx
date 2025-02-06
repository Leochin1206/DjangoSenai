// importação das libs
import React, { useState } from "react";
import axios from "axios";

// importação do css
import "./stylesModal.css";

export default function ModalProfessores({ isOpen, onClose }) {
  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada.

  const [formData, setFormData] = useState({ // Estado para armazenar os dados do Professor
    ni: "",
    nome: "",
    email: "",
    cel: "",
    ocup: "",
  });

  const token = localStorage.getItem('token');  // Pega o token de autenticação do localStorage.

  // [e.target.name] acessa o atributo name do elemento (input) que disparou o evento
  // [e.target.value] é o valor atual do campo de input
  const handleChange = (e) => {
    // Atualiza os dados quando há alteração em um campo.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página).

    if (!token) { // Verificando se o token está presente
      alert("Token não encontrado. Faça login novamente.");
      return; // Interrompe a execução da função e não prossegue.
    }

    try {
      // Realizando a requisição POST para cadastrar um novo professor
      const response = await axios.post("http://127.0.0.1:8000/api/professores", formData, { 
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token para autenticação.
        },
      }
      );

      alert("Cadastro realizado com sucesso!"); // Exibe um alerta que o cadastro foi realizado com sucesso.
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
        {/* Ao clicar em "Salvar", a função handleSubmit será executada */}
        <form onSubmit={handleSubmit}>

          <input type="text" name="ni" placeholder="NI" value={formData.ni} onChange={handleChange} className="modal-input" required />

          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="modal-input" required />

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="modal-input" required />

          <input type="tel" name="cel" placeholder="Celular" value={formData.cel} onChange={handleChange} className="modal-input" required />

          <input type="text" name="ocup" placeholder="Ocupação" value={formData.ocup} onChange={handleChange} className="modal-input" required />

          <div className="modal-buttons">
            <button type="submit" className="btnSave">Salvar</button>
            <button type="button" onClick={onClose} className="btnCancel">Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}
