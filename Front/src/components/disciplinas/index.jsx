// importação das libs
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// importação do css
import './stylesDisciplina.css';

// importação dos icones usados
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import addIcon from '../../assets/add.svg';
import searchIcon from '../../assets/search.svg';

// impotação dos modais
import ModalProfessoresDisc from "../modalAddDisc"
import ModalSearchDisc from "../modalSearchDisc";
import ModalEditDisc from "../modalEditDisc";

export default function Disciplinas() {
    const [dados, setDados] = useState([]); // Estado para armazenar a lista de professores
    const [modalOpen, setModalOpen] = useState(false); // Estado para a abertura do modal de adição de professores
    const [modalSearchDisc, setModalSearchDisc] = useState(false); // Estado para a abertura do modal de pesquisa de professores
    const [modalEditDisc, setModalEditDisc] = useState(false);  // Estado para a abertura do modal de edição de professores
    const [selectedDisciplinaId, setSelectedDisciplinaId] = useState(null); // Estado para armazenar o ID do professor para edição
    const token = localStorage.getItem('token'); // Obtém o token de autenticação armazenado no localStorage

    // useEffect que executa a função de busca de professores quando o token muda
    useEffect(() => {
        if (!token) return; // Se não houver token, não faz nada

        const fetchData = async () => {
            try {
                // Realizando a requisição GET para buscar o professor pelo ID com o token
                const response = await axios.get("http://127.0.0.1:8000/api/disciplina", {
                    headers: { Authorization: `Bearer ${token}` }, // Envia o token para autenticação.
                });
                setDados(response.data); // Salva os dados dos professores
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData(); // Chama a função de busca (pelo useEffect ao carregar a página)
    }, [token]); // O useEffect é ativado sempre que o token mudar

    const del = async (id) => {
        if (window.confirm("Tem certeza?")) { // Pergunta ao usuário se deseja realmente excluir
            try {
                // Realizando a requisição DELETE para apagar os dados do professor identificado por "id"
                await axios.delete(`http://127.0.0.1:8000/api/disci/id/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }, // Envia o token para autorização
                });
                setDados(dados.filter(disciplina => disciplina.id !== id)); // Remove o professor da lista exibida
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openEditModal = (id) => {
        setSelectedDisciplinaId(id); // Salva o ID do professor que será editado
        setModalEditDisc(true); // Abre o modal de edição
    };

    return (
        <>
            <div className="PagHome">
                <div className="navBar">
                    <Link to="/Home"><h1>Professores</h1></Link>
                    <Link to="/Disciplinas"><h1>Disciplinas</h1></Link>
                </div>
                <h1>Lista de Disciplinas</h1>
                <div className="functions">
                    <img src={addIcon} className="add" onClick={() => setModalOpen(true)} />
                    <img src={searchIcon} className="search" onClick={() => setModalSearchDisc(true)} />
                </div>
                <ModalProfessoresDisc isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                <ModalSearchDisc isOpen={modalSearchDisc} onClose={() => setModalSearchDisc(false)} />
                <div className="boxMain">
                    {/* Percorre a array DADOS(que contem os dados dos Profs) e apresenta os dados */}
                    {dados.map((disciplina) => (
                        <div key={disciplina.id} className="lista">
                            <h2>ID {disciplina.id}</h2>
                            <h2>{disciplina.disciplina}</h2>
                            <div className="boxProf">
                                <img src={editIcon} className="edit" onClick={() => openEditModal(disciplina.id)} />
                                <img src={deleteIcon} className="delete" onClick={() => del(disciplina.id)} />
                            </div>
                        </div>
                    ))}
                </div>
                <ModalEditDisc isOpen={modalEditDisc} onClose={() => setModalEditDisc(false)} disciplinaId={selectedDisciplinaId} />
            </div>
        </>
    );
}
