import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header, ListExams }  from '../components';
import Api from '../utils/api';

class Dashboard extends React.Component {
  componentDidMount() {
    const { props } = this;

    if (props.user && props.user.id && props.user.level) {
      Api.exams.getAll({ user: props.user.id, level: props.user.level })
        .then(result => {
          this.setState({
            exams: (result && result.success && result.data) || null
          });
        });
    }
  }

  render() {
    return (
      <div className="app-home">
        <Header {...this.props} />
        <div className="container container-fluid fixed-navbar">
          <ListExams exams={this.state && this.state.exams} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
