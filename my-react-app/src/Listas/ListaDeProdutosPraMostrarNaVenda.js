import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDeProdutosPraMostrarNaVenda.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditarModal from "../EditarModal";

const pessoasData = [
    {
        id_produto: 2,
        produto_nome: 'Mousepad',
        quantidade_venda: 1,
        valor_unitario: 1,
    },
    {
        id_produto: 1,
        produto_nome: 'Garrafa Stanley',
        quantidade_venda: 2,
        valor_unitario: 5,
    },
];

const calculateSubTotal = (quantidade, valorUnitario) => quantidade * valorUnitario;

const ListaDeProdutosPraVenda = ({ pessoa, onEditar, onDeletar, onIncluir }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({});

    const handleOpenModal = (id) => {
        const dataToDisplay = pessoasData.find((p) => p.id_produto === id);
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
                console.error('Falha em fazer update dos dados');
            }
        } catch (error) {
            console.error('Erro: ', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    const calculateTotal = () => {
        return pessoasData.reduce((total, pessoa) => total +
            calculateSubTotal(pessoa.quantidade_venda, pessoa.valor_unitario), 0);
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
                        <th>Quantidade</th>
                        <th>Sub Total</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pessoasData.map((pessoa) => (
                        <tr key={pessoa.id_produto}>
                            <td>{pessoa.id_produto}</td>
                            <td>{pessoa.produto_nome}</td>
                            <td>{pessoa.quantidade_venda}</td>
                            <td>{pessoa.valor_unitario}</td>
                            <td>{calculateSubTotal(pessoa.quantidade_venda, pessoa.valor_unitario)}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => handleOpenModal(pessoa.id_venda)}
                                    className="edit-button"
                                >

                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
                            {showModal && (
                                <EditarModal
                                    showModal={showModal}
                                    handleCloseModal={handleCloseModal}
                                    editedData={editedData}
                                    handleSaveChanges={handleSaveChanges}
                                    handleInputChange={handleInputChange}
                                />)}
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
            <div className="total-container">
                <span className="total-label">Total:</span>
                <span className="total-value">{calculateTotal()}</span>
            </div>
        </div>
    );
};

export default ListaDeProdutosPraVenda;
