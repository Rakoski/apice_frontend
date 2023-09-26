import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';

const produtosData = [
    {
        id_cidade: 1,
        nome_cidade: 'São Paulo',
        sigla_uf: 'SP'
    },
    {
        id_cidade: 2,
        nome_cidade: 'Rio de Janeiro',
        sigla_uf: 'RJ'
    },
];

const handleEditar = (id) => {
    console.log(`Editar pessoa com ID ${id}`);
};

const handleDeletar = (id) => {
    console.log(`Deletar pessoa com ID ${id}`);
};

const handleIncluir = () => {
    console.log('Incluir pessoa');
};


const ListaDeProdutos = ({ pessoa, onEditar, onDeletar, onIncluir }) => {
    return (
        <div className="list-container">
            <div className="table-container">
                <Table striped bordered hover className="table">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome do Produto</th>
                        <th>Valor do Produto</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtosData.map((produto) => (
                        <tr key={produto.id_cidade}>
                            <td>{produto.id_cidade}</td>
                            <td>{produto.nome_cidade}</td>
                            <td>{produto.sigla_uf}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => onEditar(produto.id_cidade)}
                                    className="edit-button"
                                >
                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onDeletar(produto.id_cidade)}
                                    className="delete-button"
                                >
                                    <FaTrash className="fa-trash" /> Deletar
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <Link to="/cidades" className="link-button">
                Incluir
            </Link>
        </div>

    );
};

export default ListaDeProdutos;
export {produtosData};
