import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { HeaderNormal }  from '../components';
const baseUrl = `//${window.location.hostname}${process.env.REACT_APP_API_BASE_URL}`;

class ExamView extends React.Component {
  constructor(props) {
    super(props);
    const { exams, match } = props;
    this.state = (exams && exams.filter(exams => exams.id === match.params.id)[0]) || {};
    this.printItem = this.printItem.bind(this);
  }

  componentWillReceiveProps (props) {
    const { exams, match } = props;
    if (exams) {
      this.setState(exams.filter(exams => exams.id === match.params.id)[0]);
    }
  }

  printItem() {
    window.print();
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
                      <div className="row">
                        <div className="col-9">
                          { state.name || '' }
                        </div>
                        <div className="col-3 text-right">
                          <button className="btn btn-primary btn-inline" onClick={this.printItem} data-id={state.id}>Imprimir</button>
                          <Link to="/exam/list" className="btn btn-outline-secondary">Voltar</Link>
                        </div>
                      </div>
                      <small className="text-muted">{ state.description || '' }</small>
                    </h2>
                  </div>
                  <div className="col-12">
                    <div className="exam-content" dangerouslySetInnerHTML={{__html: state.content || '' }} />
                  </div>
                  {(state.uploadFiles && state.uploadFiles.length && (
                    <div className="col-12 upload-files">
                      <label htmlFor="text-editor">Uploads</label>
                      <div className="form-group">
                        <ul>
                          {state.uploadFiles.map(item => (
                            <li key={item.id}>
                              <a href={`${baseUrl}${item.path}`} target="_blank" rel="noopener noreferrer">{item.name}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )) ||
                    null}
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
