import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Api, Confirm } from '../utils';

class ListExams extends React.Component {
    constructor() {
        super();
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(event) {
        const { props } = this;
        let exams = props.exams;

        const id = event.currentTarget.getAttribute('data-id');
        Confirm.fire({
            title: 'Deseja excluir este exame',
            type: 'question',
            showCancelButton: true,
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return Api.exams.delete(id)
            },
            allowOutsideClick: () => !Confirm.isLoading()
        }).then((result) => {
            if (result.value) {
                exams = exams.filter(exam => exam.id !== id);
                props.updateState({exams});
                Confirm.fire(
                    'Deletado!',
                    'O exame foi deletado.',
                    'success'
                );
            }
        });
    }

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
                        <button type="button" className="btn btn-outline-danger" onClick={this.deleteItem} data-id={exam.id}>Excluir</button>
                    </div>
                </li>
            )
        });
    }
}

export default ListExams;
