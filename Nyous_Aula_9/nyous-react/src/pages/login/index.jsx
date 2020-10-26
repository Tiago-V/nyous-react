import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/img/logo.svg'
import { Form, Button, Container } from 'react-bootstrap'
import Menu from '../../components/menu'
import Rodape from '../../components/rodape'
import './index.css'

const Login = () => {
    let history = useHistory();

    //string email {get; set;}
    //valor = email - pegar valor
    //setEmail - atribuir valor
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = (event) => {
        event.preventDefault();

        console.log(`${email} - ${senha}`);

        const login = {
            email : email,
            senha : senha
        }

        fetch('http://localhost:62602/api/Account/login', {
            method : 'POST',
            body : JSON.stringify(login),

            headers : {
                'content-type' : 'application/json'
            }
        })

        .then(response => {
            //verifica api
            if(response.ok === true){
                return response.json();
            }
            //caso não seja ok
            alert('Dados Inválidos')
        })  
        .then(data => {
            console.log(data)

            localStorage.setItem('token-nyous', data.token)

            history.push("/eventos");
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Menu />
            <Container className='form-height'>
                <Form className='form-signin' onSubmit={event => logar(event)}>
                    <div className='text-center'>
                     <img src={logo} alt='NYOUS' style={{ width : '64px'}} />
                    </div>
                    <br/>
                    <small>Informe os dados Abaixo</small>
                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Enviar
                    </Button>
                    <br/><br/>
                    <a href='/cadastrar' style={{ marginTop :'30px'}}>Não tenho conta!</a>
                </Form>
            </Container>
            <Rodape />
        </div>
    )
}

export default Login;