import faunadb from 'faunadb';
import client from './utils/key';

const q = faunadb.query

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  console.log("Function `users-create` invoked", data);
  const todoItem = {
    data: data
  };

  return client.query(q.Create(q.Ref("classes/users"), todoItem))
  .then((response) => {
    console.log("success", response)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
};
