import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class ListExams extends React.Component {
  render() {
    const { props } = this;
    if (!props || !props.exams || !props.exams.length) {
        return null;
    }

    return (
      <div className="app-list-exams">
        <div className="row">
            <div className="col-12">
                <div className="row center-items">
                    <div className="col-9">
                        <h2 className="display-4 font-22">Lista de exames</h2>
                    </div>
                    <div className="col-3 text-right">
                        <Link to="/exam/create" className="btn btn-primary">Cadastrar exame</Link>
                    </div>
                </div>
                <ul className="list-group exams-list">
                    { props.exams.map((exam, index) => {
                        return (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center exam">
                                <div className="exam-name">{exam.name}</div>
                                <div className="exam-actions">
                                    <Link to={`/exam/edit/${exam.id}`} className="btn btn-outline-secondary btn-inline">Editar</Link>
                                    <button type="button" className="btn btn-outline-danger">Excluir</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    </div>
    );
  }
}

export default ListExams;
