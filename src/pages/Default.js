import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header } from '../components';

class Default extends React.Component {
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
        <Header {...this.props} />
      </div>
    );
  }
}

export default Default;
