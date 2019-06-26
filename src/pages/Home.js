import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    if (match.params && match.params.id) {
      console.log(match.params.id);
    }
  }

  render() {
    return (
      <div className="app-home">
        <header className="app-header">
          <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
              Bootstrap
            </Link>
          </nav>
        </header>
      </div>
    );
  }
}

export default Home;
