import { Scene, PerspectiveCamera, AmbientLight, DirectionalLight, WebGLRenderer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import "./model.scss";

export default class Model {
    container = null;
    camera = null;
    renderer = null;
    scene = null;
    model = null;

    constructor() {
        window.addEventListener("resize", this.onWindowResize);
        this.init();
    }

    init = () => {
        this.container = document.querySelector(".model__scene");

        //Create scene
        this.scene = new Scene();

        const fov = 35;
        const aspect = this.container.clientWidth / this.container.clientHeight;
        const near = 0.1;
        const far = 1000;

        //Camera setup
        this.camera = new PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(0, 0, 4);

        const ambient = new AmbientLight(0x404040, 2);
        this.scene.add(ambient);

        const light = new DirectionalLight(0xffffff, 2);
        light.position.set(50, 50, 100);
        this.scene.add(light);
        //Renderer
        this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.container.appendChild(this.renderer.domElement);

        //Load Model
        let loader = new GLTFLoader();
        loader.load("./3d-model/book/scene.gltf", gltf => {
            this.scene.add(gltf.scene);
            this.model = gltf.scene.children[0];
            this.animate();
        });
    };

    animate = () => {
        requestAnimationFrame(this.animate);
        this.model.rotation.z += 0.005;
        this.renderer.render(this.scene, this.camera);
    };

    onWindowResize = () => {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    };
}
