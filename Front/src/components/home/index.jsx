import React, { useState, useEffect } from "react"
import axios from "axios"
import './stylesHome.css'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import addIcon from '../../assets/add.svg'
import searchIcon from '../../assets/search.svg'

export default function Home() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    console.log("TokenHome:", token)

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
    }, []);

    const edit = (id) => {

    }

    return (
        <>
            <div className="PagHome">
                <div className="navBar"></div>
                <h1>Lista de Professores</h1>
                <div className="functions">
                    <img src={addIcon} className="add"/>
                    <img src={searchIcon} className="search"/>
                </div>
                <div className="boxMain">
                    {dados.map((professor) => (
                        <div key={professor.id} className="lista">
                            <div className="boxProf">
                                <img src={editIcon} className="edit" onClick={()=>edit(professor.id)}/>
                                <img src={deleteIcon} className="delete" onClick={()=>del(professor.id)}/>
                            </div>
                            <h2>{professor.nome}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}