import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

//import Api
import Api from '../utils/api';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      controlPanel: false
    };
    this.checkLogin = this.checkLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleAdminPanel = this.toggleAdminPanel.bind(this);
  }

  checkLogin(event) {
    event.preventDefault();
    const { state, props } = this;
    const { history } = props;

    Api.auth({ login: state.examNumber, password: state.password }).then(result => {
      if (result && result.success && result.data) {
        const userData = result.data;
        props.updateUser(userData);
        if (userData.level === '2') {
          history.push('/dashboard');
        } else if (userData.exam && !Array.isArray(userData.exam)) {
          history.push(`/exam/view/${userData.exam}`);
        }
      }
    });
  }

  handleChange(event) {
    const newState = { ...this.state };
    newState[event.currentTarget.id] = event.currentTarget.value;

    this.setState(newState);
  }

  toggleAdminPanel(event) {
    event.preventDefault();

    this.setState({
      controlPanel: !this.state.controlPanel
    });
  }

  render() {
    const { state } = this;
    return (
      <div className="app-login">
        <div className="modal-login">
          {/* <div className="brand-form" /> */}
          <form onSubmit={this.checkLogin}>
            <div className="brand" />
            <div className="form-group">
              <label htmlFor="examNumber">
                {state.controlPanel ? 'Usuário' : 'Número do exame'}
              </label>
              <input
                type="text"
                className="form-control"
                autoFocus
                id="examNumber"
                onChange={this.handleChange}
                placeholder={state.controlPanel ? 'Digite o usuário' : 'Digite o número do exame'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
                placeholder="Digite a senha"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
            <a
              href="/control-panel"
              onClick={this.toggleAdminPanel}
              alt="Acessar painel de controle"
              className={`btn btn-inline btn-admin-panel ${state.controlPanel ? 'active' : ''}`}
            >
              Painel de controle
            </a>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
