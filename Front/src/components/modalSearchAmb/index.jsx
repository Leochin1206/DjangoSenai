// importação das libs
import React, { useState } from "react";
import axios from "axios";

// importação do css
import "../modalAddAmb/stylesModalAmb.css";

export default function ModalSearchAmb({ isOpen, onClose }) {
    if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada.

    const [formData, setFormData] = useState({ // Cria o estado para armazenar o ID do professor a ser buscado
        id: "",
    });

    const [searchResult, setSearchResult] = useState(null); // Cria o estado para armazenar o resultado da busca

    const token = localStorage.getItem('token');  // Pega o token de autenticação do localStorage.

    // [e.target.name] acessa o atributo name do elemento (input) que disparou o evento
    // [e.target.value] é o valor atual do campo de input
    const handleChange = (e) => {
        // Atualiza os dados quando há alteração em um campo
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página).

        try {
            // Realizando a requisição GET para buscar o professor pelo ID com o token
            const response = await axios.get(`http://127.0.0.1:8000/api/ambi/id/${formData.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Envia o token para autenticação.
                },
            });
            setSearchResult(response.data); // Armazena os dados do Professor
        } catch (error) {
            console.error("Erro ao buscar professor:", error);
            alert("Erro ao buscar professor.");
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-content-search">
                <h2>Pesquisa de Ambiente</h2>
                {/* Ao clicar em "Pesquisar", a função handleSubmit será executada */}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleChange} className="modal-input" required />

                    {searchResult && (
                        <div className="search-result">

                            <h3>Resultado da Pesquisa:</h3>

                            <div className="pSearch">
                                <p>ID: {searchResult.id}</p>
                                <p>Sala: {searchResult.sala}</p>
                            </div>

                            <div className="pSearch">
                                <p>Professor Responsavel: {searchResult.prof_responsavel}</p>
                                <p>Capacidade: {searchResult.capacidade}</p>
                            </div>

                            <div className="pSearch">
                                <p>Linha Atendimento: {searchResult.linha_atendimento}</p>
                                <p>Curso: {searchResult.curso}</p>
                            </div>

                            <div className="pSearch">
                                <p>Materia: {searchResult.materia}</p>
                                <p>Periodo: {searchResult.periodo}</p>
                            </div>

                            <div className="pSearch">
                                <p>Inicio: {searchResult.inicio}</p>
                                <p>Fim: {searchResult.fim}</p>
                            </div>
                        </div>
                    )}

                    <div className="modal-buttons">
                        <button type="submit" className="btnSave">Pesquisar</button>
                        <button type="button" onClick={onClose} className="btnCancel">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
