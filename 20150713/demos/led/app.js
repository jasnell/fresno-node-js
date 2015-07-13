var Bluemix = require('./bm');
var LED = require('./led');

// set up our connection to bluemix,
var options = {
  org: '{yourorg}',
  type: '{yourtype}',
  id: '{yourdeviceid}',
  token: '{yourdevicetoken}',
  cmds: ['color','off','on','done','test'],
};
var led_options = {
  red:11,
  green:9,
  blue:10
};

var led = LED(led_options);
led.on('ready', function() {
  // our local connection to the arduino is established,
  // our LED has been initialized, let's connect to
  // node-red on bluemix now
  var bm = Bluemix(options);
  bm.on('ready', function() {
    // we're connected to node-red and ready to proceed!
    console.log('ready to go');
  })
  .on('color', function(msg) {
    // node-red told us to change the led color
    led.turnon(msg.color);
  })
  .on('on', function() {
    // node-red told us to turn the light on
    led.turnon();
  })
  .on('off', function() {
    // node-red told us to turn the light off
    led.turnoff();
  })
  .on('done', function() {
    // node-red told us to go away
    led.turnoff();
    bm.end();
  })
  .on('test', function() {
    // runs a test sequence... red, green, blue, off
    setImmediate(function() {
      led.red();
      setTimeout(function() {
        led.green();
        setTimeout(function() {
          led.blue();
          setTimeout(function() {
            led.turnoff();
          }, 500);
        }, 500);
      }, 500);
    });
  })
  .on('end', function() {
    // node-red told us to go away
    console.log('all done');
    process.exit(0);
  });
});
