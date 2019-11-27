import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header, ListExams } from '../components';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      term: '',
      activeSearch: false
    };

    this.HandleSearch = this.HandleSearch.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  HandleSearch(e) {
    const term = e.currentTarget && e.currentTarget.value;
    this.setState({ term });
  }

  toggleSearch() {
    this.setState(oldState => {
      return { activeSearch: !oldState.activeSearch };
    });
  }

  render() {
    const { props, state } = this;

    const filteredExams =
      (state.activeSearch &&
        state.term &&
        props.exams.filter(
          item => item.name.includes(state.term) || item.description.includes(state.term)
        )) ||
      props.exams;

    return (
      <div className="app-dashboard">
        <Header {...props} />
        <div className="container container-fluid fixed-navbar">
          <div className="app-list-exams">
            <div className="row">
              <div className="col-12">
                <div className="row center-items">
                  <div className="col-3">
                    <h2 className="display-4 font-22">Lista de exames</h2>
                  </div>
                  <div className="col-9 text-right">
                    <input
                      type="text"
                      onChange={this.HandleSearch}
                      placeholder="Digite para pesquisar"
                      className={`input-group input-search ${state.activeSearch ? 'active' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={this.toggleSearch}
                      className={`btn btn-secondary button-search ${
                        state.activeSearch ? 'active' : ''
                      }`}
                    >
                      Pesquisar
                    </button>
                    <Link to="/exam/create" className="btn btn-primary btn-full-width">
                      Cadastrar exame
                    </Link>
                  </div>
                </div>
                <ul className="list-group exams-list">
                  <ListExams {...props} exams={filteredExams} />
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
