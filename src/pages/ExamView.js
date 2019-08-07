import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { HeaderNormal }  from '../components';

class ExamView extends React.Component {
  constructor(props) {
    super(props);
    const { exams, match } = props;
    this.state = (exams && exams.filter(exams => exams.id === match.params.id)[0]) || {};
  }

  componentWillReceiveProps (props) {
    const { exams, match } = props;
    if (exams) {
      this.setState(exams.filter(exams => exams.id === match.params.id)[0]);
    }
  }

  render() {
    const { props, state } = this;
  
    return (
      <div className="app-exam-view">
        <HeaderNormal {...props} />
        <div className="container fixed-normal-navbar">
          <div className="app-list-exams">
            <div className="row">
              <div className="col-12">
                <div className="row center-items">
                  <div className="col-12">
                    <h2 className="display-4 font-22">
                      { state.name || '' }
                      <small className="text-muted">{ state.description || '' }</small>
                    </h2>
                    <div className="exam-content" dangerouslySetInnerHTML={{__html: state.content || '' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamView;
