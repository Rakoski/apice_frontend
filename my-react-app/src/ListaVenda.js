import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const pessoasData = [
    {
        id_venda: 1,
        Pessoa: 'João Dos Santos',
        Total_venda: 865,
    },
    {
        id_venda: 2,
        Pessoa: 'Joana Lurdes',
        Total_venda: 790,
    },
];

const ListaVendas = ({ pessoa, onEditar, onDeletar, onIncluir }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({}); // State for edited data

    const handleOpenModal = (id) => {
        const dataToDisplay = pessoasData.find((p) => p.id_venda === id);
        setModalData(dataToDisplay);
        setEditedData(dataToDisplay);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('your-api-endpoint', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });

            if (response.ok) {
                handleCloseModal();
            } else {
                console.error('Failed to update data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        handleCloseModal()
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    return (
        <div className="list-container">
            <div className="table-container">
                <Table striped bordered hover className="table">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Total Venda</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pessoasData.map((pessoa) => (
                        <tr key={pessoa.id_venda}>
                            <td>{pessoa.id_venda}</td>
                            <td>{pessoa.Pessoa}</td>
                            <td>{pessoa.Total_venda}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => handleOpenModal(pessoa.id_venda)}
                                    className="edit-button"
                                >
                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onDeletar(pessoa.id_venda)}
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
            <Link to="/vendas" className="link-button">
                Incluir
            </Link>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Pessoa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label>ID:</label>
                        <input
                            type="text"
                            name="id_venda"
                            value={editedData.id_venda || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <p></p>
                    <div>
                        <label>Nome:</label>
                        <p></p>
                        <input
                            type="text"
                            name="Pessoa"
                            value={editedData.Pessoa || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <p></p>
                    <div>
                        <label>Total Venda:</label>
                        <p></p>
                        <input
                            type="text"
                            name="Total_venda"
                            value={editedData.Total_venda || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ListaVendas;
