
var mqtt = require('mqtt');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var _client = Symbol('client');
var regex_cmd = /iot-2\/cmd\/(\w+)\/fmt\/json/;

function Bluemix(options) {
  if (!(this instanceof Bluemix))
    return new Bluemix(options);
  EventEmitter.call(this);
  var emitter = this;
  var opts = {
    clientId: util.format("d:%s:%s:%s", options.org, options.type, options.id),
    username: 'use-token-auth',
    password: options.token
  };
  var host = util.format(
    'mqtt://%s.messaging.internetofthings.ibmcloud.com',
    options.org);
  var client = this[_client] = mqtt.connect(host, opts);
  this[_client].on('connect', function() {
    var cmds = options.cmds;
    if (Array.isArray(cmds)) {
      cmds.forEach(function(cmd) {
        if (typeof cmd === 'string') {
          client.subscribe(util.format('iot-2/cmd/%s/fmt/json',cmd), {qos:0});
        }
      });
    }
    client.publish(
      'iot-2/evt/status/fmt/json',
      JSON.stringify({d: {ready: true}}), {qos:0}, function() {
        console.log('sent');
      }
    );
    emitter.emit('ready');
  });
  this[_client].on('message', function(topic, message) {
    var cmd = regex_cmd.exec(topic);
    if (cmd && cmd[1]) {
      var msg = JSON.parse(message);
      emitter.emit(cmd[1], msg.d);
    }
  });
}
util.inherits(Bluemix, EventEmitter);

Bluemix.prototype.end = function() {
  this[_client].end();
  this.emit('end');
};

module.exports = Bluemix;
