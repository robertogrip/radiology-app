import React from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header } from '../../components';

//import Api
import { Api, Confirm } from '../../utils';

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      level: '1'
    };
    this.createItem = this.createItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newState = { ...this.state };
    newState[event.currentTarget.name || event.currentTarget.id] = event.currentTarget.value;

    this.setState(newState);
  }

  createItem(event) {
    event.preventDefault();
    const { props } = this;
    const { history, updateState, users } = props;
    const { login, password, level } = this.state;

    Api.users.create({
      login,
      password,
      level
    }).then(response => {
      if (response.success) {
        Confirm.fire({
          title: 'Sucesso!',
          text: 'Novo usuário foi criado',
          type: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          const newUsers = users;
          newUsers.push(response.data);
          updateState({users: newUsers});
          return history.push('/users');
        });
      } else {
        Confirm.fire({
          title: 'Erro!',
          text: 'Novo usuário não foi criado, tente novamente',
          type: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  render() {
    return (
      <div className="app-create-user">
        <Header {...this.props} />
        <div className="container container-fluid fixed-navbar">
          <h2 className="display-4 font-22">Cadastrar usuário</h2>
          <form onSubmit={this.createItem}>
            <div className="form-group">
              <label htmlFor="login">Número exame/Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                placeholder="Número exame/Login"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Senha/Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Senha/Password"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="level"
                  id="user-options-1"
                  value="1"
                  checked={this.state.level === '1'}
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor="user-options-1">
                  Usuário normal
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="level"
                  id="user-options-2"
                  value="2"
                  checked={this.state.level !== '1'}
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor="user-options-2">
                  Administrador
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
            <Link to="/users" className="btn btn-outline-secondary">
              Voltar
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default User;
