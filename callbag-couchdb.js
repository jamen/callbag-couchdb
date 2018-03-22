
const fetch = require('isomorphic-fetch')
const qs = require('@jamen/query-string')

exports.allDocs = (db, opts) => {
  return function source (start, sink) {
    if (start !== 0) return

    sink(0, source)

    fetch(db + '/_all_docs' + qs.encode(opts), {
      headers: {
        "Accept": "application/json"
      }
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data.error) {
        return sink(1, data)
      }
      for (var i = 0; i < data.total_rows; i++) {
        sink(1, data.rows[i])
      }
    })
  }
}

exports.saveEach = (db) => (source) => (start, sink) => {
  if (start !== 0) return

  source(0, (type, data) => {
    if (type !== 1) return sink(type, data)

    fetch(db, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      sink(1, data)
    })
  })
}
