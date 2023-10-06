import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditarModal = ({ showModal, handleCloseModal, fields, editedData, handleSaveChanges, handleInputChange, brazilianStates }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {fields.map((field, index) => (
                    <div key={index} className="input-field">
                        <label>{field.label}:</label>
                        {field.name === 'sigla_uf' ? (
                            <select
                                name={field.name}
                                value={editedData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className="form-control"
                            >
                                {brazilianStates.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type || 'text'}
                                name={field.name}
                                value={editedData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className="form-control"
                            />
                        )}
                    </div>
                ))}
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
    );
};

export default EditarModal;
