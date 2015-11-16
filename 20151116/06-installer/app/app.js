var fs = require('fs');
var canvasBuffer = require('electron-canvas-to-buffer');
var path = require('path');
var counter = 0;
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
        alert('Could not connect stream');
    }
);

function doNotify() {
    var options = {
        title: "Snapshot Created",
        body: "Successfully saved new snap of your video",
        icon: path.join(__dirname, 'image-' + counter + '.png')
    };

    new Notification(options.title, options);
}

function snapshot() {
    if (localMediaStream) {
        ctx.drawImage(video, 0, 0, 640, 480);

        var buffer = canvasBuffer(canvas, 'image/png');
        var snapshots = document.getElementById('snapshots');

        var link = document.createElement('a');
        link.href = '#';
        link.setAttribute("image","image-" + counter + ".png");
        link.onclick = function() {
            var exec = require('child_process').exec;
            exec('open ' + this.getAttribute('image'), function callback(error, stdout, stderr) {
            });
        }

        var photo = document.createElement("img");
        photo.src = canvas.toDataURL('image/webp');
        photo.style.cssText = "padding-bottom:10px";

        link.appendChild(photo);
        snapshots.insertBefore(link, snapshots.firstChild);

        var nolabel = document.getElementById('nonelabel');
        nolabel.style.visibility = 'hidden';

        fs.writeFile('image-' + counter + '.png', buffer, function (err) {
          if (err) throw err;
          doNotify();
          counter++;
        });
    }
}

capture.addEventListener('click', snapshot, false);
