import React, { useState } from 'react';
import './CadastroPessoa.css';
import { Link } from 'react-router-dom';

const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const CadastroCidade = () => {
    const [id_cidade, setCodigo] = useState('');
    const [cidade_nome, setCidade] = useState('');
    const [sigla_uf, setSigla] = useState('');

    const handleConfirmar = () => {
        const formData = {
            id_cidade,
            cidade_nome,
            sigla_uf,
        };
        const jsonData = JSON.stringify(formData);

        fetch('http://localhost:8080/api/cidades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Resposta não foi ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Cidade criada com sucesso!');
            })
            .catch(error => {
                console.error('Erro: ', error);
                alert("Código já existente, por favor, insira outro.")
            });
    };

    const handleCancelar = () => {
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
                        value={id_cidade}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Cidade:</label>
                    <input
                        type="text"
                        className="nome-input"
                        value={cidade_nome}
                        onChange={(e) => setCidade(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Sigla UF:</label>
                    <select
                        className="nome-input small-input"
                        value={sigla_uf}
                        onChange={(e) => setSigla(e.target.value)}
                        style={{ fontSize: '16px' }}
                    >

                        {estadosBrasileiros.map(sigla_uf => (
                            <option key={sigla_uf} value={sigla_uf}>{sigla_uf}</option>
                        ))}
                    </select>
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
