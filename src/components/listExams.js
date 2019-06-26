import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class ListExams extends React.Component {
  render() {
    return (
      <div className="app-list-exams">
        <div className="row">
            <div className="col-12">
                <div className="row center-items">
                    <div className="col-6">
                        <h2 className="display-4 font-22">Lista de exames cadastrados</h2>
                    </div>
                    <div className="col-6 text-right">
                        <Link to="/exam/create" className="btn btn-primary">Criar exame</Link>
                    </div>
                </div>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Cras justo odio
                        <Link to={`/exam/edit/${123456}`}>Editar</Link>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Dapibus ac facilisis in
                        <Link to={`/exam/edit/${123456}`}>Editar</Link>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Morbi leo risus
                        <Link to={`/exam/edit/${123456}`}>Editar</Link>
                    </li>
                    </ul>
            </div>
        </div>
    </div>
    );
  }
}

export default ListExams;
