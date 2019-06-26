import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header, ListExams }  from '../components';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="app-home">
        <Header {...this.props} />
        <div className="container container-fluid fixed-navbar">
          <ListExams />
        </div>
      </div>
    );
  }
}

export default Dashboard;
