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
            <nav className="navbar navbar-light bg-light">
              <div className="container">
                <div className="navbar-list">
                  <Link className="navbar-brand" to="/dashboard">
                    <img src="http://maxilare.nuovo.com.br/wp-content/uploads/2019/08/marca_maxilare-maior.png" width="200" height="67" className="d-inline-block align-top" alt="" />
                  </Link>
                </div>
                <ul className="navbar-list navbar-bottom-links">
                  <li>
                    <a href="/" onClick={this.logout}>Sair</a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
      )
    }
};

export default Header;
