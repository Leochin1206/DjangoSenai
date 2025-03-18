import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Ambientes from "./components/ambientes"
import Cursos from "./components/cursos";
import Disciplinas from "./components/disciplinas";

export default function App() {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Disciplinas" element={<Disciplinas />}/>
                <Route path="/Ambientes" element={<Ambientes />} />
                <Route path="/Cursos" element={<Cursos />}/>
            </Routes>
        </BrowserRouter>
    );
}
