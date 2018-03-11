import { Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import * as THREE from 'three';
import { Scene, Camera, WebGLRenderer, Light } from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, AfterViewInit {
    width: number;
    height: number;
    scene: Scene;
    camera: Camera;
    light: Light;
    renderer: WebGLRenderer;
    divEle: any;

    constructor(private elementRef: ElementRef) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer({
            antialias : true
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xFFFFFF, 1.0);

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
        this.camera.position.x = 600;
        this.camera.position.y = 0;
        this.camera.position.z = 600;
        this.camera.up.x = 0;
        this.camera.up.y = 1;
        this.camera.up.z = 0;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.scene = new Scene();

        this.light = new THREE.DirectionalLight(0xFF00000, 1);
        this.light.position.set(0, 0, 1);
    }

    ngOnInit() {
        let geometry = new THREE.CubeGeometry( 200, 100, 50, 4, 4);
        let material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF} );
        let mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(0, 0, 0);
        this.scene.add(mesh);

        let mesh2 = new THREE.Mesh( geometry, material);
        mesh2.position.set(-300, 0, 0);
        this.scene.add(mesh2);

        let mesh3 = new THREE.Mesh( geometry, material);
        mesh3.position.set(0, -150, 0);
        this.scene.add(mesh3);

        let mesh4 = new THREE.Mesh( geometry, material);
        mesh4.position.set(0, 150, 0);
        this.scene.add(mesh4);

        let mesh5 = new THREE.Mesh( geometry, material);
        mesh5.position.set(300, 0, 0);
        this.scene.add(mesh5);

        let mesh6 = new THREE.Mesh( geometry, material);
        mesh6.position.set(0, 0, -100);
        this.scene.add(mesh6);
        this.scene.add(this.light);
    }

    ngAfterViewInit() {
        this.divEle = this.elementRef.nativeElement.querySelector('#canvas-frame');
        this.divEle.appendChild(this.renderer.domElement);
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }
}
