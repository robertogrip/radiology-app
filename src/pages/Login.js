import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

//import Api
import Api from '../utils/api';

Api.users.create({name: 'Roberto Gripa', email: 'roberto.gripaf@gmail.com', level: 'admin'});

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.checkLogin = this.checkLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  checkLogin(event) {
    event.preventDefault();
    const { state, props } = this;
    const { history } = props;

    if ( state && state.examNumber === 'admin' && state.password === '123456' ) {
      props.updateUser({
        level: 'admin'
      });
      history.push('/dashboard');
    }
  }

  handleChange(event) {
    const newState = {...this.state};
    newState[event.currentTarget.id] = event.currentTarget.value;

    this.setState(newState);
  }

  render() {
    return (
      <div className="app-login">
        <div className="modal-login">
          <div className="brand-form"></div>
          <form onSubmit={this.checkLogin}>
            <div className="form-group">
              <label htmlFor="examNumber">Número do exame</label>
              <input type="text" className="form-control" autoFocus id="examNumber" onChange={this.handleChange} placeholder="Digite o número do exame" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input type="password" className="form-control" id="password" onChange={this.handleChange} placeholder="Digite a senha" />
            </div>
            <button type="submit" className="btn btn-primary">Entrar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
