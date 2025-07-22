const canvas = new fabric.Canvas('canvas', {
  preserveObjectStacking: true
});

// UI tampil kecil, internal tetap 1080px
canvas.setDimensions({ width: 540, height: 540 }, { cssOnly: true });

let frameObject;

// Tambahkan frame overlay
function addFrameOverlay() {
  const frameURL = 'assets/frame.png';
  fabric.Image.fromURL(frameURL, function (img) {
    img.set({
      left: 0,
      top: 0,
      selectable: false,
      evented: false
    });

    // Skala pakai ukuran asli canvas (1080)
    img.scaleToWidth(canvas.width);
    img.scaleToHeight(canvas.height);

    frameObject = img;
    canvas.add(img);
    canvas.bringToFront(img);
  });
}

addFrameOverlay();

// Upload gambar user
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

// Download twibbon
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
