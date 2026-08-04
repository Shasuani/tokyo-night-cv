import * as THREE from 'three';
import { SceneManager } from './scene.js';
import { Character } from './character.js';
import { BuildingManager } from './buildings.js';
import { cvData, displayCV } from './cv-data.js';

class TokyoNightCV {
    constructor() {
        this.sceneManager = new SceneManager();
        this.buildingManager = new BuildingManager(this.sceneManager.scene);
        this.character = new Character(this.sceneManager.scene);
        this.interactiveBuildings = this.buildingManager.getInteractiveBuildings();
        
        this.init();
        this.animate();
    }
    
    init() {
        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 2000);
        
        // Create rain
        this.sceneManager.createRain();
        
        // Setup interaction
        this.setupInteraction();
    }
    
    setupInteraction() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'e' || event.key === 'E') {
                const nearbyBuilding = this.character.canInteract(this.interactiveBuildings);
                if (nearbyBuilding) {
                    displayCV();
                }
            }
        });
        
        // Close CV when clicking outside
        document.getElementById('cv-display').addEventListener('click', (event) => {
            if (event.target === document.getElementById('cv-display')) {
                document.getElementById('cv-display').style.display = 'none';
            }
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update character
        const characterPos = this.character.update();
        
        // Update camera to follow character
        this.sceneManager.updateCamera(characterPos);
        
        // Update building screens
        this.buildingManager.updateScreens(Date.now());
        
        // Update rain
        this.sceneManager.updateRain();
        
        // Render scene
        this.sceneManager.render();
    }
}

// Initialize the application when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new TokyoNightCV();
});