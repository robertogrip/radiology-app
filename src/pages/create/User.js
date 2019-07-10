import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header } from '../../components';

//import Api
import { Api, Confirm } from '../../utils';

class User extends React.Component {
  constructor() {
    super();
    this.state = {};
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
    const { history } = this.props;
    const { login, level, password } = this.state;

    Api.exams.create({
      login,
      level, 
      password
    }).then(response => {
      if (response.success) {
        Confirm.fire({
          title: 'Sucesso!',
          text: 'Novo usuário criado',
          type: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          return history.push('/users');
        });
      } else {
        Confirm.fire({
          title: 'Erro!',
          text: 'Novo usuário não foi criado, tente novamente',
          type: 'error',
          confirmButtonText: 'Ok'
        }).then(() => {
          return this.setState({});
        });
      }
    });
  }

  render() {
    return (
      <div className="app-create-user">
        <Header {...this.props} />
      </div>
    );
  }
}

export default User;
