import { Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import { Scene, Camera, WebGLRenderer, Light } from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {
    width: number;
    height: number;
    scene: Scene;
    camera: Camera;
    light: Light;
    renderer: WebGLRenderer;

    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer({
            antialias : true
        });
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0xFFFFFF, 1.0);

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
        this.camera.position.x = 0;
        this.camera.position.y = 1000;
        this.camera.position.z = 0;
        this.camera.up.x = 0;
        this.camera.up.y = 0;
        this.camera.up.z = 1;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.scene = new Scene();

        this.light = new THREE.PointLight(0xFFFFFF);
        this.light.position.set(100, 100, 200);
    }

    ngOnInit() {
        
        this.scene.add(this.light);
        this.renderer.render(this.scene, this.camera);
    }
}
