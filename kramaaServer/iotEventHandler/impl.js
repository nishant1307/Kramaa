var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com', {
  clientId: 'clientId-inejrnwsoH'
})

client.on('connect', function () {
  client.subscribe('Tanmay', function (err) {
    if (!err) {
      console.log("Subcribed");
    }
  })
})

let eventMessage;
var db = require('../database/models/index');
var IotEvent= db.iotEvents;
client.on('message', function (topic, message) {
  eventMessage = message.toString().split(';');
  let splitMessage=[]
  for(let i=0; i<eventMessage.length; i++){
    let newMessage = new Object();
    newMessage.message= eventMessage[i].split(':')[1];
    newMessage.eventType = eventMessage[i].split(':')[0];
    splitMessage.push(newMessage);
  }
  console.log(splitMessage);
  IotEvent.bulkCreate(splitMessage).then(()=> {

  })


})

module.exports = {
  getEvents: (req, res) => {
    IotEvent.findAll().then(events => {
      res.send({eventList: events});
    })
  },

  getLocation: (req, res) => {
    let latitude, longitude;
    IotEvent.findOne({
      where: {
        eventType: 'Latitude'
      }
    }).then(event => {
      latitude= event.message;
      IotEvent.findOne({
        where: {
          eventType: 'Longitude'
        }
      }).then(result => {
        longitude = result.message;
        res.send({latitude: latitude, longitude: longitude});
      })
    })
  }
}
