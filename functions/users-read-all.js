import faunadb from 'faunadb'
import client from './utils/key';

const q = faunadb.query

exports.handler = (event, context, callback) => {
  console.log("Function `users-read-all` invoked")
  return client.query(q.Paginate(q.Match(q.Ref("indexes/all_users"))))
  .then((response) => {
    const todoRefs = response.data
    console.log("Todo refs", todoRefs)
    console.log(`${todoRefs.length} todos found`)
    const getAllTodoDataQuery = todoRefs.map((ref) => {
      return q.Get(ref)
    })
    return client.query(getAllTodoDataQuery).then((ret) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(ret)
      })
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}