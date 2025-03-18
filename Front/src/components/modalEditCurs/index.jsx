// importação das libs
import React, { useState, useEffect } from "react";
import axios from "axios";

// importação do css
import "../modalAddCurs/stylesModalCurs.css";

export default function ModalEditCurs({ isOpen, onClose, cursoId }) {
  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada.

  const [formData, setFormData] = useState({
    nome: "",
    sigla: "",
    tipo_de_curso: "",
    carga_horaria_curso: "",
  });

  const token = localStorage.getItem('token'); // Pega o token de autenticação do localStorage.

  useEffect(() => {
    if (cursoId) { // Se um ID de professor foi passado, busca os dados desse professor.
      const fetchCurso = async () => {
        try {
          // Realizando a requisição GET para buscar o professor pelo ID com o token
          const response = await axios.get(`http://127.0.0.1:8000/api/curs/id/${cursoId}`, { 
            headers: {
              Authorization: `Bearer ${token}`, // Envia o token para autenticação.
            },
          });
          setFormData(response.data); // Atualiza o estado com os dados do professor.
        } catch (error) {
          console.error("Erro ao buscar professor:", error);
        }
      };

      fetchCurso(); // Chama a função para buscar os dados.
    }
  }, [cursoId, token]); // O efeito é executado quando professorId ou token mudam.


  // [e.target.name] acessa o atributo name do elemento (input) que disparou o evento
  // [e.target.value] é o valor atual do campo de input
  const handleChange = (e) => {
    // Atualiza os dados quando há alteração em um campo.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página).

    try {
      // Realizando a requisição PUT para atualizar os dados do professor identificado por professorId
      await axios.put(`http://127.0.0.1:8000/api/curs/id/${cursoId}`, formData, { 
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token para autenticação.
        },
      });
      alert("Dados atualizados com sucesso!"); // Exibe uma mensagem de sucesso.
      onClose(); // Fecha o modal.
    } catch (error) {
      console.error("Erro ao editar professor:", error);
      alert("Erro ao editar professor.");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Editar Dados do Curso</h2>
        {/* Ao clicar em "Salvar", a função handleSubmit será executada */}
        <form onSubmit={handleSubmit}>

          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="modal-input" required />

          <input type="text" name="sigla" placeholder="Sigla" value={formData.sigla} onChange={handleChange} className="modal-input" required />

          <input type="text" name="tipo_de_curso" placeholder="Tipo de Curso" value={formData.tipo_de_curso} onChange={handleChange} className="modal-input" required />

          <input type="number" name="carga_horaria_curso" placeholder="Carga Horaria" value={formData.carga_horaria_curso} onChange={handleChange} className="modal-input" required />

          <div className="modal-buttons">
            <button type="submit" className="btnSave">Salvar</button>
            <button type="button" onClick={onClose} className="btnCancel">Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}
