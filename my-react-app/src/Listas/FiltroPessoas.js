import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';
import './FiltroPessoas.css';

const FiltroVendas = () => {
    const [filtroDataInicial, setFiltroDataInicial] = useState('');
    const [filtroDataFinal, setFiltroDataFinal] = useState('');
    const [selectedPessoa, setSelectedPessoa] = useState('');
    const [selectedProduto, setSelectedProduto] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filtrosAtivos, setFiltrosAtivos] = useState(false);
    const [vendasData, setVendasData] = useState([]);
    const [pessoaNomes, setPessoaNomes] = useState({});
    const [produtoNomes, setProdutoNomes] = useState({});

    // Function to fetch pessoa name by ID
    async function fetchPessoaNome(id_pessoa) {
        try {
            const response = await fetch(`http://localhost:8080/api/pessoas/${id_pessoa}`);
            if (response.ok) {
                const data = await response.json();
                setPessoaNomes((prevPessoaNomes) => ({
                    ...prevPessoaNomes,
                    [id_pessoa]: data.data.pessoa_nome,
                }));
                return data.data.pessoa_nome;
            } else {
                console.error('Erro ao pegar pessoa_nome');
                return null;
            }
        } catch (error) {
            console.error('Erro ao pegar pessoa_nome:', error);
            return null;
        }
    }

    // Function to fetch produto name by ID
    async function fetchProdutoNome(id_produto) {
        try {
            const response = await fetch(`http://localhost:8080/api/produtos/${id_produto}`);
            if (response.ok) {
                const data = await response.json();
                setProdutoNomes((prevProdutoNomes) => ({
                    ...prevProdutoNomes,
                    [id_produto]: data.data.nome_produto,
                }));
                return data.data.nome_produto;
            } else {
                console.error('Erro ao pegar nome_produto');
                return null;
            }
        } catch (error) {
            console.error('Erro ao pegar nome_produto:', error);
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vendasResponse = await fetch('http://localhost:8080/api/vendas');
                if (!vendasResponse.ok) {
                    console.error('Falha em pegar os dados');
                }
                const vendasData = await vendasResponse.json();
                setVendasData(vendasData);

                const promises = vendasData.map(async (venda) => {
                    const idPessoa = venda.pessoa_id;
                    const idProduto = venda.produto_id;

                    // Fetch and set pessoaNomes
                    if (!pessoaNomes[idPessoa]) {
                        const pessoaNome = await fetchPessoaNome(idPessoa);
                        setPessoaNomes((prevPessoaNomes) => ({
                            ...prevPessoaNomes,
                            [idPessoa]: pessoaNome,
                        }));
                    }

                    // Fetch and set produtoNomes
                    if (!produtoNomes[idProduto]) {
                        const produtoNome = await fetchProdutoNome(idProduto);
                        setProdutoNomes((prevProdutoNomes) => ({
                            ...prevProdutoNomes,
                            [idProduto]: produtoNome,
                        }));
                    }
                });

                await Promise.all(promises);
            } catch (error) {
                console.error('Erro ao pegar os dados:', error);
            }
        };

        fetchData();
    }, []);

    const filterData = () => {
        const filteredVendas = vendasData.filter((venda) => {
            const dataInicialMatch = filtroDataInicial.trim() === '' || new Date(venda.data_venda) >= new Date(filtroDataInicial);
            const dataFinalMatch = filtroDataFinal.trim() === '' || new Date(venda.data_venda) <= new Date(filtroDataFinal);
            const pessoaMatch = selectedPessoa.trim() === '' || venda.pessoa_id === parseInt(selectedPessoa);
            const produtoMatch = selectedProduto.trim() === '' || venda.produto_id === parseInt(selectedProduto);

            return dataInicialMatch && dataFinalMatch && pessoaMatch && produtoMatch;
        });

        setFilteredData(filteredVendas);
    };

    useEffect(() => {
        const filtroAtivo =
            filtroDataInicial.trim() !== '' ||
            filtroDataFinal.trim() !== '' ||
            selectedPessoa.trim() !== '' ||
            selectedProduto.trim() !== '';

        setFiltrosAtivos(filtroAtivo);
        filterData();
    }, [filtroDataInicial, filtroDataFinal, selectedPessoa, selectedProduto]);

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
                        <option value="">Todas</option>
                        {vendasData.map((venda) => (
                            <option key={venda.pessoa_id} value={venda.pessoa_id}>
                                {pessoaNomes[venda.pessoa_id] || 'Carregando...'}
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
                        <option value="">Todos</option>
                        {vendasData.map((venda) => (
                            <option key={venda.produto_id} value={venda.produto_id}>
                                {produtoNomes[venda.produto_id] || 'Carregando...'}
                            </option>
                        ))}
                    </select>
                </div>
                <Button onClick={filterData}>
                    <FaSearch /> Filtrar
                </Button>
            </div>
            {filtrosAtivos && filteredData.length > 0 ? (
                <div className="table-container">
                    <Table striped bordered hover className="table">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Pessoa</th>
                            <th>Produto</th>
                            <th>Valor Venda</th>
                            <th>Data Venda</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((venda) => (
                            <tr key={venda.id_venda}>
                                <td>{venda.id_venda}</td>
                                <td>{pessoaNomes[venda.pessoa_id] || 'Carregando...'}</td>
                                <td>{produtoNomes[venda.produto_id] || 'Carregando...'}</td>
                                <td>{venda.valor_venda}</td>
                                <td>{venda.data_venda}</td>
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
