<template>
  <v-main>
    <div id="container" class="scene">
  
    </div>
    <!-- <form name="uploadForm" class="form-container">
      <input id="uploadInput" type="file" name="myFiles" multiple>
    </form> -->
    
  </v-main>
</template>

<script>
import * as THREE from 'three'
// import Stats from './stats.module.js'

export default {
  name: "ThreeViewSimple",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  methods: {
    init2: function() {
        let container = document.getElementById('container');

        // this.camera = new THREE.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.z = 1;

        this.scene = new THREE.Scene();

        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);
        // console.log("init")
    },
    animate2: function() {
        requestAnimationFrame(this.animate2);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
        // console.log("animate")
    }
  },
  mounted() {
    this.init2()
    this.animate2()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family: sans-serif;
  overflow: hidden;
  /*background: url("https://i.stack.imgur.com/pHq2y.png");*/
}
.scene,
canvas{
  position: absolute;
  width: 100px;
  height: 100px;
}

.scenerelative{
  position: relative;
  left: 30px;
  border: 3px solid #73AD21;
}

.scenefixed {
  position: fixed;
  bottom: 10;
  right: 10;
  width: 300px;
  border: 3px solid #73AD21;
}

.form-container {
  position: absolute;
  bottom: 30px;
  right: 0;
  max-width: 200px;
}
</style>