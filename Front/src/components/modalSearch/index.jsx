import React, { useState } from "react";
import axios from "axios";
import "../modalAdd/stylesModal.css";

export default function ModalSearch({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        id: "",
    });
    const [searchResult, setSearchResult] = useState(null); // Para armazenar o resultado da busca

    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realizando a requisição GET para buscar o professor pelo ID com o token no cabeçalho
            const response = await axios.get(`http://127.0.0.1:8000/api/id/${formData.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Passando o token no cabeçalho
                },
            });
            setSearchResult(response.data); // Armazenando o resultado da busca
        } catch (error) {
            console.error("Erro ao buscar professor:", error);
            alert("Erro ao buscar professor.");
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h2>Pesquisa de Professor</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={formData.id}
                        onChange={handleChange}
                        className="modal-input"
                        required
                    />

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
