import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';
import EditarModal from "../EditarModal";

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


const ListaDeProdutos = ({ pessoa, onEditar, onDeletar, onIncluir }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [fields, setFields] = useState([]);
    const brazilianStates = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];


    const handleOpenModal = (produto) => {
        setModalData(produto);
        setEditedData({ ...produto });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveChanges = async () => {
        // Implement your save changes logic here
        // You can use the editedData state to send data to your API
        handleCloseModal();
    };

    const handleInputChange = (name, value) => {
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fieldsArray = [
            { label: 'ID', name: 'id_cidade' },
            { label: 'Nome da cidade', name: 'cidade_nome' },
            { label: 'Sigla UF', name: 'sigla_uf' }
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
                        <th>Cidade</th>
                        <th>Estado</th>
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
                                    onClick={() => handleOpenModal(produto)} // Pass the current produto to open the modal
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
            {showModal && (
                <EditarModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    fields={fields}
                    editedData={editedData}
                    handleSaveChanges={handleSaveChanges}
                    handleInputChange={handleInputChange}
                    brazilianStates={brazilianStates}
                />
            )}
        </div>
    );
};


export default ListaDeProdutos;
export {produtosData};
