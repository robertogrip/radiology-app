/* Frontend code from src/utils/api.js */
/* Api methods to call /.netlify/functions */
const headers =  {'Content-Type': 'application/json'};
const baseUrl = '//localhost';

const auth = (data) => {
  return fetch(`${baseUrl}/auth`, {
    body: JSON.stringify(data),
    headers,
    method: 'POST'
  }).then(response => {
    return response.json();
  })
}

function restApi(Class) {
  const create = (data) => {
    return fetch(`${baseUrl}/${Class}/create`, {
      body: JSON.stringify(data),
      headers,
      method: 'POST'
    }).then(response => {
      return response.json();
    });
  };
  
  const get = (id) => {
    return fetch(`${baseUrl}/${Class}/${id}`).then((response) => {
      return response.json();
    });
  };
  
  const getAll = () => {
    return fetch(`${baseUrl}/${Class}`).then((response) => {
      return response.json();
    });
  };
  
  const update = (id, data) => {
    return fetch(`${baseUrl}/${Class}/${id}`, {
      body: JSON.stringify(data),
      headers,
      method: 'PUT'
    }).then(response => {
      return response.json();
    });
  };
  
  const Delete = (id) => {
    return fetch(`${baseUrl}/${Class}/${id}`, {
      headers,
      method: 'DELETE'
    }).then(response => {
      return response.json();
    });
  };

  return {
    get,
    create,
    getAll,
    update,
    delete: Delete
  };
};

const Api = {
  auth,
  users: new restApi('users'),
  todos: new restApi('exams')
};
  
export default Api;
