var five = require("johnny-five");
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var _board = Symbol('board');
var _led = Symbol('led');

function LED(options) {
  if (!(this instanceof LED))
    return new LED(options);
  EventEmitter.call(this);
  var board = this[_board] = new five.Board();
  var emitter = this;
  board.on('ready', function() {
    var led = emitter[_led] = new five.Led.RGB({
      pins: {
        red: options.red,
        blue: options.blue,
        green: options.green
      },
      isAnode: true
    });
    led.off();
    emitter.emit('ready');
  });
}
util.inherits(LED,EventEmitter);

LED.prototype.turnon = function(color) {
  var led = this[_led];
  if (color) this.color(color);
  led.on();
  this.emit('on', color);
};

LED.prototype.turnoff = function() {
  var led = this[_led];
  led.off();
  this.emit('off');
};

LED.prototype.color = function(color) {
  try {
    var led = this[_led];
    led.color(color);
    this.emit('color', color);
  } catch (e) {
    this.emit('badcolor',
      util.format('Invalid Color: %s', color));
  }
};

LED.prototype.red = function() {
  this.color('#FF0000');
};
LED.prototype.green = function() {
  this.color('#00FF00');
};
LED.prototype.blue = function() {
  this.color('#0000FF');
};

module.exports = LED;
