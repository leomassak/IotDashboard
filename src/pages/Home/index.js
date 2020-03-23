import React, { Component } from 'react'

import {Button, Card} from 'react-bootstrap';

export default class Home extends Component {
    render() {

        const user = JSON.parse(localStorage.getItem('user'));

        return (
            <div>
                <Card>
                    <Card.Body>
                    <h1>Seja Bem-Vindo, {user.username}!</h1>
                    <h2>Ir para:</h2>
                    <a href="/user/buttons"><Button variant="primary" size="lg">Botões</Button></a>
                    </Card.Body>
                </Card>
                
            </div>
        )
    }
}
