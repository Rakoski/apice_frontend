import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';
import './FiltroPessoas.css';

const pessoasData = [
    {
        id: 1,
        nome: 'John Doe',
        cidade: 'City 1',
        bairro: 'Bairro 1',
        telefone: '123-456-7890',
    },
    {
        id: 2,
        nome: 'Jane Smith',
        cidade: 'City 2',
        bairro: 'Bairro 2',
        telefone: '987-654-3210',
    },
];

const FiltroPessoas = () => {
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroCidade, setFiltroCidade] = useState('');
    const [filtroBairro, setFiltroBairro] = useState('');
    const [resultados, setResultados] = useState([]);
    const [filtrosAtivos, setFiltrosAtivos] = useState(false);

    const handleFiltrar = () => {
        // Verifica se pelo menos um dos campos de filtro tem algum valor
        const filtroAtivo =
            filtroNome.trim() !== '' ||
            filtroCidade.trim() !== '' ||
            filtroBairro.trim() !== '';

        setFiltrosAtivos(filtroAtivo);

        if (filtroAtivo) {
            const resultadosFiltrados = pessoasData.filter((pessoa) => {
                const nomeMatch = pessoa.nome.toLowerCase().includes(filtroNome.toLowerCase());
                const cidadeMatch = pessoa.cidade.toLowerCase().includes(filtroCidade.toLowerCase());
                const bairroMatch = pessoa.bairro.toLowerCase().includes(filtroBairro.toLowerCase());

                return nomeMatch && cidadeMatch && bairroMatch;
            });

            setResultados(resultadosFiltrados);
        } else {
            setResultados([]); // Se nenhum filtro estiver ativo, não há resultados a serem mostrados
        }
    };

    return (
        <div className="list-container">
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Cidade"
                    value={filtroCidade}
                    onChange={(e) => setFiltroCidade(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Bairro"
                    value={filtroBairro}
                    onChange={(e) => setFiltroBairro(e.target.value)}
                />
                <Button onClick={handleFiltrar}>
                    <FaSearch /> Filtrar
                </Button>
            </div>
            {filtrosAtivos && resultados.length > 0 ? ( // Verifica se filtros estão ativos e se há resultados
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
                            <tr key={pessoa.id}>
                                <td>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.cidade}</td>
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

export default FiltroPessoas;
