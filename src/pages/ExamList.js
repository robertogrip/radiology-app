import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { HeaderNormal } from '../components';

class ExamList extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    if (match.params && match.params.id) {
      console.log(match.params.id);
    }
  }

  render() {
    return (
      <div className="app-exam-list">
        <HeaderNormal {...this.props} />
      </div>
    );
  }
}

export default ExamList;
