import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';

const produtosData = [
    {
        id_produto: 1,
        nome_produto: 'Camiseta branca',
        valor_produto: 87.90
    },
    {
        id_produto: 2,
        nome_produto: 'Coxinha de carne',
        valor_produto: 5.90
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
                        <tr key={produto.id_produto}>
                            <td>{produto.id_produto}</td>
                            <td>{produto.nome_produto}</td>
                            <td>{produto.valor_produto.toFixed(2)}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => onEditar(produto.id_produto)}
                                    className="edit-button"
                                >
                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onDeletar(produto.id_produto)}
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
            <Link to="/bairros" className="link-button">
                Incluir
            </Link>
        </div>

    );
};

export default ListaDeProdutos;
export {produtosData};
