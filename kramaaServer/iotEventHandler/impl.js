var mqtt = require('mqtt')

// var net = require('net')
// var mqttCon = require('mqtt-connection')
// var server = new net.Server()
//
// server.on('connection', function (stream) {
//   var client = mqttCon(stream)
//
//   // client connected
//   client.on('connect', function (packet) {
//     // acknowledge the connect packet
//     client.connack({ returnCode: 0 });
//   })
//
//   // client published
//   client.on('publish', function (packet) {
//     // send a puback with messageId (for QoS > 0)
//     client.puback({ messageId: packet.messageId })
//   })
//
//   // client pinged
//   client.on('pingreq', function () {
//     // send a pingresp
//     client.pingresp()
//   });
//
//   // client subscribed
//   client.on('subscribe', function (packet) {
//     // send a suback with messageId and granted QoS level
//     client.suback({ granted: [packet.qos], messageId: packet.messageId })
//   })
//
//   // timeout idle streams after 5 minutes
//   stream.setTimeout(1000 * 60 * 5)
//
//   // connection error handling
//   client.on('close', function () { client.destroy() })
//   client.on('error', function () { client.destroy() })
//   client.on('disconnect', function () { client.destroy() })
//
//   // stream timeout
//   stream.on('timeout', function () { client.destroy(); })
// })
//
// // listen on port 1883
// server.listen(1883)


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
