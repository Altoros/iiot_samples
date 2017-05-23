var rpiDhtSensor = require('rpi-dht-sensor');
var request = require('request');

var receiver = 'http://172.16.32.193:8080';
var dht = new rpiDhtSensor.DHT11(2);

function read () {
  var readout = dht.read();
  var data = {
    temperature: readout.temperature.toFixed(2),
    humidity: readout.humidity.toFixed(2)
  };
  console.log(data);
  data.device = 'raspberry';
  request.post({url: receiver, form: data}, function(err) {
    if(err) console.log('Failed to send to ' + receiver);
  });
  setTimeout(read, 1000);
}

read();
