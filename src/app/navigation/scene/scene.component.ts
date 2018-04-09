import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import './js/EnableThreeExamples';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/loaders/OBJLoader';
import 'three/examples/js/loaders/MTLLoader';
import { Vector3 } from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})

export class SceneComponent implements AfterViewInit {
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private cameraTarget: THREE.Vector3;
    public scene: THREE.Scene;

    public fieldOfView: number = 60;
    public nearClippingPane: number = 1;
    public farClippingPane: number = 6000;

    public controls: THREE.OrbitControls;

    @ViewChild('canvas')
    private canvasRef: ElementRef;

    constructor() {
        this.render = this.render.bind(this);
        this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this);
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    private createScene() {
        this.scene = new THREE.Scene();
        // this.scene.add(new THREE.AxesHelper(1000));
        let loader = new THREE.MTLLoader();
        loader.setPath('assets/model/hospital_mtl/');
        loader.load('hospital.mtl', this.onModelLoadingCompleted);
    }

    private onModelLoadingCompleted(materials) {
        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('assets/model/hospital.OBJ', (object) => {
            object.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI);
            object.position.set(-2000, -750, 500);
            this.scene.add(object);
            this.render();
        });
    }

    private createLight() {
        let light1 = new THREE.PointLight(0xffffff, 1);
        light1.position.set(0, 4000, 0);
        this.scene.add(light1);

        let light2 = new THREE.AmbientLight(0xFFFFFF, 0.5);
        this.scene.add(light2);
    }

    private createCamera() {
        let aspectRadio = this.getAspectRatio();
        this.camera = new THREE.PerspectiveCamera(
            this.fieldOfView,
            aspectRadio,
            this.nearClippingPane,
            this.farClippingPane
        );

        this.camera.position.x = 400;
        this.camera.position.y = 2800;
        this.camera.position.z = 2000;

    }

    private getAspectRatio(): number {
        let height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }

    private startRendering() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0xFFFFFF, 1);
        this.renderer.autoClear = true;

        let component: SceneComponent = this;

        (function render() {
            requestAnimationFrame(render);
            component.render();
        }());
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }

    public addControls() {
        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.maxDistance = 3600;
        this.controls.minDistance = 0;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.minPolarAngle = 0;
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.0;
        this.controls.addEventListener('change', this.render);
    }

    public onMouseDown(event: MouseEvent) {
        console.log("onMouseDown");
        event.preventDefault();

        // mesh selection:
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();
        mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.camera);

        let obj: THREE.Object3D[] = [];
        this.findAllObjects(obj, this.scene);
        let intersects = raycaster.intersectObjects(obj);
        console.log("Scene has " + obj.length + " objects");
        console.log(intersects.length + " intersected objects found");
        intersects.forEach((i) => {
            console.log(i.object);
        });

    }

    private findAllObjects(pred: THREE.Object3D[], parent: THREE.Object3D) {
        if (parent.children.length > 0) {
            parent.children.forEach((i) => {
                pred.push(i);
                this.findAllObjects(pred, i);
            });
        }
    }

    public onMouseUp(event: MouseEvent) {
        console.log("onMouseUp");
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event) {
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        console.log("onResize: " + this.canvas.clientWidth + ", " + this.canvas.clientHeight);

        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.render();
    }

    @HostListener('document:keypress', ['$event'])
    public onKeyPress(event: KeyboardEvent) {
        console.log("onKeyPress: " + event.key);
    }

    ngAfterViewInit() {
        this.createScene();
        this.createLight();
        this.createCamera();
        this.startRendering();
        this.addControls();
    }
}
