import React from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header } from '../../components';

//import Api
import { Api, Confirm } from '../../utils';

class Exam extends React.Component {
  constructor() {
    super();
    this.state = {
      userOptions: 'create-user'
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
    const { history } = this.props;
    const { name, description, examFile, userOptions, user } = this.state;

    Api.exams.create({
      name,
      description, 
      content: (examFile && 'teste teste teste teste teste teste teste teste teste teste teste teste teste') || '',
      user: userOptions !== 'create-user' && user ? user : null 
    }).then(response => {
      if (response.success) {
        Confirm.fire({
          title: 'Sucesso!',
          text: 'Novo exame criado',
          type: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          return history.push('/dashboard');
        });
      } else {
        Confirm.fire({
          title: 'Erro!',
          text: 'Novo exame não foi criado, tente novamente',
          type: 'error',
          confirmButtonText: 'Ok'
        }).then(() => {
          return this.setState({userOptions: 'create-user'});
        });
      }
    });
  }

  render() {
    return (
      <div className="app-create-exam">
        <Header {...this.props} />
        <div className="container container-fluid fixed-navbar">
          <h2 className="display-4 font-22">Cadastrar exame</h2>
          <form onSubmit={this.createItem}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nome"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Descrição"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="examFile">Importar arquivo PDF</label>
              <input
                type="file"
                className="form-control-file"
                id="examFile"
                accept="application/pdf"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userOptions"
                  id="user-options-1"
                  value="create-user"
                  checked={this.state.userOptions === 'create-user'}
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor="user-options-1">
                  Criar novo usuário
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userOptions"
                  id="user-options-2"
                  value="select-user"
                  checked={this.state.userOptions !== 'create-user'}
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor="user-options-2">
                  Selecionar usuário existente
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
            <Link to="/dashboard" className="btn btn-outline-secondary">
              Voltar
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Exam;
