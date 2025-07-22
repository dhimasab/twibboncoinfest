const canvas = new fabric.Canvas('canvas', {
  preserveObjectStacking: true
});

let frameObject; // buat nyimpen frame twibbon

// Tambah layer background putih
const background = new fabric.Rect({
  left: 0,
  top: 0,
  fill: 'white',
  width: 1080,
  height: 1080,
  selectable: false,
  evented: false
});
canvas.add(background);
canvas.sendToBack(background);

// Tambah twibbon frame
function addFrameOverlay() {
  const frameURL = 'assets/frame.png';
  fabric.Image.fromURL(frameURL, function (img) {
    img.set({
      left: 0,
      top: 0,
      selectable: false,
      evented: false,
      scaleX: canvas.width / 1080,
      scaleY: canvas.height / 1080
    });
    frameObject = img;
    canvas.add(img);
    canvas.bringToFront(img);
  });
}

addFrameOverlay();

// Upload gambar pengguna
document.getElementById('upload').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = function (f) {
    fabric.Image.fromURL(f.target.result, function (img) {
      img.set({
        left: 540 * (canvas.width / 1080),
        top: 540 * (canvas.height / 1080),
        originX: 'center',
        originY: 'center',
        hasRotatingPoint: false,
        lockRotation: true,
        lockScalingFlip: true,
        selectable: true
      });
      img.scaleToWidth(800 * (canvas.width / 1080));
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

// Resize canvas agar responsif
function resizeCanvas() {
  const containerWidth = document.getElementById('canvas').parentElement.clientWidth;
  const scale = containerWidth / 1080;

  canvas.setWidth(1080 * scale);
  canvas.setHeight(1080 * scale);
  canvas.renderAll();
}

// Trigger saat load dan saat window diresize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
