import React, { useState } from 'react';
import './CadastroPessoa.css';
import { Link } from 'react-router-dom';

const CadastroPessoa = () => {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [valorVenda, setValorVenda] = useState('');

    const handleConfirmar = () => {
        // Here you can add the logic to send a POST request to register a person
        const formData = {
            codigo,
            nome,
            valorVenda,
        };
        // Send the formData to your backend API here
    };

    const handleCancelar = () => {
        // Clear the form fields
        setCodigo('');
        setNome('');
        setValorVenda('');
    };

    return (
        <div className="cadastro-pessoa-container">
            <h1>Cadastro de Produto</h1>
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
                    <label>Nome do Produto:</label>
                    <input
                        type="text"
                        className="nome-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Valor de Venda:</label>
                    <input
                        type="text"
                        className="nome-input small-input" // Add "small-input" class
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
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
                <Link to="/lista de produtos">
                    <button className="list-button" style={{ fontSize: '15px' }}>
                        Listar Produtos
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CadastroPessoa;
