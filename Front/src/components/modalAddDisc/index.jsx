// importação das libs
import React, { useState } from "react";
import axios from "axios";

// importação do css
import "./stylesModalDisc.css";

export default function ModalProfessoresDisc({ isOpen, onClose }) {
  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada.

  const [formData, setFormData] = useState({ // Estado para armazenar os dados do Professor
    disciplina: "",
    sigla: "",
    curso: "",
    semestre: "",
    carga_horaria: "",
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
      const response = await axios.post("http://127.0.0.1:8000/api/disciplina", formData, {
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

          <input type="text" name="disciplina" placeholder="Disciplina" value={formData.disciplina} onChange={handleChange} className="modal-input" required />

          <input type="text" name="sigla" placeholder="Sigla" value={formData.sigla} onChange={handleChange} className="modal-input" required />

          <input type="text" name="curso" placeholder="Curso" value={formData.curso} onChange={handleChange} className="modal-input" required />

          <input type="number" name="semestre" placeholder="Semestre" value={formData.semestre} onChange={handleChange} className="modal-input" required />

          <input type="number" name="carga_horaria" placeholder="Carga Horária" value={formData.carga_horaria} onChange={handleChange} className="modal-input" required />

          <div className="modal-buttons">
            <button type="submit" className="btnSave">Salvar</button>
            <button type="button" onClick={onClose} className="btnCancel">Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}
