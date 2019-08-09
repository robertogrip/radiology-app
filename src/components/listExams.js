import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Api, Confirm } from '../utils';

class ListExams extends React.Component {
    constructor() {
        super();
        this.printItem = this.printItem.bind(this);
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

    printItem(event) {
        const { props } = this;
        const { users, exams } = props;
        const dataId = event.currentTarget.getAttribute('data-id');

        const exam = exams && exams.filter(exam => exam.id === dataId)[0];
        const user = users && users.filter(user => user.id === exam.user)[0];

        if (!exam || !user) return null;

        var mywindow = window.open('', 'PRINT', `height=${window.innerHeight},width=${window.innerWidth}`);

        mywindow.document.write(`<html>
            <head>
                <title>${exam.name}</title>
                <link type="text/css" rel="stylesheet" href="//fonts.googleapis.com/css?family=Quicksand%7COpen+Sans:400,600" id="avia-google-webfont" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <style>* { font-family: "Quicksand", "Open Sans", sans-serif; }</style>
            </head>
            <body class="container">
                <br />
                <div class="card">
                    <h5 class="card-header">${exam.name}</h5>
                    <div class="card-body">
                        <h5 class="card-title">${exam.description}</h5>
                        <p>Login: ${user.login}</p>
                        <p>Senha: ${user.password}</p>
                        <small>Com o login e a senha, você pode visualizar o resultado no link: 
                            <a href="resultado.maxilare.com.br">resultado.maxilare.com.br</a>
                        </small><br />
                        <small>O exame deve ficar pronto dentro de 7 dias.</small>
                    </div>
                </div>
                <br />
            </body>
        </html>`);

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.addEventListener('load', () => {
            mywindow.print();
            mywindow.close();
        }, false);

        return true;
    }

    render() {
        const { props } = this;
        if (!props || !props.exams) return <div className="loader" />;
        
        if (!props.exams.length) return <li className="list-group-item d-flex justify-content-between align-items-center exam">Não há exames para mostrar</li>;

        return props.exams.map((exam, index) => {
            return (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center exam">
                    <div className="exam-name">{exam.name}</div>
                    <div className="exam-actions">
                        <button className="btn btn-primary btn-inline" onClick={this.printItem} data-id={exam.id}>Imprimir</button>
                        <Link to={`/exam/edit/${exam.id}`} className="btn btn-outline-secondary btn-inline">Editar</Link>
                        <button type="button" className="btn btn-outline-danger" onClick={this.deleteItem} data-id={exam.id}>Excluir</button>
                    </div>
                </li>
            )
        });
    }
}

export default ListExams;
