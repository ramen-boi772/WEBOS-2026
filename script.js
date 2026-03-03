// Boot Screen
window.onload = () => {
  setTimeout(() => {
    document.getElementById("bootScreen").style.display = "none";
  }, 2000);

  loadSettings();
};

function loadSettings() {
  let savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.body.className = savedTheme;

  let savedWallpaper = localStorage.getItem("wallpaper");
  if (savedWallpaper)
    document.getElementById("desktop").style.backgroundImage =
      `url(${savedWallpaper})`;

  let savedNotes = localStorage.getItem("notes");
  if (savedNotes) document.getElementById("notepadArea").value = savedNotes;
}

/* =======================
   THEME SYSTEM
======================= */
function toggleTheme() {
  document.body.className =
    document.body.className === "light" ? "dark" : "light";
  localStorage.setItem("theme", document.body.className);
}

/* =======================
   WALLPAPER SYSTEM
======================= */
document.getElementById("wallpaperInput").addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = event => {
    document.getElementById("desktop").style.backgroundImage =
      `url(${event.target.result})`;
    localStorage.setItem("wallpaper", event.target.result);
  };
  reader.readAsDataURL(e.target.files[0]);
});

/* =======================
   START MENU
======================= */
function toggleStart() {
  let start = document.getElementById("startMenu");
  start.style.display = start.style.display === "grid" ? "none" : "grid";
}

/* =======================
   WINDOW SYSTEM
======================= */
function openApp(id) {
  document.getElementById(id).style.display = "block";
}

function closeApp(id) {
  document.getElementById(id).style.display = "none";
}

/* Draggable Windows */
document.querySelectorAll(".window").forEach(window => {
  let header = window.querySelector(".window-header");
  let isDragging = false;
  let offsetX, offsetY;

  header.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.clientX - window.offsetLeft;
    offsetY = e.clientY - window.offsetTop;
  });

  document.addEventListener("mousemove", e => {
    if (isDragging) {
      window.style.left = e.clientX - offsetX + "px";
      window.style.top = e.clientY - offsetY + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
});

/* =======================
   CALCULATOR
======================= */
function calc(value) {
  let display = document.getElementById("calcDisplay");
  if (value === "=") {
    display.value = eval(display.value);
  } else if (value === "C") {
    display.value = "";
  } else {
    display.value += value;
  }
}

/* =======================
   NOTEPAD
======================= */
function saveNotes() {
  localStorage.setItem(
    "notes",
    document.getElementById("notepadArea").value
  );
}
