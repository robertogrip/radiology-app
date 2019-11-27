import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Api, Confirm } from '../utils';

class ListUsers extends React.Component {
    constructor() {
        super();
        this.printItem = this.printItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(event) {
        const { props } = this;
        let users = props.users;

        const id = event.currentTarget.getAttribute('data-id');
        Confirm.fire({
            title: 'Deseja excluir este usuário',
            type: 'question',
            showCancelButton: true,
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return Api.users.delete(id)
            },
            allowOutsideClick: () => !Confirm.isLoading()
        }).then((result) => {
            if (result.value) {
                users = users.filter(user => user.id !== id);
                props.updateState({users});
                Confirm.fire(
                    'Deletado!',
                    'O usuário foi deletado.',
                    'success'
                );
            }
        });
    }

    printItem(event) {
        const { props } = this;
        const { users } = props;
        const dataId = event.currentTarget.getAttribute('data-id');

        const user = users && users.filter(user => user.id === dataId)[0];

        if (!user) return null;

        var mywindow = window.open('', 'PRINT', `height=${window.innerHeight},width=${window.innerWidth}`);

        mywindow.document.write(`<html>
            <head>
                <title>${user.login}</title>
                <link type="text/css" rel="stylesheet" href="//fonts.googleapis.com/css?family=Quicksand%7COpen+Sans:400,600" id="avia-google-webfont" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <style>* { font-family: "Quicksand", "Open Sans", sans-serif; }</style>
            </head>
            <body class="container">
                <br />
                <div class="card">
                    <div class="card-body">
                        <p>Login: ${user.login}</p>
                        <p>Senha: ${user.password}</p>
                        <small>Com o login e a senha, você pode visualizar o resultado no link: 
                            <a href="resultado.maxilare.com.br">resultado.maxilare.com.br</a>
                        </small><br />
                        <small>O exame deve ficar pronto dentro de 7 dias.</small>
                    </div>
                </div>
                <br />
            </body>
        </html>`);

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.addEventListener('load', () => {
            mywindow.print();
            mywindow.close();
        }, false);

        return true;
    }

    render() {
        const { props } = this;
        if (!props || !props.users || !props.users.length) {
            return null;
        }    

        return props.users.map((user, index) => {
            return (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center user">
                    <div className="user-name">{user.login} {user.level === '2' ? <span className="badge badge-primary">administrador</span> : ''}</div>
                    <div className="user-actions">
                        <button className="btn btn-primary btn-inline" onClick={this.printItem} data-id={user.id}>Imprimir</button>
                        <Link to={`/user/edit/${user.id}`} className="btn btn-outline-secondary btn-inline">Editar</Link>
                        <button type="button" className="btn btn-outline-danger" onClick={this.deleteItem} data-id={user.id}>Excluir</button>
                    </div>
                </li>
            )
        });
    }
}

export default ListUsers;
