import faunadb from 'faunadb'
import getId from './utils/getId'
import client from './utils/key';

const q = faunadb.query

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const id = getId(event.path)
  console.log(`Function 'users-update' invoked. update id: ${id}`)
  return client.query(q.Update(q.Ref(`classes/users/${id}`), {data}))
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