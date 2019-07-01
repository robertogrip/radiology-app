import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header, ListUsers }  from '../components';
import Api from '../utils/api';

class Users extends React.Component {
  componentDidMount() {
    const { props } = this;

    if (props.user && props.user.id && props.user.level) {
      Api.users.getAll({ user: props.user.id, level: props.user.level })
        .then(result => {
          this.setState({
            users: (result && result.success && result.data) || null
          });
        });
    }
  }

  render() {
    return (
      <div className="app-home">
        <Header {...this.props} />
        <div className="container container-fluid fixed-navbar">
          <ListUsers users={this.state && this.state.users} />
        </div>
      </div>
    );
  }
}

export default Users;
