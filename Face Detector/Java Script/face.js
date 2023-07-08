
// Get input and canvas elements
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Load the image tracker
const tracker = new tracking.ObjectTracker(['face']);
tracker.setStepSize(1.7);

// Detect objects when an image is selected
imageInput.addEventListener('change', event => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      tracking.track(canvas, tracker);

      tracker.on('track', event => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(rect => {
          context.strokeStyle = '#ff0000';
          context.lineWidth = 2;
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        });
      });
    };
  };

  reader.readAsDataURL(file);
})