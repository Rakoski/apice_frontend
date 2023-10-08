import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDeProdutosPraMostrarNaVenda.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditarModal from "../EditarModal";


const ListaDeProdutosPraVenda = ({ selectedProducts, pessoa, onDeletar }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({});

    const handleOpenModal = (id) => {
        const dataToDisplay = pessoa.find((p) => p.id_produto === id);
        setModalData(dataToDisplay);
        setEditedData(dataToDisplay);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const handleConfirmar = async () => {
    };

    const handleCancelar = async () => {
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
        return selectedProducts.reduce((total, produto) => total + produto.subTotal, 0);
    };

    return (
        <div className="list-container">
            <div className="table-container">
                <Table striped bordered hover className="table">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Valor Unitário</th>
                        <th>Sub Total</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedProducts.map((produto) => (
                        <tr key={produto.id_venda}>
                            <td>{produto.id_produto}</td>
                            <td>{produto.produto}</td>
                            <td>{produto.quantidadeVenda}</td>
                            <td>{produto.valorUnitario}</td>
                            <td>{produto.subTotal}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => handleOpenModal(produto.id_venda)}
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
                <span className="total-value">{`R$ ${calculateTotal().toFixed(2)}`}</span>
            </div>
            <div className="button-container">
                <button
                    style={{ backgroundColor: 'green', color: 'white', padding: '20px 50px' }}
                    onClick={handleConfirmar}
                    className="edit-button"
                >
                    Confirmar
                </button>
                <button
                    style={{ backgroundColor: 'red', color: 'white', padding: '20px 50px' }}
                    onClick={handleCancelar}
                    className="delete-button"
                >
                    Cancelar
                </button>
            </div>

        </div>
    );
};

export default ListaDeProdutosPraVenda;
