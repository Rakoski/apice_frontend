import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import './Venda.css'
import ListaDeProdutosPraVenda from "./ListaDeProdutosPraMostrarNaVenda";

class VendaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_venda: '',
            dataVenda: '',
            pessoa: '',
            produto: '',
            quantidadeVenda: '',
            valorUnitario: 0,
            subTotal: 0,
            carrinho: [],
        };
    }

    handleIdVendaChange = (e) => {
        this.setState({ id_venda: e.target.value });
    }

    handleDataVendaChange = (e) => {
        this.setState({ dataVenda: e.target.value });
    }

    handlePessoaChange = (e) => {
        this.setState({ pessoa: e.target.value });
    }

    handleProdutoChange = (e) => {
        const produtoSelecionado = e.target.value;
        // Aqui você deve buscar o preço do produto da tabela Produto com base no produtoSelecionado
        // e atualizar o estado com o preço
        // Exemplo fictício:
        const precoDoProduto = 10; // Preço fictício do produto
        this.setState({ produto: produtoSelecionado, valorUnitario: precoDoProduto }, () => {
            // Após atualizar o preço do produto, recalcule o subTotal
            this.calculateSubTotal();
        });
    }

    handleQuantidadeVendaChange = (e) => {
        const quantidadeVenda = e.target.value;

        // Convert the input value to a number
        const newValue = parseInt(quantidadeVenda, 10);

        // Check if newValue is a valid number or NaN (e.g., if the user enters non-numeric characters)
        if (!isNaN(newValue)) {
            // Ensure newValue is not negative
            const newQuantidadeVenda = newValue >= 0 ? newValue : 0;

            this.setState({quantidadeVenda: newQuantidadeVenda}, () => {
                // After updating the state, you can recalculate the subTotal or perform any other necessary actions
                this.calculateSubTotal();
            });
        };
    };

    calculateSubTotal() {
        const { quantidadeVenda, valorUnitario } = this.state;
        const subTotal = quantidadeVenda * valorUnitario;
        this.setState({ subTotal });
    }

    handleAdicionarAoCarrinho = () => {
        const { id_venda, dataVenda, pessoa, produto, quantidadeVenda, subTotal } = this.state;
        const venda = {
            id_venda,
            dataVenda,
            pessoa,
            produto,
            quantidadeVenda,
            subTotal,
        };
        // Adicione a venda ao carrinho
        this.setState((prevState) => ({
            carrinho: [...prevState.carrinho, venda],
        }));
        // Limpe os campos após adicionar ao carrinho, se necessário
        this.setState({
            id_venda: '',
            dataVenda: '',
            pessoa: '',
            produto: '',
            quantidadeVenda: '',
            valorUnitario: 0,
            subTotal: 0,
        });
    }

    render() {
        return (
            <div className="venda-container">
                <div className="venda-row">
                    <div className="venda-field">
                        <label className="venda-label">Código (id_venda):</label>
                        <input type="text" className="venda-input" value={this.state.id_venda} onChange={this.handleIdVendaChange} />
                    </div>
                    <div className="venda-field">
                        <label className="venda-label">Data Venda:</label>
                        <InputMask
                            mask="99/99/9999"
                            placeholder="DD/MM/YYYY"
                            className="venda-input"
                            value={this.state.dataVenda}
                            onChange={this.handleDataVendaChange}
                        />
                    </div>
                    <div className="venda-field">
                        <label className="venda-label">Pessoa:</label>
                        <select className="venda-input" value={this.state.pessoa} onChange={this.handlePessoaChange}>
                        </select>
                    </div>
                </div>
                <div className="venda-row">
                    <div className="venda-field">
                        <label className="venda-label">Produto:</label>
                        <select className="venda-input" value={this.state.produto} onChange={this.handleProdutoChange}>
                        </select>
                    </div>
                    <div className="venda-field">
                        <label className="venda-label">Quantidade Venda:</label>
                        <input type="number" className="venda-input" value={this.state.quantidadeVenda} onChange={this.handleQuantidadeVendaChange} />
                    </div>
                    <div className="venda-field">
                        <label className="venda-label">Valor Unitário</label>
                        <span className="venda-value">{`:  R$${this.state.valorUnitario}`}</span>
                    </div>
                    <div className="venda-field">
                        <label className="venda-label">Sub Total</label>
                        <label className="venda-value">{`:  R$${this.state.subTotal}`}</label>
                    </div>
                    <div className="venda-field">
                        <button className="venda-button" onClick={this.handleAdicionarAoCarrinho}>
                            <img
                                src={process.env.PUBLIC_URL + '/carrinho-png.png'}
                                alt="Carrinho"
                                className="venda-icon"
                                style={{ width: '30px', height: '30px' }}
                            />
                        </button>
                    </div>
                    <ListaDeProdutosPraVenda />
                </div>
            </div>
        );
    }
}

export default VendaComponent;
