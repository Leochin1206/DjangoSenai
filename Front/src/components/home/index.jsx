import React, { useState, useEffect } from "react";
import axios from "axios";

import './stylesHome.css';

import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import addIcon from '../../assets/add.svg';
import searchIcon from '../../assets/search.svg';

import ModalProfessores from "../modal";

export default function Home() {
    const [dados, setDados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token');
    console.log("TokenHome:", token);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/professores", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDados(response.data);
                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [token]);

    const edit = (id) => {
        // Função de edição, a ser implementada
    };

    const del = async (id) => {
        if (window.confirm("Tem certeza?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDados(dados.filter(professor => professor.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <div className="PagHome">
                <div className="navBar"></div>
                <h1>Lista de Professores</h1>
                <div className="functions">
                    <img src={addIcon} className="add" onClick={() => setModalOpen(true)} />
                    <img src={searchIcon} className="search" />
                </div>
                <ModalProfessores isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                <div className="boxMain">
                    {dados.map((professor) => (
                        <div key={professor.id} className="lista">
                            <h2>ID {professor.id}</h2>
                            <h2>Prof. {professor.nome}</h2>
                            <div className="boxProf">
                                <img src={editIcon} className="edit" onClick={() => edit(professor.id)} />
                                <img src={deleteIcon} className="delete" onClick={() => del(professor.id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
