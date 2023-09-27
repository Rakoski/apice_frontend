import React, { useState } from 'react';
import './CadastroPessoa.css';
import { Link } from 'react-router-dom';

const CadastroCidade = () => {
    const [codigo, setCodigo] = useState('');
    const [cidade, setCidade] = useState('');
    const [sigla, setSigla] = useState('');

    const handleConfirmar = () => {
        // Here you can add the logic to send a POST request to register a person
        const formData = {
            codigo,
            cidade,
            sigla,
        };
        // Send the formData to your backend API here
    };

    const handleCancelar = () => {
        // Clear the form fields
        setCodigo('');
        setCidade('');
        setSigla('');
    };

    return (
        <div className="cadastro-pessoa-container">
            <h1>Cadastro de Cidade</h1>
            <div className="form-row">
                <div className="form-group">
                    <label>Código:</label>
                    <input
                        type="text"
                        className="codigo-input"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Cidade:</label>
                    <input
                        type="text"
                        className="nome-input"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Sigla UF:</label>
                    <input
                        type="text"
                        className="nome-input small-input"
                        value={sigla}
                        onChange={(e) => setSigla(e.target.value)}
                    />
                </div>
            </div>
            <div className="button-container">
                <button className="cancel-button" onClick={handleCancelar}>
                    Cancelar
                </button>
                <button className="confirm-button" onClick={handleConfirmar}>
                    Confirmar
                </button>
                <Link to="/lista de cidades">
                    <button className="list-button" style={{ fontSize: '15px' }}>
                        Listar cidades
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CadastroCidade;
