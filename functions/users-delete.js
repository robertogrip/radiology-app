import faunadb from 'faunadb'
import getId from './utils/getId'
import client from './utils/key';

const q = faunadb.query

exports.handler = (event, context, callback) => {
  const id = getId(event.path)
  console.log(`Function 'users-delete' invoked. delete id: ${id}`)
  return client.query(q.Delete(q.Ref(`classes/users/${id}`)))
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
}