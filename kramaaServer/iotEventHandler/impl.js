var mqtt = require('mqtt')

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})


var db = require('../database/models/index');
// const web3Handler = require('../web3Handler/ropstenHandler');

var Project = db.project;
module.exports = {
  getEvents: (req, res) => {
    Project.findOne({
      where: {
        uniqueId: req.body.projectID
      }
    }).then(project => {
      web3Handler.checkTotalTokenSupply(project.tokenContractAddress).then(totalSupply=> {
        res.send({project: project, totalSupply: totalSupply});
      })
    })
  },
}
