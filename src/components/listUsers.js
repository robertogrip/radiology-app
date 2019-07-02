import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class ListUsers extends React.Component {
  render() {
    const { props } = this;
    if (!props || !props.users || !props.users.length) {
        return null;
    }

    return props.users.map((user, index) => {
        return (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center user">
                <div className="user-name">{user.login}</div>
                <div className="user-actions">
                    <Link to={`/user/edit/${user.id}`} className="btn btn-outline-secondary btn-inline">Editar</Link>
                    <button type="button" className="btn btn-outline-danger">Excluir</button>
                </div>
            </li>
        )
    });
  }
}

export default ListUsers;
