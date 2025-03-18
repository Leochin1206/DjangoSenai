// importação das libs
import React, { useState, useEffect } from "react";
import axios from "axios";

// importação do css
import "../modalAddAmb/stylesModalAmb.css";

export default function ModalEditAmb({ isOpen, onClose, ambienteId }) {
  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada.

  const [formData, setFormData] = useState({
    sala: "",
    prof_responsavel: "",
    capacidade: "",
    linha_atendimento: "",
    curso: "",
    materia: "",
    periodo: "",
    inicio: "",
    fim: "",
  });

  const token = localStorage.getItem('token'); // Pega o token de autenticação do localStorage.

  useEffect(() => {
    if (ambienteId) { // Se um ID de professor foi passado, busca os dados desse professor.
      const fetchAmbiente = async () => {
        try {
          // Realizando a requisição GET para buscar o professor pelo ID com o token
          const response = await axios.get(`http://127.0.0.1:8000/api/ambi/id/${ambienteId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Envia o token para autenticação.
            },
          });
          setFormData(response.data); // Atualiza o estado com os dados do professor.
        } catch (error) {
          console.error("Erro ao buscar professor:", error);
        }
      };

      fetchAmbiente(); // Chama a função para buscar os dados.
    }
  }, [ambienteId, token]); // O efeito é executado quando professorId ou token mudam.


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
      await axios.put(`http://127.0.0.1:8000/api/ambi/id/${ambienteId}`, formData, {
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
        <h2>Editar Dados do Ambiente</h2>
        {/* Ao clicar em "Salvar", a função handleSubmit será executada */}
        <form onSubmit={handleSubmit}>

          <div className="alignInput">
            <input type="number" name="sala" placeholder="Sala" value={formData.sala} onChange={handleChange} className="modal-input" required />

            <input type="text" name="prof_responsavel" placeholder="Professor Responsavel" value={formData.prof_responsavel} onChange={handleChange} className="modal-input" required />
          </div>

          <div className="alignInput">
            <input type="number" name="capacidade" placeholder="Capacidade" value={formData.capacidade} onChange={handleChange} className="modal-input" required />

            <input type="text" name="linha_atendimento" placeholder="Linha de Atendimento" value={formData.linha_atendimento} onChange={handleChange} className="modal-input" required />
          </div>

          <div className="alignInput">
            <input type="text" name="curso" placeholder="Curso" value={formData.curso} onChange={handleChange} className="modal-input" required />

            <input type="text" name="materia" placeholder="Materia" value={formData.materia} onChange={handleChange} className="modal-input" required />
          </div>

          <div className="alignInput">
            <input type="date" name="inicio" value={formData.inicio} onChange={handleChange} className="modal-input" required />

            <input type="date" name="fim" value={formData.fim} onChange={handleChange} className="modal-input" required />
          </div>

          <div className="alignInput">
            <select name="periodo" value={formData.periodo} onChange={handleChange} className="modal-input" id="select" required>
              <option value="">Selecione o período</option>
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </select>
          </div>

          <div className="modal-buttons">
            <button type="submit" className="btnSave">Salvar</button>
            <button type="button" onClick={onClose} className="btnCancel">Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}
