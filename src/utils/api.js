/* Frontend code from src/utils/api.js */
/* Api methods to call /.netlify/functions */

function restApi(Class) {
  const create = (data) => {
    return fetch(`/.netlify/functions/${Class}-create`, {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json()
    })
  }
  
  const readAll = () => {
    return fetch(`/.netlify/functions/${Class}-read-all`).then((response) => {
      return response.json()
    })
  }
  
  const update = (id, data) => {
    return fetch(`/.netlify/functions/${Class}-update/${id}`, {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json()
    })
  }
  
  const Delete = (id) => {
    return fetch(`/.netlify/functions/${Class}-delete/${id}`, {
      method: 'POST',
    }).then(response => {
      return response.json()
    })
  }
  
  const batchDelete = (ids) => {
    return fetch(`/.netlify/functions/${Class}-delete-batch`, {
      body: JSON.stringify({
        ids
      }),
      method: 'POST'
    }).then(response => {
      return response.json()
    })
  }

  return {
    create,
    readAll,
    update,
    delete: Delete,
    batchDelete: batchDelete
  }
};

const Api = {
  users: new restApi('users'),
  todos: new restApi('todos')
}
  
export default Api;