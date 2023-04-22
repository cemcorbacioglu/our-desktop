const wallpaperInput = document.getElementById('wallpaperInput');
const desktop = document.querySelector('.desktop');

wallpaperInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      desktop.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  }
});
