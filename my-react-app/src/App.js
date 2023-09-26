import React, {useEffect, useRef, useState} from 'react';
import Dropdowns from './Dropdowns';
import Footer from "./Footer";
import Header from "./Header";
import CadastroPessoa from "./Cadastros/CadastroPessoa";
import './App.css'
import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import FiltroPessoas from "./Listas/FiltroPessoas";
import ListaDePessoas from "./Listas/ListaDePessoas";
import ListaVenda from "./Listas/ListaVenda";
import Venda from "./Cadastros/Venda";
import CadastroBairro from "./Cadastros/CadastroBairro";
import ListaBairros from "./Listas/ListaBairros";

function App() {
    const [inputValue1, setInputValue1] = useState('Cadastro');
    const [inputValue2, setInputValue2] = useState('Movimentos');
    const [inputValue3, setInputValue3] = useState('Relatórios');
    const listItemWidth = '215px';
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const screenHeight = window.innerHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            const footerHeight = document.querySelector('footer').offsetHeight;
            const minimumHeight = screenHeight - headerHeight - footerHeight;
            container.style.minHeight = `${minimumHeight}px`;
        }
    }, []);

    return (
        <Router>
            <div>
                <Header />
                <div className="combobox-container" ref={containerRef}>
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
                        <Route path="/bairros" element={<CadastroBairro />} />
                        <Route path="/cidades" element={<h1>cidades</h1>} />
                        <Route path="/pessoas" element={<CadastroPessoa />} />
                        <Route path="/produtos" element={<h1>produtos</h1>} />
                        <Route path="/vendas" element={<Venda />} />
                        <Route
                            path="/lista de bairros"
                            element={<ListaBairros />}
                        />
                        <Route
                            path="/filtro de pessoas"
                            element={<FiltroPessoas />}
                        />
                        <Route
                            path="/lista de pessoas"
                            element={<ListaDePessoas />}
                        />
                        <Route
                            path="/lista de vendas"
                            element={<ListaVenda />}
                        />
                    </Routes>
                </div>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
