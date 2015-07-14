var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
  var servos = [3,5,6].map(
    function(pin) {
      var servo = new five.Servo(pin);
      servo.center();
      return servo;
    }
  );
  var controller = {
    shoulder: servos[0],
    elbow: servos[1],
    wrist: servos[2],
    wave: function() {
      this.shoulder.center();
      this.elbow.center();
      this.wrist.sweep(1000);
      setTimeout(this.stop, 2000);
    },
    handsup: function() {
      this.shoulder.center();
      this.elbow.center();
      this.wrist.to(10);
    },
    stop: function() {
      this.shoulder.stop();
      this.elbow.stop();
      this.wrist.stop();
    },
    end: function() {
      process.end();
    }
  };
  this.repl.inject({c:controller});
});

