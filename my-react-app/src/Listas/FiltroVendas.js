import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';
import './FiltroPessoas.css'

const FiltroVendas = () => {
    const [pessoasData, setPessoasData] = useState([]); // People data
    const [produtosData, setProdutosData] = useState([]); // Product data
    const [resultados, setResultados] = useState([]);
    const [filtrosAtivos, setFiltrosAtivos] = useState(false);
    const [cidadeNomes, setCidadeNomes] = useState({});
    const [filtroDataInicial, setFiltroDataInicial] = useState('');
    const [filtroDataFinal, setFiltroDataFinal] = useState('');
    const [selectedPessoa, setSelectedPessoa] = useState('');
    const [selectedProduto, setSelectedProduto] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pessoasResponse = await fetch('http://localhost:8080/api/pessoas');
                if (!pessoasResponse.ok) {
                    console.error('Erro ao pegar os dados das pessoas');
                }
                const pessoasData = await pessoasResponse.json();
                setPessoasData(pessoasData);
            } catch (error) {
                console.error('Erro ao pegar os dados:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const produtosResponse = await fetch('http://localhost:8080/api/produtos');
                if (!produtosResponse.ok) {
                    console.error('Erro ao pegar os dados dos produtos');
                }
                const produtosData = await produtosResponse.json();
                setProdutosData(produtosData.data);
            } catch (error) {
                console.error('Erro ao pegar os dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="list-container">
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Data Inicial"
                    value={filtroDataInicial}
                    onChange={(e) => setFiltroDataInicial(e.target.value)}
                />
                <span style={{ margin: '0 5px' }}>à</span>
                <input
                    type="text"
                    placeholder="Data Final"
                    value={filtroDataFinal}
                    onChange={(e) => setFiltroDataFinal(e.target.value)}
                />

                <div className="dropdown">
                    <label className="dropdown-label">Pessoa:</label>
                    <select
                        value={selectedPessoa}
                        onChange={(e) => setSelectedPessoa(e.target.value)}
                    >
                        {pessoasData.map((pessoa) => (
                            <option key={pessoa.id_pessoa} value={pessoa.id_pessoa}>
                                {pessoa.pessoa_nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="dropdown">
                    <label className="dropdown-label">Produto:</label>
                    <select
                        value={selectedProduto}
                        onChange={(e) => setSelectedProduto(e.target.value)}
                    >
                        {produtosData.map((produto) => (
                            <option key={produto.id_produto} value={produto.id_produto}>
                                {produto.nome_produto}
                            </option>
                        ))}
                    </select>
                </div>
                <Button>
                    <FaSearch /> Filtrar
                </Button>
            </div>

            {filtrosAtivos && resultados.length > 0 ? (
                <div className="table-container">
                    <Table striped bordered hover className="table">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Telefone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resultados.map((pessoa) => (
                            <tr key={pessoa.id_pessoa}>
                                <td>{pessoa.id_pessoa}</td>
                                <td>{pessoa.pessoa_nome}</td>
                                <td>{cidadeNomes[pessoa.cidade_id]}</td>
                                <td>{pessoa.telefone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            ) : null}
        </div>
    );
};

export default FiltroVendas;
