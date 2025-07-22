const canvas = new fabric.Canvas('canvas', {
  preserveObjectStacking: true
});

let frameObject; // buat nyimpen frame twibbon

// Tambah layer background putih
const background = new fabric.Rect({
  left: 0,
  top: 0,
  fill: 'white',
  width: canvas.getWidth(),
  height: canvas.getHeight(),
  selectable: false,
  evented: false
});
canvas.add(background);
canvas.sendToBack(background);

function addFrameOverlay() {
  const frameURL = 'assets/frame.png';
  fabric.Image.fromURL(frameURL, function (img) {
    img.set({
      left: 0,
      top: 0,
      selectable: false,
      evented: false
    });
    img.scaleToWidth(1080);
    img.scaleToHeight(1080);
    frameObject = img;
    canvas.add(img);
    canvas.bringToFront(img);
  });
}

addFrameOverlay();

// Upload gambar
document.getElementById('upload').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = function (f) {
    fabric.Image.fromURL(f.target.result, function (img) {
      img.set({
        left: 540,
        top: 540,
        originX: 'center',
        originY: 'center',
        hasRotatingPoint: false,
        lockRotation: true,
        lockScalingFlip: true,
        selectable: true
      });
      img.scaleToWidth(800);
      canvas.add(img);
      canvas.setActiveObject(img);
      if (frameObject) canvas.bringToFront(frameObject);
    });
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Download hasil twibbon
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
