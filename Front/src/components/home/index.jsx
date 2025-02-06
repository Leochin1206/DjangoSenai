// importação das libs
import React, { useState, useEffect } from "react";
import axios from "axios";

// importação do css
import './stylesHome.css';

// importação dos icones usados
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import addIcon from '../../assets/add.svg';
import searchIcon from '../../assets/search.svg';

// impotação dos modais
import ModalProfessores from "../modalAdd";
import ModalSearch from "../modalSearch";
import ModalEdit from "../modalEdit";

export default function Home() {
    const [dados, setDados] = useState([]); // Estado para armazenar a lista de professores
    const [modalOpen, setModalOpen] = useState(false); // Estado para a abertura do modal de adição de professores
    const [modalSearch, setModalSearch] = useState(false); // Estado para a abertura do modal de pesquisa de professores
    const [modalEdit, setModalEdit] = useState(false);  // Estado para a abertura do modal de edição de professores
    const [selectedProfessorId, setSelectedProfessorId] = useState(null); // Estado para armazenar o ID do professor para edição
    const token = localStorage.getItem('token'); // Obtém o token de autenticação armazenado no localStorage

    // useEffect que executa a função de busca de professores quando o token muda
    useEffect(() => {
        if (!token) return; // Se não houver token, não faz nada

        const fetchData = async () => {
            try {
                // Realizando a requisição GET para buscar o professor pelo ID com o token
                const response = await axios.get("http://127.0.0.1:8000/api/professores", {
                    headers: { Authorization: `Bearer ${token}` }, // Envia o token para autenticação.
                });
                setDados(response.data); // Salva os dados dos professores
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
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }, // Envia o token para autorização
                });
                setDados(dados.filter(professor => professor.id !== id)); // Remove o professor da lista exibida
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openEditModal = (id) => {
        setSelectedProfessorId(id); // Salva o ID do professor que será editado
        setModalEdit(true); // Abre o modal de edição
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
                    {/* Percorre a array DADOS(que contem os dados dos Profs) e apresenta os dados */}
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
