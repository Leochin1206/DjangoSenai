import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";

export default function App() {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
