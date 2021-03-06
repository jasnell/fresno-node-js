var fs = require('fs');
var canvasBuffer = require('electron-canvas-to-buffer');

var localMediaStream = null;
var video = document.querySelector('video');
var capture = document.querySelector('button');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

navigator.webkitGetUserMedia({video: true},
    function(stream) {
        document.getElementById('camera').src = URL.createObjectURL(stream);
        localMediaStream = stream;
    },
    function() {
        alert('could not connect stream');
    }
);

function snapshot() {
    if (localMediaStream) {
        ctx.drawImage(video, 0, 0, 640, 480);
        document.querySelector('img').src = canvas.toDataURL('image/webp');

        var buffer = canvasBuffer(canvas, 'image/png');

        fs.writeFile('image.png', buffer, function (err) {
          throw err
        });
    }
}

capture.addEventListener('click', snapshot, false);
