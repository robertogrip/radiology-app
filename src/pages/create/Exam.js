import React from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header } from '../../components';

class Exam extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    if (match.params && match.params.id) {
      console.log(match.params.id);
    }

    this.state = {
      userOptions: 'create-user'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newState = { ...this.state };
    newState[event.currentTarget.name || event.currentTarget.id] = event.currentTarget.value;

    this.setState(newState);
  }

  render() {
    return (
      <div className="app-create-exam">
        <Header {...this.props} />
        <div className="container container-fluid fixed-navbar">
          <h2 className="display-4 font-22">Cadastrar exame</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="email"
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
