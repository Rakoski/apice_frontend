import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';
import './FiltroPessoas.css';

const FiltroVendas = () => {
    const [vendasData, setVendasData] = useState([]);
    const [pessoasData, setPessoasData] = useState([]);
    const [produtosData, setProdutosData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filtroDataInicial, setFiltroDataInicial] = useState('');
    const [filtroDataFinal, setFiltroDataFinal] = useState('');
    const [selectedPessoa, setSelectedPessoa] = useState('');
    const [selectedProduto, setSelectedProduto] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vendasResponse = await fetch('http://localhost:8080/api/vendas');
                if (!vendasResponse.ok) {
                    console.error('Erro ao pegar os dados das vendas');
                }
                const vendasData = await vendasResponse.json();
                setVendasData(vendasData.data);
            } catch (error) {
                console.error('Erro ao pegar os dados:', error);
            }
        };

        fetchData();
    }, []);

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
                console.error('Erro ao pegar os dados das pessoas:', error);
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
                console.error('Erro ao pegar os dados dos produtos:', error);
            }
        };

        fetchData();
    }, []);

    const filterData = async () => {
        let filtered = vendasData;

        if (filtroDataInicial) {
            const dataInicial = new Date(filtroDataInicial);
            filtered = filtered.filter((venda) => new Date(venda.data_venda) >= dataInicial);
        }

        if (filtroDataFinal) {
            const dataFinal = new Date(filtroDataFinal);
            filtered = filtered.filter((venda) => new Date(venda.data_venda) <= dataFinal);
        }

        if (selectedPessoa) {
            filtered = filtered.filter((venda) => venda.pessoa_id === parseInt(selectedPessoa));
        }

        if (selectedProduto) {
            const vendaprodutoResponse =
                await fetch(`http://localhost:8080/api/vendas_produtos/produto/${selectedProduto}`);
            if (!vendaprodutoResponse.ok) {
                console.error('Erro ao pegar os dados dos vendaprodutos');
                return;
            }
            const vendaprodutoData = await vendaprodutoResponse.json();

            const filteredVendas = [];
            for (const vendaproduto of vendaprodutoData.data) {
                const vendaResponse = await fetch(`http://localhost:8080/api/vendas/${vendaproduto.venda_id}`);
                if (!vendaResponse.ok) {
                    console.error('Erro ao pegar os dados da venda');
                    continue;
                }
                const vendaData = await vendaResponse.json();

                console.log(vendaData.data.pessoa_id)

                const pessoaResponse = await fetch(`http://localhost:8080/api/pessoas/${vendaData.data.pessoa_id}`);
                if (!pessoaResponse.ok) {
                    console.error('Erro ao pegar os dados da pessoa');
                    continue;
                }
                const pessoaData = await pessoaResponse.json();

                filteredVendas.push({
                    venda_id: vendaData.data.id_venda,
                    pessoa_nome: pessoaData.pessoa_nome,
                    valor_venda: vendaData.data.valor_venda,
                    data_venda: vendaData.data.data_venda,
                });
            }

            filtered = filteredVendas;
        }

        setFilteredData(filtered);
    };

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
                        <option value="">Todos</option>
                        {produtosData.map((produto) => (
                            <option key={produto.id_produto} value={produto.id_produto}>
                                {produto.nome_produto}
                            </option>
                        ))}
                    </select>
                </div>
                <Button onClick={filterData}>
                    <FaSearch /> Filtrar
                </Button>
            </div>

            {filteredData.length > 0 ? (
                <div className="table-container">
                    <Table striped bordered hover className="table">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Pessoa Nome</th>
                            <th>Valor Venda</th>
                            <th>Data Venda</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((venda) => (
                            <tr key={venda.venda_id}>
                                <td>{venda.venda_id}</td>
                                <td>{venda.pessoa_nome}</td>
                                <td>{venda.valor_venda}</td>
                                <td>{venda.data_venda}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default FiltroVendas;
