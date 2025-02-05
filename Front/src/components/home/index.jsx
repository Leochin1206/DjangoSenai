import React, { useState, useEffect } from "react";
import axios from "axios";
import './stylesHome.css';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import addIcon from '../../assets/add.svg';
import searchIcon from '../../assets/search.svg';
import ModalProfessores from "../modalAdd";
import ModalSearch from "../modalSearch";
import ModalEdit from "../modalEdit";

export default function Home() {
    const [dados, setDados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSearch, setModalSearch] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [selectedProfessorId, setSelectedProfessorId] = useState(null); 
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/professores", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDados(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [token]);

    const del = async (id) => {
        if (window.confirm("Tem certeza?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDados(dados.filter(professor => professor.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openEditModal = (id) => {
        setSelectedProfessorId(id); 
        setModalEdit(true);
    };

    return (
        <>
            <div className="PagHome">
                <div className="navBar"></div>
                <h1>Lista de Professores</h1>
                <div className="functions">
                    <img src={addIcon} className="add" onClick={() => setModalOpen(true)} />
                    <img src={searchIcon} className="search" onClick={() => setModalSearch(true)} />
                </div>
                <ModalProfessores isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                <ModalSearch isOpen={modalSearch} onClose={() => setModalSearch(false)} />
                <div className="boxMain">
                    {dados.map((professor) => (
                        <div key={professor.id} className="lista">
                            <h2>ID {professor.id}</h2>
                            <h2>Prof. {professor.nome}</h2>
                            <div className="boxProf">
                                <img src={editIcon} className="edit" onClick={() => openEditModal(professor.id)} />
                                <img src={deleteIcon} className="delete" onClick={() => del(professor.id)} />
                            </div>
                        </div>
                    ))}
                </div>
                <ModalEdit isOpen={modalEdit} onClose={() => setModalEdit(false)} professorId={selectedProfessorId} />
            </div>
        </>
    );
}
