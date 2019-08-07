import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { HeaderNormal, ListExamsView } from '../components';

class ExamList extends React.Component {
  render() {
    const { props } = this;
    return (
      <div className="app-exam-list">
        <HeaderNormal {...this.props} />
        <div className="container fixed-normal-navbar">
          <div className="app-list-exams">
            <div className="row">
              <div className="col-12">
                <div className="row center-items">
                  <div className="col-9">
                    <h2 className="display-4 font-22">Lista de exames</h2>
                  </div>
                </div>
                <ul className="list-group exams-list">
                  <ListExamsView { ...props } />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamList;
