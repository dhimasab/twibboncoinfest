const canvas = new fabric.Canvas('canvas', {
  preserveObjectStacking: true
});

let frameObject; // buat nyimpen frame twibbon

function addFrameOverlay() {
  const frameURL = 'assets/frame.png';
  fabric.Image.fromURL(frameURL, function (img) {
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
  });
}

addFrameOverlay();

// Responsive canvas sizing
function resizeCanvas() {
  const container = document.getElementById('canvas-container');
  const width = container.clientWidth;
  canvas.setWidth(width);
  canvas.setHeight(width);
  if (frameObject) {
    frameObject.scaleToWidth(width);
    frameObject.scaleToHeight(width);
    frameObject.setCoords();
  }
  canvas.renderAll();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Upload gambar
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
      img.scaleToWidth(canvas.getWidth() * 0.8);
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
    const qualityVal = parseInt(document.getElementById('quality').value, 10);
    const currentWidth = canvas.getWidth();
    const multiplier = qualityVal / currentWidth;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: multiplier
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = Coinfest_Twibbon_${qualityVal}.png;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 100);
});
