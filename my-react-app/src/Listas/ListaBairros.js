import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';

const bairosData = [
    {
        id_bairro: 1,
        bairro_nome: 'Jardins',
    },
    {
        id_bairro: 2,
        bairro_nome: 'Leblon',
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


const ListaDeBairros = ({ pessoa, onEditar, onDeletar, onIncluir }) => {
    return (
        <div className="list-container">
            <div className="table-container">
                <Table striped bordered hover className="table">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome do Bairro</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bairosData.map((bairro) => (
                        <tr key={bairro.id_bairro}>
                            <td>{bairro.id_bairro}</td>
                            <td>{bairro.bairro_nome}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => onEditar(bairro.id_bairro)}
                                    className="edit-button"
                                >
                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onDeletar(bairro.id_bairro)}
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

export default ListaDeBairros;
export {bairosData};
