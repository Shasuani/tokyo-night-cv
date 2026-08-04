import * as THREE from 'three';

export class BuildingManager {
    constructor(scene) {
        this.scene = scene;
        this.buildings = [];
        this.buildingScreens = [];
        this.interactiveBuildings = [];
        
        this.createBuildings();
    }
    
    createBuildings() {
        const buildingData = [
            { x: -15, z: -10, width: 8, height: 12, depth: 8, screenContent: 'experience' },
            { x: 15, z: -5, width: 10, height: 15, depth: 10, screenContent: 'skills' },
            { x: -10, z: 15, width: 12, height: 18, depth: 12, screenContent: 'education' },
            { x: 10, z: 15, width: 9, height: 14, depth: 9, screenContent: 'projects' },
            { x: 0, z: -20, width: 14, height: 20, depth: 14, screenContent: 'contact' }
        ];
        
        buildingData.forEach((data, index) => {
            this.createBuilding(data, index);
        });
    }
    
    createBuilding(data, index) {
        // Main building
        const buildingGeometry = new THREE.BoxGeometry(data.width, data.height, data.depth);
        const buildingMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x222244,
            roughness: 0.7,
            metalness: 0.3
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.set(data.x, data.height / 2, data.z);
        building.castShadow = true;
        building.receiveShadow = true;
        this.scene.add(building);
        this.buildings.push(building);
        
        // Windows
        this.addWindows(building, data);
        
        // Screen
        this.addScreen(building, data, index);
        
        // Store interactive data
        this.interactiveBuildings.push({
            mesh: building,
            content: data.screenContent,
            position: building.position.clone()
        });
    }
    
    addWindows(building, data) {
        const windowColor = 0xffff99;
        const windowMaterial = new THREE.MeshBasicMaterial({ color: windowColor });
        
        // Create multiple windows
        const rows = 4;
        const cols = 3;
        const windowWidth = data.width * 0.2;
        const windowHeight = data.height * 0.1;
        const windowDepth = 0.1;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, windowDepth);
                const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
                
                // Position windows on different sides
                const side = col % 4;
                const yPos = (row - 1.5) * (data.height / rows) + data.height / 2;
                
                switch(side) {
                    case 0: // Front
                        windowMesh.position.set(
                            (col - 1) * (data.width / 3),
                            yPos,
                            data.depth / 2 + 0.05
                        );
                        break;
                    case 1: // Back
                        windowMesh.position.set(
                            (col - 1) * (data.width / 3),
                            yPos,
                            -data.depth / 2 - 0.05
                        );
                        windowMesh.rotation.y = Math.PI;
                        break;
                    case 2: // Right
                        windowMesh.position.set(
                            data.width / 2 + 0.05,
                            yPos,
                            (col - 1) * (data.depth / 3)
                        );
                        windowMesh.rotation.y = Math.PI / 2;
                        break;
                }
                
                building.add(windowMesh);
            }
        }
    }
    
    addScreen(building, data, index) {
        const screenWidth = data.width * 0.8;
        const screenHeight = data.height * 0.3;
        const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight);
        
        // Create different colored screens
        const colors = [0x00a8ff, 0xff00ff, 0x00ffaa, 0xffaa00, 0xaa00ff];
        const screenMaterial = new THREE.MeshBasicMaterial({ 
            color: colors[index % colors.length],
            transparent: true,
            opacity: 0.8
        });
        
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, data.height * 0.7, data.depth / 2 + 0.1);
        screen.userData = { interactive: true, content: data.screenContent };
        
        building.add(screen);
        this.buildingScreens.push(screen);
        
        // Add screen glow effect
        this.addScreenGlow(screen, screenWidth, screenHeight);
    }
    
    addScreenGlow(screen, width, height) {
        const glowGeometry = new THREE.PlaneGeometry(width * 1.1, height * 1.1);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00a8ff,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        screen.add(glow);
        glow.position.z = -0.05;
    }
    
    getInteractiveBuildings() {
        return this.interactiveBuildings;
    }
    
    updateScreens(time) {
        // Animate screen pulsing
        this.buildingScreens.forEach((screen, index) => {
            const pulse = Math.sin(time * 0.001 + index) * 0.2 + 0.8;
            screen.material.opacity = pulse * 0.8;
        });
    }
}