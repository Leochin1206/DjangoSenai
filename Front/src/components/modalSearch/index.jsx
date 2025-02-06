// importação das libs
import React, { useState } from "react";
import axios from "axios";

// importação do css
import "../modalAdd/stylesModal.css";

export default function ModalSearch({ isOpen, onClose }) {
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
            const response = await axios.get(`http://127.0.0.1:8000/api/id/${formData.id}`, {
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
                <h2>Pesquisa de Professor</h2>
                {/* Ao clicar em "Pesquisar", a função handleSubmit será executada */}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleChange} className="modal-input" required />

                    {searchResult && (
                        <div className="search-result">
                            <h3>Resultado da Pesquisa:</h3>
                            <p>ID: {searchResult.id}</p>
                            <p>Nome: {searchResult.nome}</p>
                            <p>Email: {searchResult.email}</p>
                            <p>Celular: {searchResult.cel}</p>
                            <p>Ocupação: {searchResult.ocup}</p>
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
