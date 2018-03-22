
# callbag-couchdb

Callbags for streaming couchdb data

## Install

```sh
npm i callbag-couchdb
```

## Usage

### `allDocs(db, params)`

See [CouchDB's `GET /{db}/_all_docs` endpoint](http://docs.couchdb.org/en/2.1.1/api/database/bulk-api.html#api-db-all-docs) for info.

Takes a `db` string and `params` and streams all the documents.

```js
const { pipe, forEach } = require('callbag-basics')
const { allDocs } = require('callbag-couchdb')

pipe(
  allDocs('http://root:root@localhost:8000/some_store'),
  forEach(console.log)
)
```

### `saveEach(db)`

See [CouchDB's `POST /{db}` endpoint](http://docs.couchdb.org/en/2.1.1/api/database/common.html#post--db) for info.

Takes a `db` string and inserts the documents.  Produces objects indicated if it succeeded and the resulting IDs.

```js
const { pipe, fromIter, forEach } = require('callbag-basics')
const { saveEach } = require('callbag-couchdb')

pipe(
  fromIter([
    { foo: 1, bar: 'Hello world' },
    { foo: 1, bar: 'foobar bazu qux' },
    { foo: 2, bar: 'testing 123' }
  ]),
  saveEach('http://root:root@localhost:8000/some_store'),
  forEach(console.log)
)
```
