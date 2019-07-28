import React from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header } from '../../components';

//import Api
import { Api, Confirm } from '../../utils';

class User extends React.Component {
  constructor(props) {
    super(props);
    const { users, match } = props;
    this.state = users.filter(user => user.id === match.params.id)[0];

    this.editItem = this.editItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newState = { ...this.state };
    newState[event.currentTarget.name || event.currentTarget.id] = event.currentTarget.value;

    this.setState(newState);
  }

  editItem(event) {
    event.preventDefault();
    const { props } = this;
    const { history, updateState, users } = props;
    const { id, login, password, level } = this.state;

    Api.users.update(id, {
      login,
      password,
      level
    }).then(response => {
      if (response.success) {
        Confirm.fire({
          title: 'Sucesso!',
          text: 'Usuário foi editado',
          type: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          const newUsers = users.filter(user => user.id !== id);
          newUsers.push({ ...response.data, id });
          updateState({users: newUsers});
          return history.push('/users');
        });
      } else {
        Confirm.fire({
          title: 'Erro!',
          text: 'Usuário não foi editado, tente novamente',
          type: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  render() {
    const { state } = this;
    return (
      <div className="app-edit-user">
        <Header {...this.props} />
        <div className="container container-fluid fixed-navbar">
          <h2 className="display-4 font-22">Editar usuário {state.login}</h2>
          <form onSubmit={this.editItem}>
            <div className="form-group">
              <label htmlFor="login">Número exame/Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                placeholder="Número exame/Login"
                onChange={this.handleChange}
                value={state.login}
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
                value={state.password}
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
              Salvar
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
