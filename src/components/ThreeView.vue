<template>
  <v-main class="pt-0">
    <v-container
      fluid
      style="
        position: relative;
        right: 200px;
        margin: 0px;
        padding: 0px;
        width: 100%;
      "
    >
      <v-layout wrap>
        <v-card id="container" class="mycard white" shaped>
          <div class="myscene"></div>
        </v-card>
        <v-form name="uploadForm" class="form-container">
          <!-- <input id="uploadInput" type="file" name="handleFiles"> -->
          <input id="uploadInput" type="file" />
        </v-form>
      </v-layout>
    </v-container>

    <!-- <div class="form">
        <div class="dropbox">
          <input type="file" :name="uploadFieldName" @change="handleFiles($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            class="input-file">
        </div>
      </div> -->
  </v-main>
</template>

<script>
import * as THREE from "three";
// import Stats from './stats.module.js'
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
// import $ from "jquery";

export default {
  name: "ThreeView",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      rotationMesh: null,
      staticMesh: null,
      cameraTarget: null,
      container: null,
      stats: null,
      mouseSpeed: 0.02,
      zoomStep: 0.0005,
      rotationBorder: 0,
      step: 0,
      zoom: 2,
      rotation: 0.8,
      prevPoint: 0,
      fileList: null,
      loader: null,
      mesh_uuid: null,
      press: false,
      width: window.innerWidth / 2,
      height: (window.innerHeight * 4) / 5,
    };
  },
  methods: {
    init() {
      // this.container = document.querySelector(".scene");
      this.container = document.getElementById("container");
      // document.getElementById("uploadInput").style.cssText = upload+container;
      // container = document.createElement('div');
      // document.body.appendChild( container );
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;

      //Camera setup
      const fov = 35;
      // const aspect = this.container.clientWidth /this.container.clientHeight;
      const aspect = this.width / this.height;
      const near = 0.1;
      const far = 100;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(3, -0.25, 3);

      //vale target = module
      this.cameraTarget = new THREE.Vector3(0, 0, 0);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x72645b);
      this.scene.fog = new THREE.Fog(this.scene.background, 2, 15);

      // Ground
      const plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(40, 40),
        new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
      );
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -0.5;
      plane.receiveShadow = true;
      this.scene.add(plane);

      // stats
      // stats = new Stats();
      // container.appendChild( stats.dom );

      //For Debugging
      // const axesHelper = new THREE.AxesHelper();
      // this.scene.add( axesHelper );
      // let gridHelper = new THREE.GridHelper(5,20);
      // gridHelper.scale.set(0.2,0.2,0.2)
      // //rotates in radians
      // gridHelper.rotateX(Math.PI/2);
      // this.scene.add(gridHelper);

      //CHOOSE FILE FROM FILE BROWSER
      const inputElement = document.getElementById("uploadInput");
      inputElement.addEventListener("change", this.handleFiles, false);

      // ASCII file
      this.loader = new STLLoader();

      this.loader.load("tibia.stl", this.load_static);
      this.loader.load("femur.stl", this.load_moving);

      // Lights
      this.scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
      this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
      // this.addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.width, this.height);
      // this.renderer.setSize(this.container.width, this.container.height);
      // this.renderer.setSize(
      //   this.renderer.domElement.width,
      //   this.renderer.domElement.height
      // );
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.shadowMap.enabled = true;

      //for toggling mouse scroll
      function toggleWheel(event){
        event.preventDefault()
      }

      this.renderer.domElement.addEventListener("mouseenter", () => {
        // console.log("entered")
        window.addEventListener("wheel", toggleWheel, { passive:false })
      });
      this.renderer.domElement.addEventListener("mousewheel", (event) => {
        let newZoom = this.zoom - event.wheelDelta * this.zoomStep;
        if (newZoom > 1 && newZoom < 3) this.zoom = newZoom;
        // window.updateCallback();
      });
      this.renderer.domElement.addEventListener("mousedown", () => {
        this.press = true;
      });
      this.renderer.domElement.addEventListener("mouseup", () => {
        this.press = false;
      });
      this.renderer.domElement.addEventListener("mouseleave", () => {
        // console.log("left")
        window.removeEventListener("wheel", toggleWheel, {passive: false})
        this.press = false;
      });
      this.renderer.domElement.addEventListener("mousemove", (event) => {
        if (!this.press) {
          return;
        }

        let newPosY =
          this.camera.position.y + (event.movementY * this.mouseSpeed) / 10;

        if (event.button == 0) {
          this.rotation += (event.movementX * this.mouseSpeed) / 10;
          if (newPosY >= -0.4 && newPosY <= 0.2) {
            this.camera.position.y = newPosY;
          }
        }
      });
      this.container.append(this.renderer.domElement);

      window.addEventListener("resize", this.onWindowResize, true);
    },
    handleFiles() {
      this.fileList = event.target.files;
      let filename = this.fileList[0].name;
      // console.log(filename)
      // console.log(scene.getObjectByName("model"))

      this.scene.remove(this.scene.getObjectByName("model"));
      // this.loader.load( "../assets/"+filename, this.load_moving);
      this.loader.load(filename, this.load_moving);

      // console.log(scene)
    },
    addShadowedLight(x, y, z, color, intensity) {
      const directionalLight = new THREE.DirectionalLight(color, intensity);
      directionalLight.position.set(x, y, z);
      this.scene.add(directionalLight);

      directionalLight.castShadow = true;

      const d = 1;
      directionalLight.shadow.camera.left = -d;
      directionalLight.shadow.camera.right = d;
      directionalLight.shadow.camera.top = d;
      directionalLight.shadow.camera.bottom = -d;

      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 4;

      directionalLight.shadow.bias = -0.002;
    },
    onWindowResize() {
      //FOR FULL WINDOW
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);

      //CONTAINER SIZE
      // this.camera.aspect = this.container.width / this.container.height;
      // this.camera.updateProjectionMatrix();
      // this.renderer.setSize(this.container.width, this.container.height);

      // const canvas = this.renderer.domElement;
      // // look up the size the canvas is being displayed
      // const width = canvas.clientWidth;
      // const height = canvas.clientHeight;

      // // adjust displayBuffer size to match
      // if (canvas.width !== width || canvas.height !== height) {
      //   // you must pass false here or three.js sadly fights the browser
      //   this.renderer.setSize(width, height, false);
      //   this.camera.aspect = width / height;
      //   this.camera.updateProjectionMatrix();

      //   // update any render target sizes here
      // }
    },
    load_moving(geometry) {
      //alert(geometry.attributes.position.count);
      const colors = [];

      for (let i = 0, n = geometry.attributes.position.count; i < n; ++i) {
        colors.push(1, 1, 1);
      }

      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      // this.setColor(geometry)

      //const material = new THREE.MeshPhongMaterial( { color: 0xfffffff	, specular: 0x111111, shininess: 100 } );	//0xfffffff
      //const mesh = new THREE.Mesh( geometry, material );

      const material = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        color: 0xf5f5f5,
        vertexColors: true,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(0, 0, 0);
      mesh.rotation.set(-0.5 * Math.PI, 0, 0);
      mesh.scale.set(0.005, 0.005, 0.005);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = "model";

      // geometry.add(model_axes)
      // this.rotationMesh = new THREE.Mesh( geometry, material );
      this.rotationMesh = mesh;

      this.mesh_uuid = mesh.uuid;

      // const model_axes = new THREE.AxesHelper();
      // model_axes.scale.set(100,100,100)
      // mesh.add( model_axes );

      this.scene.add(this.rotationMesh);

      this.animate();
    },
    load_static(geometry) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xfffffff,
        specular: 0x111111,
        shininess: 100,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(0, 0, 0);
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      mesh.scale.set(0.005, 0.005, 0.005);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // this.staticMesh = new THREE.Mesh( geometry, material );
      this.staticMesh = mesh;

      this.scene.add(this.staticMesh);
    },
    setColor(geometry) {
      const colors2 = geometry.attributes.color;
      var r, g, b;
      // const strength = 10;
      // const step = (strength / geometry.attributes.color.count);

      r = 1;
      g = 0;
      b = 0;

      for (let i = 0, n = geometry.attributes.color.count; i < n; ++i) {
        if (r == 1) {
          r = 0;
          g = 1;
        } else if (g == 1) {
          g = 0;
          b = 1;
        } else if (b == 1) {
          b = 0;
          r = 1;
        }

        colors2.setXYZ(i, r, g, b);
      }
      colors2.needsUpdate = true;
    },
    animate() {
      requestAnimationFrame(this.animate);

      this.render();
      // stats.update();
    },
    render() {
      // const timer = Date.now() * 0.0002;

      //THIS IS FOR THE CONTINIOUS ROATION
      if (this.rotationBorder <= 0) {
        this.step = 0.01;
      } else if (this.rotationBorder > 5) {
        this.step = -0.01;
      }
      this.rotationBorder = this.rotationBorder + this.step;
      this.rotationMesh.rotation.set(
        -0.1 * Math.PI * this.rotationBorder,
        0,
        0
      );

      //THIS IS FOR ROTATION
      this.camera.position.x = Math.cos(Math.PI * this.rotation) * this.zoom;
      this.camera.position.z = Math.sin(Math.PI * this.rotation) * this.zoom;

      let newTarget = new THREE.Vector3(
        0,
        this.cameraTarget.y + this.camera.position.y,
        0
      );
      this.camera.lookAt(newTarget);
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
    // this.animate()
  },
};
</script>

<style>
@import "../styles/models.css";
</style>