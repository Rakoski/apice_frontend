import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';
import EditarModal from '../EditarModal';

const ListaDeBairros = ({ pessoa, onEditar, onDeletar, onIncluir }) => {
    const [bairosData, setBairosData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [fields, setFields] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/bairros')
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Check the data received
                setBairosData(data.data); // Update the state with data.data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleOpenModal = (id) => {
        const dataToDisplay = bairosData.find((p) => p.id_bairro === id); // Use id_bairro here
        if (dataToDisplay) {
            setModalData(dataToDisplay);
            setEditedData({ ...dataToDisplay }); // Use a new object to avoid modifying the original data
            setShowModal(true);
        }
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
    };

    const handleInputChange = (name, value) => {
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Define your fields array here
    useEffect(() => {
        const fieldsArray = [
            { label: 'ID', name: 'id_bairro' },
            { label: 'Nome do Bairro', name: 'bairro_nome' },
            // Add more fields as needed
        ];
        setFields(fieldsArray);
    }, []);

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
                                    onClick={() => handleOpenModal(bairro.id_bairro)}
                                    className="edit-button"
                                >
                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
                                {showModal && (
                                    <EditarModal
                                        showModal={showModal}
                                        handleCloseModal={handleCloseModal}
                                        fields={fields} // Pass the fields array to EditarModal
                                        editedData={editedData}
                                        handleSaveChanges={handleSaveChanges}
                                        handleInputChange={handleInputChange}
                                    />
                                )}
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
