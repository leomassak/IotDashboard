import React, { Component } from 'react'

import {Alert} from 'react-bootstrap';

import api from '../../services/api';

import './style.css';

export default class ButtonForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             buttonuser: '',
             nome: '',
             link: '',
             mensagem: '',
             error: '',
        };
    }

    componentWillMount = () => {
        this.setState({buttonuser: this.props.buttonuser});
    }

    registerHandle = async (e) => {
         e.preventDefault();

         if(this.props.type === 'luz'){
            await this.setState({mensagem: 'ligar'});
         }
    
        const res = await api.post('/user/buttons/add', this.state);
    
            if(res.data.error){
                this.setState({error: res.data.error});
                return;
            }
    
            this.props.history.push('/user/buttons');
        }
    
    render() {

        if(this.props.type === 'luz' || this.props.type === 'default'){
            return (
                <div className="luz-form">
                    {this.state.error && <Alert className="error-alert"variant="danger">{this.state.error}</Alert>}
                    <form className="addbutton-form" onSubmit={this.registerHandle}>
                        <div className="inputBloc">
                            <p><label htmlFor="nome">Nome do botao</label></p>
                                <input 
                                    type="text" 
                                    placeholder="Digite o nome do botao" 
                                    id="botao" 
                                    name="botao"
                                    value={this.state.nome}
                                    onChange={e => (this.setState({nome: e.target.value}))}
                                >
                                </input>

                    <br/>

                                <p><label htmlFor="link">Tópico</label></p> 
                                <input 
                                    type="text" 
                                    placeholder="Digite o tópico do botão" 
                                    id="link" 
                                    name="link"
                                    value={this.state.link}
                                    onChange={e => (this.setState({link: e.target.value}))}
                                >
                                </input>
                </div>
            <button type="submit" id="addbutton-submit">Cadastrar Botão</button>
            <br/>
            </form>    
                </div>
            )
        }

        if(this.props.type === 'controle'){
            return (
                <div className="controle-form">
                    {this.state.error && <Alert className="error-alert"variant="danger">{this.state.error}</Alert>}
                    <form className="addbutton-form" onSubmit={this.registerHandle}>
                        <div className="inputBloc">
                            <p><label htmlFor="nome">Nome do botao</label></p>
                                <input 
                                    type="text" 
                                    placeholder="Digite o nome do botao" 
                                    id="botao" 
                                    name="botao"
                                    value={this.state.nome}
                                    onChange={e => (this.setState({nome: e.target.value}))}
                                >
                                </input>

                    <br/>

                            <p><label htmlFor="link">Tópico</label></p> 
                            <input 
                                type="text" 
                                placeholder="Digite o tópico do botão" 
                                id="link" 
                                name="link"
                                value={this.state.link}
                                onChange={e => (this.setState({link: e.target.value}))}
                            >
                            </input>

                    <br/>

                    <p><label htmlFor="message">Comando</label></p> 
                            <input 
                                type="text" 
                                placeholder="Digite o comando do controle" 
                                id="comando" 
                                name="comando"
                                value={this.state.mensagem}
                                onChange={e => (this.setState({mensagem: e.target.value}))}
                            >
                            </input>

                        </div>
                    <button type="submit" id="addbutton-submit">Cadastrar Botão</button>
                    <br/>
                    </form>    
                </div>
            )
        }
    }
}
