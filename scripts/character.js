import * as THREE from 'three';

export class Character {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.speed = 0.2;
        this.position = new THREE.Vector3(0, 1, 0);
        this.direction = new THREE.Vector3();
        this.keys = {};
        
        this.init();
        this.setupControls();
    }
    
    init() {
        // Create a simple 2D-style character
        const group = new THREE.Group();
        
        // Body (main rectangle)
        const bodyGeometry = new THREE.BoxGeometry(1, 2, 0.5);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a8c });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        group.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.4, 8, 6);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.2;
        head.castShadow = true;
        group.add(head);
        
        // Simple face (2D style)
        const eyeGeometry = new THREE.SphereGeometry(0.08, 4, 4);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(0.15, 1.25, 0.2);
        group.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(-0.15, 1.25, 0.2);
        group.add(rightEye);
        
        // Arms
        const armGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
        const armMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a8c });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(0.6, 0.5, 0);
        group.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(-0.6, 0.5, 0);
        group.add(rightArm);
        
        group.position.copy(this.position);
        this.scene.add(group);
        this.mesh = group;
    }
    
    setupControls() {
        window.addEventListener('keydown', (event) => {
            this.keys[event.key.toLowerCase()] = true;
        });
        
        window.addEventListener('keyup', (event) => {
            this.keys[event.key.toLowerCase()] = false;
        });
    }
    
    update() {
        this.direction.set(0, 0, 0);
        
        // Movement controls (WASD and arrows)
        if (this.keys['w'] || this.keys['arrowup']) {
            this.direction.z = -1;
        }
        if (this.keys['s'] || this.keys['arrowdown']) {
            this.direction.z = 1;
        }
        if (this.keys['a'] || this.keys['arrowleft']) {
            this.direction.x = -1;
        }
        if (this.keys['d'] || this.keys['arrowright']) {
            this.direction.x = 1;
        }
        
        // Normalize diagonal movement
        if (this.direction.length() > 0) {
            this.direction.normalize();
            this.position.add(this.direction.multiplyScalar(this.speed));
        }
        
        // Boundary checking
        this.position.x = THREE.MathUtils.clamp(this.position.x, -45, 45);
        this.position.z = THREE.MathUtils.clamp(this.position.z, -45, 45);
        
        // Update mesh position
        if (this.mesh) {
            this.mesh.position.copy(this.position);
            
            // Simple walking animation
            if (this.direction.length() > 0) {
                this.mesh.rotation.y = Math.atan2(this.direction.x, this.direction.z);
                
                // Bobbing animation
                this.mesh.position.y = this.position.y + Math.sin(Date.now() * 0.01) * 0.1;
            }
        }
        
        return this.position.clone();
    }
    
    getPosition() {
        return this.position.clone();
    }
    
    canInteract(buildings) {
        const interactionDistance = 5;
        
        for (const building of buildings) {
            const distance = this.position.distanceTo(building.position);
            if (distance < interactionDistance) {
                return building;
            }
        }
        
        return null;
    }
}