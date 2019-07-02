import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class ListExams extends React.Component {
  render() {
    const { props } = this;
    if (!props || !props.exams || !props.exams.length) {
        return null;
    }

    return props.exams.map((exam, index) => {
        return (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center exam">
                <div className="exam-name">{exam.name}</div>
                <div className="exam-actions">
                    <Link to={`/exam/edit/${exam.id}`} className="btn btn-outline-secondary btn-inline">Editar</Link>
                    <button type="button" className="btn btn-outline-danger">Excluir</button>
                </div>
            </li>
        )
    });
  }
}

export default ListExams;
