import React from 'react';
import { Link } from 'react-router-dom';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Header } from '../../components';

//import Api
import { Api, Confirm } from '../../utils';
const baseUrl = `//${window.location.hostname}${process.env.REACT_APP_API_BASE_URL}`;

class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOptions: 'create-user',
      uploadFiles: []
    };
    this.createItem = this.createItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.onUploadFileHandler = this.onUploadFileHandler.bind(this);
  }

  handleChange(event) {
    const newState = { ...this.state };
    newState[event.currentTarget.name || event.currentTarget.id] = event.currentTarget.value;

    this.setState(newState);
  }

  createItem(event) {
    event.preventDefault();
    const { props } = this;
    const { history, exams, updateState } = props;
    const { name, description, userOptions, user, content, uploadFiles } = this.state;
    this.setState({ loading: true });

    Api.exams
      .create({
        name,
        content,
        description,
        user: (userOptions !== 'create-user' && user) || null,
        uploadFiles
      })
      .then(response => {
        if (response.success) {
          if (userOptions === 'create-user') {
            Api.users.getAll({ user: response.data.user, level: '2' }).then(result => {
              updateState({
                users: (result && result.success && result.data) || null
              });
            });
          }

          Confirm.fire({
            title: 'Sucesso!',
            text: 'Exame criado com sucesso',
            type: 'success',
            confirmButtonText: 'Ok'
          }).then(() => {
            const newExams = exams;
            newExams.push(response.data);
            updateState({ exams: newExams });
            return history.push('/dashboard');
          });
        } else {
          Confirm.fire({
            title: 'Erro!',
            text: 'Novo exame não foi criado, tente novamente',
            type: 'error',
            confirmButtonText: 'Ok'
          });
        }
        this.setState({ loading: false });
      });
  }

  handleModelChange(content) {
    this.setState({
      content: draftToHtml(convertToRaw(content.getCurrentContent()))
    });
  }

  uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 20672a121e380ca');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }

  onUploadFileHandler(e) {
    const { state } = this;
    const file = e && e.target && e.target.files[0];

    if (!file) {
      Confirm.fire({
        title: 'Erro!',
        text: 'Não foi possível realizar o upload do arquivo, tente novamente',
        type: 'error',
        confirmButtonText: 'Ok'
      });
      e.target.value = '';
      return false;
    }

    const data = new FormData();
    data.append('file', file);
    e.target.value = '';
    Api.uploadFile(data).then(response => {
      if (response.success) {
        Confirm.fire({
          title: 'Sucesso!',
          text: 'Upload do arquivo realizado com sucesso',
          type: 'success',
          confirmButtonText: 'Ok'
        });

        const { uploadFiles } = state;
        uploadFiles.push(response.fileData);
        this.setState(uploadFiles);
      } else {
        Confirm.fire({
          title: 'Erro!',
          text: 'Não foi possível realizar o upload do arquivo, tente novamente',
          type: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  render() {
    const { state } = this;
    let editorText = '';
    const contentBlock = htmlToDraft(state.content || '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      editorText = editorState;
    }

    return (
      <div className="app-create-exam">
        <Header {...this.props} />
        <div className="container container-fluid fixed-navbar">
          <h2 className="display-4 font-22">Cadastrar exame</h2>
          <form onSubmit={this.createItem}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                required
                className="form-control"
                id="description"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="text-editor">Editor de conteúdo</label>
              <Editor
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                placeholder="Digite o conteúdo do exame"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: { uploadCallback: this.uploadImageCallBack, previewImage: true }
                }}
                defaultEditorState={editorText}
                onEditorStateChange={this.handleModelChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="text-editor">Quem vai ver este exame</label>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="userOptions"
                    id="user-options-1"
                    value="create-user"
                    checked={this.state.userOptions === 'create-user'}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="user-options-1">
                    Criar novo usuário
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="userOptions"
                    id="user-options-2"
                    value="select-user"
                    checked={this.state.userOptions !== 'create-user'}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="user-options-2">
                    Selecionar usuário existente
                  </label>
                </div>
              </div>
            </div>
            {this.state.userOptions !== 'create-user' && (
              <div className="row">
                <div className="form-group col-4">
                  <label htmlFor="user-select">Selecionar usuário</label>
                  <select
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.user}
                    id="user"
                  >
                    <option value="">Selecionar usuário</option>
                    {this.props &&
                      this.props.users &&
                      this.props.users
                        .filter(user => user.level !== '2')
                        .map(user => {
                          return (
                            <option key={user.id} value={user.id}>
                              {user.login}
                            </option>
                          );
                        })}
                  </select>
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="text-editor">Uploads</label>
              {(state.uploadFiles.length && (
                <div className="form-group">
                  <ul>
                    {state.uploadFiles.map(item => (
                      <li key={item.id}>
                        <a href={`${baseUrl}${item.path}`}>{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )) ||
                null}
              <div className="form-group">
                <input type="file" className="input-group" onChange={this.onUploadFileHandler} />
              </div>
            </div>
            <button type="submit" className={`btn btn-primary ${state.loading ? 'loading' : ''}`}>
              Salvar
            </button>
            <Link to="/dashboard" className="btn btn-outline-secondary">
              Voltar
            </Link>
            {state.loading && <div className="loader"></div>}
          </form>
        </div>
      </div>
    );
  }
}

export default Exam;
