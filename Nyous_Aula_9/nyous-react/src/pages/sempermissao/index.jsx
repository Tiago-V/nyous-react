import React from 'react';
import Menu from '../../components/menu'
import Rodape from '../../components/rodape'

const SemPermissao = () => {
    return (
        <div>
            <Menu />
            <h1>Sem permissão</h1>
            <p>Entrar em contato com administração</p>
            <Rodape />
        </div>
    )
}

export default SemPermissao;