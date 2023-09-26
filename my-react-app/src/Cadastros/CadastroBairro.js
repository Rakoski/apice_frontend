import React, { useState } from 'react';
import './CadastroPessoa.css';
import { Link } from 'react-router-dom';

const CadastroBairro = () => {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');

    const handleConfirmar = () => {
        // Lógica pra mandar os dados aqui
        const formData = {
            codigo,
            nome,
        };
        //vou mandar os dados pra minha API aqui
    };

    const handleCancelar = () => {
        setCodigo('');
        setNome('');
    };

    return (
        <div className="cadastro-pessoa-container">
            <h1>Cadastro de Bairro</h1>
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
                    <label>Nome do Bairro:</label>
                    <input
                        type="text"
                        className="nome-input"
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
                <Link to="/lista de bairros">
                    <button className="list-button" style={{ fontSize: '15px' }}>
                        Listar Bairros
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CadastroBairro;
