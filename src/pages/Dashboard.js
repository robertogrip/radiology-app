import React from 'react';
import { Link } from 'react-router-dom';
import ListExams  from '../components/listExams';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="app-home">
        <header className="app-header">
          <nav className="navbar navbar-vertical navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
              Bootstrap
            </Link>
          </nav>
        </header>
        <div className="container container-fluid fixed-navbar">
          <ListExams />
        </div>
      </div>
    );
  }
}

export default Dashboard;
