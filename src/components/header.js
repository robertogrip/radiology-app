import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor() {
      super();
      this.logout = this.logout.bind(this);
    }

    logout(event) {
      event.preventDefault();
      const { history, updateUser } = this.props;

      if (history && updateUser) {
        localStorage.removeItem('user');
        updateUser({});
        history.push('/');
      }
    }
  
    render() {
      return (
          <header className="app-header">
            <nav className="navbar navbar-vertical navbar-light bg-light">
              <Link className="navbar-brand" to="/dashboard">
                <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
                Radiology
              </Link>
              <ul className="navbar-list">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/users">Usuários</Link>
                </li>
                <li>
                  <Link to="/exam/create">Cadastrar exames</Link>
                </li>
              </ul>
              <ul className="navbar-list navbar-list-logout">
                <li>
                  <a href="/" onClick={this.logout}>Sair</a>
                </li>
              </ul>
            </nav>
          </header>
      )
    }
};

export default Header;
