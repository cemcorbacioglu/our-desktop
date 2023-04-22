const uploadForm = document.getElementById("uploadForm");
const wallpaperInput = document.getElementById("wallpaperInput");
const desktop = document.querySelector(".desktop");

async function fetchLatestWallpaper() {
  try {
    const response = await fetch("/latest-wallpaper");
    if (response.ok) {
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = function (e) {
        desktop.style.backgroundImage = `url(${e.target.result})`;
      };
      reader.readAsDataURL(blob);
    }
  } catch (error) {
    console.error("Error fetching latest wallpaper:", error);
  }
}

uploadForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const file = wallpaperInput.files[0];
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("wallpaper", file);

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      desktop.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
});

fetchLatestWallpaper();
