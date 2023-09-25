import React, { useState } from 'react';
import './CadastroPessoa.css'
import {Link, Route, Router, Routes} from "react-router-dom";

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

        // aqui ainda irei fazer a parte da requisição POST para cadastrar uma pessoa

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

        // Enviarei o formData para o meu backend em um endpoint de requisição aqui
    };

    const handleCancelar = () => {
        // Limpar os campos do formulário
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
            <h1>Cadastro de Pessoa</h1>
            <div className="form-row">
                <div className="form-group">
                    <label>Código:</label>
                    <input type="text" className="codigo-input" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" className="nome-input" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Cidade:</label>
                    <select className="cidade-select" value={cidade} onChange={(e) => setCidade(e.target.value)}>
                        <option value="cidade1">Cidade 1</option>
                        <option value="cidade2">Cidade 2</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Bairro:</label>
                    <select className="bairro-select" value={bairro} onChange={(e) => setBairro(e.target.value)}>
                        <option value="bairro1">Bairro 1</option>
                        <option value="bairro2">Bairro 2</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>CEP:</label>
                    <input type="text" className="cep-input" value={cep} onChange={(e) => setCep(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Endereço:</label>
                    <input type="text" className="endereco-input" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Número:</label>
                    <input type="text" className="numero-input" value={numero} onChange={(e) => setNumero(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Complemento:</label>
                    <input type="text" className="complemento-input" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Telefone:</label>
                    <input type="text" className="telefone-input" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" className="email-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className="button-container">
                <button className="cancel-button" onClick={handleCancelar}>Cancelar</button>
                <button className="confirm-button" onClick={handleConfirmar}>Confirmar</button>
                <Link to="/lista de pessoas">
                    <button className="list-button" style={{ fontSize: '15px' }}>
                        Listar Pessoas
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CadastroPessoa;
