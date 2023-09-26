import React, { useState } from 'react';
import './CadastroPessoa.css';
import { Link } from 'react-router-dom';

const CadastroPessoa = () => {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    const handleConfirmar = () => {
        // Here you can add the logic to send a POST request to register a person
        const formData = {
            codigo,
            nome,
            cidade,
            bairro,
            cep,
            endereco,
            numero,
            complemento,
            telefone,
            email,
        };
        // Send the formData to your backend API here
    };

    const handleCancelar = () => {
        // Clear the form fields
        setCodigo('');
        setNome('');
        setCidade('');
        setBairro('');
        setCep('');
        setEndereco('');
        setNumero('');
        setComplemento('');
        setTelefone('');
        setEmail('');
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

export default CadastroPessoa;
