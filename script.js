const canvas = new fabric.Canvas('canvas', {
  preserveObjectStacking: true
});



function addFrameOverlay() {
  const frameURL = 'assets/frame.png';
  canvas.setOverlayImage(frameURL, () => {
    const overlay = canvas.overlayImage;
    overlay.scaleToWidth(canvas.getWidth());
    overlay.scaleToHeight(canvas.getHeight());
    overlay.setCoords();
    canvas.renderAll();
  }, { originX: 'left', originY: 'top' });
}



// Responsive canvas sizing
function resizeCanvas() {
  const container = document.getElementById('canvas-container');
  const width = container.clientWidth;
  canvas.setWidth(width);
  canvas.setHeight(width);
  if (canvas.overlayImage) {
    canvas.overlayImage.scaleToWidth(width);
    canvas.overlayImage.scaleToHeight(width);
    canvas.overlayImage.setCoords();
  }
  canvas.renderAll();
}
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();
addFrameOverlay();

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
    link.download = `Coinfest_Twibbon_${qualityVal}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 100);
});
