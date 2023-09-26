import React, { useState } from 'react';
import Dropdowns from './Dropdowns';
import Footer from "./Footer";
import Header from "./Header";
import CadastroPessoa from "./CadastroPessoa";
import './App.css'
import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import FiltroPessoas from "./FiltroPessoas";
import ListaDePessoas from "./ListaDePessoas";
import ListaVenda from "./ListaVenda";

function App() {
    const [inputValue1, setInputValue1] = useState('Cadastro');
    const [inputValue2, setInputValue2] = useState('Movimentos');
    const [inputValue3, setInputValue3] = useState('Relatórios');
    const listItemWidth = '215px';

    return (
        <Router>
            <div>
                <Header />
                <div className="combobox-container">
                    <Dropdowns
                        options={['Bairros', 'Cidades', 'Pessoas', 'Produtos']}
                        listItemWidth={listItemWidth}
                        defaultValue={inputValue1}
                        inputValue={inputValue1}
                        setInputValue={setInputValue1}
                    />

                    <Dropdowns
                        options={['Vendas']}
                        listItemWidth={listItemWidth}
                        defaultValue={inputValue2}
                        inputValue={inputValue2}
                        setInputValue={setInputValue2}
                    />

                    <Dropdowns
                        options={['Filtro de pessoas', 'Lista de vendas']}
                        listItemWidth={listItemWidth}
                        defaultValue={inputValue3}
                        inputValue={inputValue3}
                        setInputValue={setInputValue3}
                    />

                    <Routes>
                        <Route path="/bairros" element={<h1>bairros</h1>} />
                        <Route path="/cidades" element={<h1>cidades</h1>} />
                        <Route path="/pessoas" element={<CadastroPessoa />} />
                        <Route path="/produtos" element={<h1>produtos</h1>} />
                        <Route path="/vendas" element={<h1>Vendas</h1>} />
                        <Route
                            path="/filtro de pessoas"
                            element={<FiltroPessoas />}
                        />
                        <Route
                            path="/lista de pessoas"
                            element={<ListaDePessoas />}
                        />
                        <Route path="/lista de vendas" element={<ListaVenda />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </Router>
    );
}

export default App;