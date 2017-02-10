const elasticsearch = require('elasticsearch');
const config = require('./config/index.js');
const client = new elasticsearch.Client({
  host: config.host
});

client.search({size: 10000}).then(function (resp) {
    var hits = resp.hits.hits;
    console.log(hits.length);
}, function (err) {
    console.trace(err.message);
});
