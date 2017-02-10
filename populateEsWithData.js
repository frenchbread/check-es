const moment = require('moment');
const es = require('elasticsearch');
const uuid = require('node-uuid');
const config = require('./config');

// Init elastisearch client
const client = new es.Client({
  host: config.host
})

// Init start date
const dateStart = moment(new Date("January 01, 2017 10:10:00"))
// Init date today => iterate till that date
const dateNow = moment()

const diff = dateNow.diff(dateStart, 'days')

for (let i = 0; i < diff; i++) {
  const logDate = dateStart.add(1, 'days')
  const amount = Math.floor(Math.random() * 100) + 20
  for (let j = 0; j < amount; j++) {
    const log = {
      index: 'mqt',
      type: 'analytics',
      id: uuid.v4(),
      body: {
        date: logDate.toDate(),
        type: 'on_message_delivered',
        username: 'admin'
      }
    }
    client.create(log, (err, res) => {
      if (err) console.error(err);
      // console.log(res);
    })
  }
}
