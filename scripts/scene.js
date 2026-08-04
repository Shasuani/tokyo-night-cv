import * as THREE from 'three';

export class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.rainDrops = [];
        
        this.init();
    }
    
    init() {
        // Scene setup
        this.scene.background = new THREE.Color(0x0a0a2a);
        
        // Renderer setup
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('container').appendChild(this.renderer.domElement);
        
        // Camera position
        this.camera.position.set(0, 5, 10);
        
        // Lighting
        this.setupLighting();
        
        // Ground
        this.createGround();
        
        // Window resize handler
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Directional light (moonlight)
        const directionalLight = new THREE.DirectionalLight(0xa0d0ff, 0.6);
        directionalLight.position.set(10, 20, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Neon lights (point lights for building effects)
        const neonLight1 = new THREE.PointLight(0x00a8ff, 0.5, 20);
        neonLight1.position.set(-15, 8, -10);
        this.scene.add(neonLight1);
        
        const neonLight2 = new THREE.PointLight(0xff00ff, 0.5, 20);
        neonLight2.position.set(15, 10, -5);
        this.scene.add(neonLight2);
    }
    
    createGround() {
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a3a,
            roughness: 0.8,
            metalness: 0.2
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
        
        // Add some ground details (road markings)
        const roadMarkingGeometry = new THREE.PlaneGeometry(60, 0.5);
        const roadMarkingMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const roadMarking = new THREE.Mesh(roadMarkingGeometry, roadMarkingMaterial);
        roadMarking.rotation.x = -Math.PI / 2;
        roadMarking.position.y = 0.01;
        this.scene.add(roadMarking);
    }
    
    createRain() {
        // Create CSS rain drops for better performance
        for (let i = 0; i < 200; i++) {
            this.createRainDrop();
        }
    }
    
    createRainDrop() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.top = Math.random() * -100 + 'vh';
        drop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        document.getElementById('container').appendChild(drop);
        
        this.rainDrops.push({
            element: drop,
            speed: Math.random() * 2 + 1,
            resetPosition: () => {
                drop.style.top = Math.random() * -100 + 'vh';
                drop.style.left = Math.random() * 100 + 'vw';
            }
        });
    }
    
    updateRain() {
        this.rainDrops.forEach(drop => {
            const top = parseFloat(drop.element.style.top);
            drop.element.style.top = (top + drop.speed) + 'vh';
            
            if (top > 100) {
                drop.resetPosition();
            }
        });
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    
    updateCamera(position) {
        this.camera.position.x = position.x;
        this.camera.position.z = position.z + 8;
        this.camera.lookAt(position.x, position.y, position.z);
    }
}