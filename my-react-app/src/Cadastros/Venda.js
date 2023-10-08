import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import './Venda.css'
import ListaDeProdutosPraVenda from "../Listas/ListaDeProdutosPraMostrarNaVenda";


// vou fazer esse componente em OOP só pra aprender/testar como funciona isso no react
class VendaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_venda: '',
            dataVenda: '',
            produto: '',
            quantidadeVenda: '',
            pessoas: [],
            produtos: [],
            valorUnitario: 0,
            subTotal: 0,
            carrinho: [],
            selectedProducts: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/pessoas')
            .then((response) => response.json())
            .then((data) => this.setState({ pessoas: data }));

        fetch('http://localhost:8080/api/produtos')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ produtos: data.data });

                const produtoWithId10 = data.data.find((produto) => produto.id_produto === 10);
                if (produtoWithId10) {
                    this.setState({ produto: produtoWithId10.nome_produto,
                        valorUnitario: parseFloat(produtoWithId10.valor_produto) });
                }
            });
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
        const { produtos } = this.state;

        const selectedProduto = produtos.find((produto) => produto.nome_produto === produtoSelecionado);

        if (selectedProduto) {
            const valorUnitario = parseFloat(selectedProduto.valor_produto);
            this.setState({ produto: produtoSelecionado, valorUnitario }, () => {
                this.calculateSubTotal();
            });
        }
    };

    handleQuantidadeVendaChange = (e) => {
        const quantidadeVenda = e.target.value;
        const newValue = parseInt(quantidadeVenda, 10);

        if (!isNaN(newValue)) {
            const newQuantidadeVenda = newValue >= 0 ? newValue : 0;

            this.setState({quantidadeVenda: newQuantidadeVenda}, () => {
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
        const { id_venda, dataVenda, pessoa, produto, quantidadeVenda, subTotal, valorUnitario } = this.state;
        const venda = {
            id_venda,
            id_produto: this.state.produtos.find((p) => p.nome_produto === produto)?.id_produto,
            produto,
            quantidadeVenda,
            subTotal,
            valorUnitario,
        };

        this.setState((prevState) => ({
            selectedProducts: [...prevState.selectedProducts, venda],
        }));

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
        const { pessoas, produtos, valorUnitario, selectedProducts } = this.state;

        return (
            <div className="venda-container">
                <div className="venda-row">
                    <div className="venda-field">
                        <label className="venda-label">Código (id):</label>
                        <input type="text" className="venda-input" value={this.state.id_venda}
                               onChange={this.handleIdVendaChange} />
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
                            {pessoas.map((pessoa) => (
                                <option key={pessoa.id_pessoa} value={pessoa.pessoa_nome}>
                                    {pessoa.pessoa_nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="venda-row">
                    <div className="venda-field">
                        <label className="venda-label">Produto:</label>
                        <select className="venda-input" value={this.state.produto} onChange={this.handleProdutoChange}>
                            {produtos.map((produto) => (
                                <option key={produto.id_produto} value={produto.nome_produto}>
                                    {produto.nome_produto}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="venda-field">
                        <label className="venda-label">Quantidade Venda:</label>
                        <input type="number" className="venda-input" value={this.state.quantidadeVenda}
                               onChange={this.handleQuantidadeVendaChange} />
                    </div>
                    <div className="venda-field">
                        <label className="venda-label">Valor Unitário</label>
                        <span className="venda-value">{`:  R$${valorUnitario.toFixed(2)}`}</span>
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

                    {/* esse é só o componente da lista. Ele vai funcionar como carrinho já que ia ficar
                     muita coisa pra colocar em um componente só */}
                    <ListaDeProdutosPraVenda selectedProducts={selectedProducts} />
                </div>
            </div>
        );
    }
}

export default VendaComponent;
