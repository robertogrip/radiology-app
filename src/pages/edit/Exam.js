import React from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header } from '../../components';
import Api from '../../utils/api';

class Exam extends React.Component {
  constructor(props) {
    super(props);
    const { match, exams } = props;
    if (match.params && match.params.id && exams && exams.length) {
      const examId = match.params.id;
      const examFind = exams.filter(exam => exam.id === examId)[0];

      if (examFind) {
        this.state = {
          name: examFind.name,
          user: examFind.user,
          content: examFind.content,
          description: examFind.description,
          userOptions: 'select-user'
        };
      }
    } else if (
      match.params &&
      match.params.id &&
      props.user &&
      props.user.id &&
      props.user.level &&
      !props.exams
    ) {
      Api.exams.getAll({ user: props.user.id, level: props.user.level }).then(result => {
        props.updateState({
          exams: (result && result.success && result.data) || null
        });
      });
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { match, exams } = nextProps;

    if (match.params && match.params.id && exams && exams.length) {
      const examId = match.params.id;
      const examFind = exams.filter(exam => exam.id === examId)[0];

      if (examFind) {
        this.setState({
          name: examFind.name,
          user: examFind.user,
          content: examFind.content,
          description: examFind.description,
          userOptions: 'select-user'
        });
      }
    }
  }

  handleChange(event) {
    const newState = { ...this.state };
    newState[event.currentTarget.name || event.currentTarget.id] = event.currentTarget.value;

    this.setState(newState);
  }

  render() {
    const { state, props } = this;

    if (!state)
      return (
        <div className="app-edit-exam">
          <Header {...props} />
          <div className="container container-fluid fixed-navbar">
            <h2 className="display-4 font-22">Lista de exames</h2>
          </div>
        </div>
      );

    return (
      <div className="app-edit-exam">
        <Header {...props} />
        <div className="container container-fluid fixed-navbar">
          <h2 className="display-4 font-22">Editar - {this.state.name}</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="email"
                className="form-control"
                id="name"
                placeholder="Nome"
                value={this.state.name}
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
                value={this.state.description}
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
