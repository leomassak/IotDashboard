import React, { Component } from 'react'

import {Button, Card} from 'react-bootstrap';

import api from '../../services/api';

import './style.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';

export default class Buttons extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             buttons: [],
        };
    }

    componentDidMount = () => {
       this.renderButtons()
       this.voiceComands();
    }

    renderButtons = async () => {
        const res = await api.get(`/user/buttons/${this.props.user.username}`);

        if(res.data.error){
            console.log(res.data.error);
            return;
        }

        this.setState({buttons: res.data.buttons}); 

    }

    speakerHandle = (e) => {
        try{
        recognition.start();
        }catch(err){
            console.log(err);
        }
       
    }

    voiceComands = () => {
        recognition.onstart = () => {
            console.log('Voice is activated');
        }

        recognition.onresult = (e) => {
            let current = e.resultIndex;

            let transcript = e.results[current][0].transcript;
            console.log(transcript);
            let mobileRepeatBug = (current === 1 && transcript === e.result[0][0].transcipt);

            if(!mobileRepeatBug){
                if(transcript === 'novo botão'){
                    this.props.history.push("/user/buttons/add");
                }
            }     
            
        }
    }

    render() {

        if(this.state.buttons.length === 0){
            return (
                <div className="buttonspage">
                    <div className="fixed-buttons">
                        <a href="/user/buttons/add"><button className="buttoncolor animated">Novo Botão</button></a> 
                        <button className="speaker animated" onClick={this.speakerHandle}>Comando de Voz <i className="fas fa-microphone fa-lg"></i> </button>
                    </div>
                       

                <div className="button-area">
                <h2>Nenhum botao cadastrado</h2>
                </div>
            </div>
            )
        }

        return (
            <div className="buttonspage">

                <div className="fixed-buttons">
                    <a href="/user/buttons/add"><button className="buttoncolor animated">Novo Botão</button></a> 
                    <button className="speaker animated" onClick={this.speakerHandle}>Comando de Voz <i class="fas fa-microphone fa-lg"></i> </button>
                </div>
               

            <div className="button-area">

            
                    {this.state.buttons.map(button => ( 
                    <Button key= {button.nome} className="newbutton" block>
                        {button.nome}
                    </Button>       
                     ))}
            </div>
                
            </div>
        )
    }
}
