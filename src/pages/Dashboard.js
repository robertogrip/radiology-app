import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header, ListExams }  from '../components';
import { Api } from '../utils';

class Dashboard extends React.Component {
  componentDidMount() {
    const { props } = this;

    if (props.user && props.user.id && props.user.level && !props.exams) {
      Api.exams.getAll({ user: props.user.id, level: props.user.level })
        .then(result => {
          props.updateState({
            exams: (result && result.success && result.data) || null
          });
        });
    }
  }

  render() {
    const { props } = this;
  
    return (
      <div className="app-dashboard">
        <Header {...props} />
        <div className="container container-fluid fixed-navbar">
          <div className="app-list-exams">
            <div className="row">
              <div className="col-12">
                <div className="row center-items">
                  <div className="col-9">
                    <h2 className="display-4 font-22">Lista de exames</h2>
                  </div>
                  <div className="col-3 text-right">
                    <Link to="/exam/create" className="btn btn-primary">Cadastrar exame</Link>
                  </div>
                </div>
                <ul className="list-group exams-list">
                  <ListExams { ...props } />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
