
const { pipe, fromIter, forEach } = require('callbag-basics')
const { saveEach, allDocs } = require('../callbag-couchdb.js')

pipe(
  fromIter([
    { _id: '1', test: 'Hello world!' },
    { _id: '2', test: 'foobar baz qux' },
    { _id: '3', test: 'testing' }
  ]),
  saveEach('http://root:root@localhost:5984/callbag-test'),
  forEach(console.log)
)

pipe(
  allDocs('http://root:root@localhost:5984/callbag-test'),
  forEach(console.log)
)
