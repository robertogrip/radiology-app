/* Frontend code from src/utils/api.js */
/* Api methods to call /.netlify/functions */
const headers = { 'Content-Type': 'application/json' };
// const baseUrl = `//${window.location.hostname}/resultado/api`;
// const baseUrl = `//${window.location.hostname}/api`;
const baseUrl = `//${window.location.hostname}${process.env.REACT_APP_API_BASE_URL}`;

const apiFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return response.json();
  }
  catch (err) {
    console.warn('Houve um problema ao se conectar com o servidor, tente novamente.', err);
  }
};

const uploadFile = data => {
  return apiFetch(`${baseUrl}/uploadFile`, {
    body: data,
    method: 'POST'
  });
};

const auth = data => {
  return apiFetch(`${baseUrl}/auth`, {
    body: JSON.stringify(data),
    headers,
    method: 'POST'
  });
};

function restApi(Class) {
  const create = data => {
    return apiFetch(`${baseUrl}/${Class}`, {
      body: JSON.stringify(data),
      headers,
      method: 'POST'
    });
  };

  const get = id => {
    return apiFetch(`${baseUrl}/${Class}/${id}`, {
      headers,
      method: 'GET'
    });
  };

  const getAll = data => {
    return apiFetch(`${baseUrl}/${Class}`, {
      headers: {
        ...headers,
        ...data
      },
      method: 'GET'
    });
  };

  const update = (id, data) => {
    return apiFetch(`${baseUrl}/${Class}/${id}`, {
      body: JSON.stringify(data),
      headers,
      method: 'PUT'
    });
  };

  const Delete = id => {
    return apiFetch(`${baseUrl}/${Class}/${id}`, {
      headers,
      method: 'DELETE'
    });
  };

  return {
    get,
    create,
    getAll,
    update,
    delete: Delete
  };
}

const Api = {
  auth,
  uploadFile,
  users: new restApi('users'),
  exams: new restApi('exams')
};

export default Api;
