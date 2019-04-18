//TODO: Extract kothic-leaflet to another project
window.L.Kothic = require("kothic");

//window.MapCSS = require("./src/style/mapcss");

// if (options && typeof options.devicePixelRatio !== 'undefined') {
//     this.devicePixelRatio = options.devicePixelRatio;
// } else {
//     this.devicePixelRatio = 1;
// }

// if (typeof canvas === 'string') {
// TODO: Avoid document
//     canvas = document.getElementById(canvas);
// }
// TODO: Consider moving this logic outside
// var devicePixelRatio = 1; //Math.max(this.devicePixelRatio || 1, 2);

// if (devicePixelRatio !== 1) {
//     canvas.style.width = width + 'px';
//     canvas.style.height = height + 'px';
//     canvas.width = canvas.width * devicePixelRatio;
//     canvas.height = canvas.height * devicePixelRatio;
// }
// ctx.scale(devicePixelRatio, devicePixelRatio);


window.Kothic.loadJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        try {
          callback(JSON.parse(xhr.responseText));
        } catch (err) {
          console.error(url, err);
        }
      } else {
        console.debug("failed:", url, xhr.status);
      }
    }
  }
  xhr.open("GET", url, true);
  xhr.send(null);
}
