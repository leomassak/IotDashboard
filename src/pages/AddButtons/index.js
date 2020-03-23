import React, { Component } from 'react'

import api from '../../services/api'

import ButtonForm from '../../components/ButtonForm';

import './style.css';

export default class index extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             buttonuser: '',
             nome: '',
             link: '',
             tipo: 'luz',
        }
    }


    changeForm = (e) => {

        this.setState({tipo: e.target.value});
    }
    
    render() {
        
        return (
            <div className="addbutton">

                <ul className="radios">
                    <li>
                    <label>
                        <input
                            type="radio"
                            value="luz"
                            checked={this.state.tipo === "luz"}
                            onChange={this.changeForm}
                        />
                        Luz
                    </label>
                    </li>
                    
                    <li>
                    <label>
                        <input
                        type="radio"
                        value="controle"
                        checked={this.state.tipo === "controle"}
                        onChange={this.changeForm}
                        />
                         Controle
                    </label>
                    </li>
                </ul>
                        
                <div className="inputBloc">
                    <ButtonForm type={this.state.tipo} buttonuser={this.props.user.username} history={this.props.history}/>
                </div>
        </div>
        )
    }
}
