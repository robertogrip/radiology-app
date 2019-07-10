import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header, ListUsers }  from '../components';
import Api from '../utils/api';

class Users extends React.Component {
  componentDidMount() {
    const { props } = this;

    if (props.user && props.user.id && props.user.level && !props.users) {
      Api.users.getAll({ user: props.user.id, level: props.user.level })
        .then(result => {
          props.updateState({
            users: (result && result.success && result.data) || null
          });
        });
    }
  }

  render() {
    const { props } = this;

    return (
      <div className="app-users">
        <Header {...props} />
        <div className="container container-fluid fixed-navbar">
          <div className="app-list-users">
            <div className="row">
              <div className="col-12">
                <div className="row center-items">
                    <div className="col-9">
                        <h2 className="display-4 font-22">Lista de usuários</h2>
                    </div>
                    <div className="col-3 text-right">
                        <Link to="/user/create" className="btn btn-primary">Cadastrar usuário</Link>
                    </div>
                </div>
                <ul className="list-group users-list">
                  <ListUsers {...props} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
