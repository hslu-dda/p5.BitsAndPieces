# dat.GUI JavaScript Cheat Sheet

## Basic Setup

```html
<!-- Include the dat.GUI library in your HTML -->
<script src="libraries/dat.gui.min.js"></script>
```

```javascript
// Create a new GUI instance in your sketch
const gui = new dat.GUI();
```

## Creating Controls

### Number Slider

```javascript
const params = {
  number: 50,
};
// gui.add(object, property, [min], [max], [step])
gui.add(params, "number", 0, 100, 1);
```

### Dropdown/Select

```javascript
const params = {
  option: "option1",
};
// gui.add(object, property, [array of options])
gui.add(params, "option", ["option1", "option2", "option3"]);
```

### Checkbox (Boolean)

```javascript
const params = {
  boolean: true,
};
gui.add(params, "boolean");
```

### Color Picker

```javascript
const params = {
  color: "#ff0000",
};
// Use addColor for color pickers
gui.addColor(params, "color");
```

### Button/Function Trigger

```javascript
const params = {
  function: function () {
    console.log("Button clicked!");
  },
};
gui.add(params, "function").name("Click Me");
```

## Organizing Controls

### Folders

```javascript
// Create a folder
const folder = gui.addFolder("Settings");

// Add controls to the folder
folder.add(params, "number", 0, 100);
folder.add(params, "boolean");

// Open/close folders
folder.open(); // Opens the folder
folder.close(); // Closes the folder
```

### Naming Controls

```javascript
// Add custom labels to controls
gui.add(params, "number").name("My Number");
```

## Events and Callbacks

### onChange

```javascript
gui.add(params, "number").onChange(function (value) {
  console.log("Value changed to:", value);
});
```

### onFinishChange

```javascript
gui.add(params, "number").onFinishChange(function (value) {
  console.log("Finished changing. Final value:", value);
});
```

## GUI Configuration

### Position and Size

```javascript
// Set position
gui.domElement.style.position = "absolute";
gui.domElement.style.top = "10px";
gui.domElement.style.right = "10px";

// Custom width
gui.width = 300;
```

### Closed by Default

```javascript
// Start with UI closed
const gui = new dat.GUI({ closed: true });
```

### Auto-place

```javascript
// Disable auto-placement
const gui = new dat.GUI({ autoPlace: false });
const customContainer = document.getElementById("my-gui-container");
customContainer.appendChild(gui.domElement);
```

## Advanced Features

### Preset Saving

```javascript
// Add presets functionality
gui.remember(params);

// Save/load presets
const preset = gui.getSaveObject();
gui.loadPresets(preset);
```

### Custom Controller

```javascript
// Add controller and customize further
const controller = gui.add(params, "number");
controller.step(5); // Change step
controller.min(10); // Change min
controller.max(200); // Change max
```

### Hide/Show GUI

```javascript
// Toggle GUI visibility with keypress in p5.js
let guiVisible = true;

function keyPressed() {
  if (key === "g" || key === "G") {
    guiVisible = !guiVisible;
    if (guiVisible) {
      gui.show();
    } else {
      gui.hide();
    }
  }
}
```

### Destroy GUI

```javascript
// Remove GUI from DOM and memory
gui.destroy();
```

## Practical Example

```javascript
// Setup
const gui = new dat.GUI();
const params = {
  radius: 50,
  color: "#ff0000",
  showWireframe: true,
  speed: 0.5,
  preset: "default",
  refresh: function () {
    console.log("Refreshing...");
  },
};

// Basic controls
gui.add(params, "radius", 10, 100).name("Radius").onChange(updateObject);
gui.addColor(params, "color").name("Color").onChange(updateObject);
gui.add(params, "showWireframe").name("Wireframe").onChange(updateObject);

// Create folder for more controls
const advancedFolder = gui.addFolder("Advanced");
advancedFolder.add(params, "speed", 0, 1, 0.1).name("Animation Speed");
advancedFolder.add(params, "preset", ["default", "wireframe", "solid"]).name("Preset");
advancedFolder.add(params, "refresh").name("Refresh View");

// Open advanced folder
advancedFolder.open();

function updateObject(value) {
  console.log("Updating object with new value:", value);
  // Your object update logic here
}
```
