const canvas = new fabric.Canvas('canvas', {
  preserveObjectStacking: true
});

// Set tampilan kecil, tapi tetap HD secara internal
canvas.setDimensions({ width: 540, height: 540 }, { cssOnly: true });

let frameObject;

function addFrameOverlay() {
  const frameURL = 'assets/frame.png';
  fabric.Image.fromURL(frameURL, function (img) {
    img.set({
      left: 0,
      top: 0,
      selectable: false,
      evented: false,
      scaleX: canvas.width / img.width,
      scaleY: canvas.height / img.height
    });
    frameObject = img;
    canvas.add(img);
    canvas.bringToFront(img);
  });
}

addFrameOverlay();

document.getElementById('upload').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = function (f) {
    fabric.Image.fromURL(f.target.result, function (img) {
      img.set({
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: 'center',
        originY: 'center',
        hasRotatingPoint: false,
        lockRotation: true,
        lockScalingFlip: true,
        selectable: true
      });
      img.scaleToWidth(canvas.width * 0.75);
      canvas.add(img);
      canvas.setActiveObject(img);
      if (frameObject) canvas.bringToFront(frameObject);
    });
  };
  reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('download').addEventListener('click', function () {
  setTimeout(() => {
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'Coinfest_Twibbon.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 100);
});
