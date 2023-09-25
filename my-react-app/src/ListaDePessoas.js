import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';

const pessoasData = [
    {
        id: 1,
        nome: 'John Doe',
        cidade: 'City 1',
        telefone: '123-456-7890',
    },
    {
        id: 2,
        nome: 'Jane Smith',
        cidade: 'City 2',
        telefone: '987-654-3210',
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


const ListaDePessoas = ({ pessoa, onEditar, onDeletar, onIncluir }) => {
        return (
            <div className="list-container">
                <div className="table-container">
                    <Table striped bordered hover className="table">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pessoasData.map((pessoa) => (
                            <tr key={pessoa.id}>
                                <td>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.cidade}</td>
                                <td>{pessoa.telefone}</td>
                                <td className="actions-column">
                                    <Button
                                        variant="warning"
                                        onClick={() => onEditar(pessoa.id)}
                                        className="edit-button"
                                    >
                                        <FaEdit className="fa-edit" /> Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => onDeletar(pessoa.id)}
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
                <Link to="/pessoas" className="link-button">
                    Incluir
                </Link>
            </div>

        );
};

export default ListaDePessoas;
export {pessoasData};
