//https://github.com/dataarts/dat.gui

var circleObjects = { radius: 5, debugView: false };
let gui;

// Name for localStorage key
const LOCAL_STORAGE_KEY = "mySketchSettings";

function setup() {
  createCanvas(400, 400);

  // Initialize GUI
  gui = new dat.GUI();

  // Add controllers
  gui.add(circleObjects, "radius", 0, 100);
  gui.add(circleObjects, "debugView");

  // Add save/load buttons to GUI
  let saveButton = {
    saveSettings: function () {
      saveSettings();
    },
  };
  gui.add(saveButton, "saveSettings").name("Save Settings");

  let loadButton = {
    loadSettings: function () {
      loadSettings();
    },
  };
  gui.add(loadButton, "loadSettings").name("Load Settings");

  // Try to load saved settings on startup
  loadSettings();
}

function draw() {
  background(220);
  circle(width / 2, height / 2, circleObjects.radius);
  if (circleObjects.debugView) {
    circle(width / 2, height / 2, 5);
  }
}

function keyPressed() {
  if (key == "g") {
    gui.show(); // Show
  }
  if (key == "G") {
    gui.hide(); // Hide
  }
}

function saveSettings() {
  // Save current state to localStorage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(circleObjects));
  console.log("Settings saved!");
}

function loadSettings() {
  // Load settings from localStorage
  const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedSettings) {
    try {
      // Parse the saved settings
      const parsedSettings = JSON.parse(savedSettings);

      // Update circleObjects with saved values
      Object.keys(parsedSettings).forEach((key) => {
        if (circleObjects.hasOwnProperty(key)) {
          circleObjects[key] = parsedSettings[key];

          // Update GUI controllers to reflect the loaded values
          for (let i = 0; i < gui.__controllers.length; i++) {
            const controller = gui.__controllers[i];
            if (controller.property === key) {
              controller.updateDisplay();
            }
          }
        }
      });

      console.log("Settings loaded!");
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  } else {
    console.log("No saved settings found.");
  }
}
