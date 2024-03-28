var viewer = pannellum.viewer('panorama', { 
    "autoLoad": true,
    "autoRotate": 0,
    "showControls": false,  
    "default": {
        "firstScene": "image_1",
    },

    "scenes": {
        "image_1": {
            "type": "equirectangular",
            "panorama": "22meter.jpg", 
            "hfov":200,
            "yaw":145,
            "compass":true,
            "northOffset":220
        },

        "image_2": {
        "type": "equirectangular",
        "panorama": "22meter.jpg",
        "yaw":145,
        "hfov":200,
        "haov": 360,
        "vaov":150,
        "minPitch":-25,
        "maxPitch": 25,
        "compass":true,
        "northOffset":220
      }
    }
});
function togglePopupBackground(containerId, isHover) {
var container = document.getElementById(containerId);
if (isHover) {
    container.style.backgroundColor = '';
} else {
    container.style.backgroundColor = 'rgb(0, 0, 0)';
}
}

// Function to toggle the visibility of popup windows
function togglePopupWindows() {
    var popupContainer1 = document.getElementById('popup-container-1');
    var popupContainer2 = document.getElementById('popup-container-2');
    if (popupContainer1.style.display === 'block' || popupContainer2.style.display === 'block') {
        popupContainer1.style.display = 'none';
        popupContainer2.style.display = 'none';
    } else {
        popupContainer1.style.display = 'block';
        popupContainer2.style.display = 'block';
    }
}

// Event listener for height button
document.getElementById('switch-panorama').addEventListener('click', function() {
    togglePopupWindows();
});

// Event listener for image selection
document.getElementById('image-1').addEventListener('click', function() {
    viewer.loadScene('image_1');
    togglePopupWindows();
});

document.getElementById('image-2').addEventListener('click', function() {
    viewer.loadScene('image_2');
    togglePopupWindows();
});

// Function to update degree scale
function updateDegreeScale() {
    // Get the element where the degree scale will be displayed
    var degreeScale = document.getElementById('degreeScale');
    
    // Get the current yaw value from the Pannellum viewer
    var yaw = viewer.getYaw();
    
    // Calculate the adjusted yaw value by subtracting the initial yaw value (26 degrees)
    var adjustedYaw = yaw - 145;
    
    // If the adjusted yaw value is negative, add 360 degrees to make it positive
    if (adjustedYaw < 0) {
        adjustedYaw += 360; 
    }
    
    // Update the text content of the degree scale element with the adjusted yaw value
    degreeScale.innerText = `${adjustedYaw.toFixed(1)}°`;
}


// Event listeners for control buttons
document.getElementById('pan-up').addEventListener('click', function() {
    viewer.setPitch(viewer.getPitch() + 10);
    updateDegreeScale();
});
document.getElementById('pan-down').addEventListener('click', function() {
    viewer.setPitch(viewer.getPitch() - 10);
    updateDegreeScale();
});
document.getElementById('pan-left').addEventListener('click', function() {
    viewer.setYaw(viewer.getYaw() - 10);
    updateDegreeScale();
});
document.getElementById('pan-right').addEventListener('click', function() {
    viewer.setYaw(viewer.getYaw() + 10);
    updateDegreeScale();
});
document.getElementById('zoom-in').addEventListener('click', function() {
    viewer.setHfov(viewer.getHfov() - 10);
    updateDegreeScale();
});
document.getElementById('zoom-out').addEventListener('click', function() {
    viewer.setHfov(viewer.getHfov() + 10);
    updateDegreeScale();
});
document.getElementById('fullscreen').addEventListener('click', function() {
    viewer.toggleFullscreen();
    updateDegreeScale();
});

// Event listener to update degree scale during view change
viewer.on('viewchange', updateDegreeScale);

// Function to continuously update the degree scale during auto-rotation
viewer.on('mousedown', function() {
    setInterval(updateDegreeScale, 100);
});