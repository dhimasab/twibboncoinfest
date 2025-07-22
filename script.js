const canvas = new fabric.Canvas('canvas', {
  preserveObjectStacking: true
});

let frameObject;
let background;

// Tambah background putih responsif
function addWhiteBackground() {
  if (background) canvas.remove(background);
  background = new fabric.Rect({
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
}

// Tambah twibbon frame
function addFrameOverlay() {
  const frameURL = 'assets/frame.png';
  console.log("🔍 Loading frame:", frameURL);

  fabric.Image.fromURL(frameURL, function (img) {
    if (!img) {
      console.error("❌ Gagal load twibbon frame!");
      return;
    }

    console.log("✅ Frame berhasil dimuat!");

    img.set({
      left: 0,
      top: 0,
      selectable: false,
      evented: false
    });

    img.scaleToWidth(canvas.getWidth());
    img.scaleToHeight(canvas.getHeight());

    frameObject = img;
    canvas.add(img);
    canvas.bringToFront(img);
  }, { crossOrigin: 'anonymous' });
}

// Upload gambar pengguna
document.getElementById('upload').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = function (f) {
    fabric.Image.fromURL(f.target.result, function (img) {
      img.set({
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        originX: 'center',
        originY: 'center',
        hasRotatingPoint: false,
        lockRotation: true,
        lockScalingFlip: true,
        selectable: true
      });
      img.scaleToWidth(canvas.getWidth() * 0.75);
      canvas.add(img);
      canvas.setActiveObject(img);
      if (frameObject) canvas.bringToFront(frameObject);
    }, { crossOrigin: 'anonymous' });
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

// Resize canvas agar responsif dan panggil ulang background + frame
function resizeCanvas() {
  const containerWidth = document.getElementById('canvas').parentElement.clientWidth;
  const scale = containerWidth / 1080;

  canvas.setWidth(1080 * scale);
  canvas.setHeight(1080 * scale);

  addWhiteBackground();
  addFrameOverlay();

  canvas.renderAll();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
