import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Api, Confirm } from '../utils';

class ListUsers extends React.Component {
    constructor() {
        super();
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
                        <Link to={`/user/edit/${user.id}`} className="btn btn-outline-secondary btn-inline">Editar</Link>
                        <button type="button" className="btn btn-outline-danger" onClick={this.deleteItem} data-id={user.id}>Excluir</button>
                    </div>
                </li>
            )
        });
    }
}

export default ListUsers;
