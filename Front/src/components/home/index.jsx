import React, { useState, useEffect } from "react"
import axios from "axios"
import './stylesHome.css'

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

    return (
        <div className="PagHome">
            <h1>Lista de Professores</h1>
            {dados.map((professor, index) => (
                <div className="boxProf">
                    <h2>{professor.nome}</h2>
                </div>    
            ))}
        </div>
    );
}