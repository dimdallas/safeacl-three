<template>
  <v-main>
    <div class="scene">
  
    </div>
    <!-- <form name="uploadForm" class="form-container">
      <input id="uploadInput" type="file" name="myFiles" multiple>
    </form> -->
    
  </v-main>
</template>

<script>
import * as THREE from 'three'
// import Stats from './stats.module.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import {$} from 'jquery'

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
      rotationSpeed: .01,
      zoomStep: .0005,
      rotationBorder: 0,
      step:  0,
      zoom:  2,
      rotation: .8,
      prevPoint: 0,
      fileList: null,
      loader: null,
      mesh_uuid: null
    }
  },
  methods: {
    init2: function() {
        let container = document.getElementById('container');

        this.camera = new THREE.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
        this.camera.position.z = 1;

        this.scene = new THREE.Scene();

        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

    },
    animate2: function() {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    },
    init() {
      this.container = document.querySelector('.scene');
      // let upload = document.getElementById("uploadInput")
      // document.getElementById("uploadInput").style.cssText = upload+container;
      // container = document.createElement('div');
      // document.body.appendChild( container );


      //Camera setup
      const fov = 35;
      // const aspect = container.clientWidth /container.clientHeight;
      const aspect = window.innerWidth / window.innerHeight;
      const near = 0.1;
      const far = 100;
      this.camera = new THREE.PerspectiveCamera( fov, aspect, near, far);
      this.camera.position.set( 3, 0.15, 3 );

      //vale target = module
      this.cameraTarget = new THREE.Vector3( 0, - 0.25, 0 );

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color( 0x72645b );
      this.scene.fog = new THREE.Fog( this.scene.background, 2, 15 );

      // Ground
      const plane = new THREE.Mesh(
          new THREE.PlaneBufferGeometry( 40, 40 ),
          new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
      );
      plane.rotation.x = - Math.PI / 2;
      plane.position.y = - 0.5;
      plane.receiveShadow = true;
      this.scene.add( plane );


      // stats
      // stats = new Stats();
      // container.appendChild( stats.dom );

      //For Debugging
      const axesHelper = new THREE.AxesHelper();
      this.scene.add( axesHelper );
      let gridHelper = new THREE.GridHelper(5,20);
      gridHelper.scale.set(0.2,0.2,0.2)
      //rotates in radians
      gridHelper.rotateX(Math.PI/2);
      this.scene.add(gridHelper);


      //CHOOSE FILE FROM FILE BROWSER
      const inputElement = document.getElementById("uploadInput");
      inputElement.addEventListener("change", this.handleFiles, false);


      // ASCII file
      this.loader = new STLLoader();

      this.loader.load( '../assets/tibia.stl', this.load_static);
      this.loader.load( '../assets/femur.stl', this.load_moving);


      // Lights
      this.scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
      this.addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
      this.addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );

      // renderer
      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      // this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.shadowMap.enabled = true;
      this.container.append( this.renderer.domElement);

      window.addEventListener( 'resize', this.onWindowResize, true );
    },
    load_moving(geometry){
      //alert(geometry.attributes.position.count);
      const colors = [];

      for ( let i = 0, n = geometry.attributes.position.count; i < n; ++ i ) {

        colors.push( 1, 1, 1 );

      }

      geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
      const colors2 = geometry.attributes.color;
      var r,g,b;
      // const strength = 10;
      // const step = (strength / geometry.attributes.color.count);

      r = 1;
      g = 0;
      b = 0;

      for ( let i = 0, n = geometry.attributes.color.count; i < n; ++ i ) {

        if(r == 1)
        {
          r = 0;
          g = 1;
        }
        else if(g == 1)
        {
          g = 0;
          b = 1;
        }
        else if(b == 1)
        {
          b = 0;
          r = 1;
        }

        colors2.setXYZ( i, r,  g, b);

      }
      colors2.needsUpdate = true;

      //const material = new THREE.MeshPhongMaterial( { color: 0xfffffff	, specular: 0x111111, shininess: 100 } );	//0xfffffff				
      //const mesh = new THREE.Mesh( geometry, material );

      const material = new THREE.MeshLambertMaterial( {
        side: THREE.DoubleSide,
        color: 0xF5F5F5,
        vertexColors: true
      } );
      const mesh = new THREE.Mesh( geometry,  material);

      mesh.position.set( 0, 0, 0 );
      mesh.rotation.set(  -.5 * Math.PI, 0, 0 );
      mesh.scale.set( 0.005, 0.005, 0.005 );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // geometry.add(model_axes)
      this.rotationMesh = new THREE.Mesh( geometry, material );
      this.rotationMesh = mesh;

      mesh.name = "model"
      this.mesh_uuid = mesh.uuid;

      const model_axes = new THREE.AxesHelper();
      model_axes.scale.set(100,100,100)
      mesh.add( model_axes );

      this.scene.add( mesh );

      // this.animate();
    },
    load_static(geometry){
      const material = new THREE.MeshPhongMaterial( { color: 0xfffffff, specular: 0x111111, shininess: 100 } );
      const mesh = new THREE.Mesh( geometry, material );

      mesh.position.set( 0, 0, 0 );
      mesh.rotation.set( - Math.PI / 2, 0 , 0 );
      mesh.scale.set( 0.005, 0.005, 0.005 );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.staticMesh = new THREE.Mesh( geometry, material );
      this.staticMesh = mesh;

      this.scene.add( mesh );
    },
    handleFiles(){
      this.fileList = this.files;
      // console.log("hey")
      let filename= this.fileList[0].name
      // console.log(filename)
      // console.log(scene.getObjectByName("model"))

      this.scene.remove(this.scene.getObjectByName("model"))
      this.loader.load( "./house/"+filename, this.load_moving);

      // console.log(scene)
    },
    addShadowedLight(x,y,z,color,intensity){
      const directionalLight = new THREE.DirectionalLight( color, intensity );
      directionalLight.position.set( x, y, z );
      this.scene.add( directionalLight );

      directionalLight.castShadow = true;

      const d = 1;
      directionalLight.shadow.camera.left = - d;
      directionalLight.shadow.camera.right = d;
      directionalLight.shadow.camera.top = d;
      directionalLight.shadow.camera.bottom = - d;

      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 4;

      directionalLight.shadow.bias = - 0.002;
    },
    onWindowResize(){
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize( window.innerWidth, window.innerHeight );
    },
    animate(){
      requestAnimationFrame( this.animate );

      this.render();
      // stats.update();
    },
    render(){
      // const timer = Date.now() * 0.0002;

      $(window).on("wheel", function(e) {
        if (e.originalEvent.deltaY > 0)
        {
          if(this.zoom<5)
            this.zoom += this.zoomStep;
        }
        else
        {
          if(this.zoom>1)
            this.zoom -= this.zoomStep;
        }
      });

      $(window).on("mousedown",function() {
        $(window).mousemove(function( event ) {
          const offset = event.pageX - this.prevPoint;
          if(offset > 0)
          {
            this.rotation += this.rotationSpeed;
          }
          else if(offset < 0)
          {
            this.rotation -= this.rotationSpeed;
          }
          this.prevPoint = event.pageX;
        });
      });

       $(window).on("mouseup",function() {
        $(window).off("mousedown");
        $(window).off("mousemove");
      });


      if(this.rotationBorder <= 0)
      {
        this.step = .01;
      }
      else if(this.rotationBorder > 5)
      {
        this.step = -.01;
      }
      this.rotationBorder = this.rotationBorder + this.step;
      this.camera.position.x = Math.cos( Math.PI * this.rotation) * this.zoom;
      this.camera.position.z = Math.sin( Math.PI * this.rotation) * this.zoom;

      this.rotationMesh.rotation.set( -0.1  * Math.PI * this.rotationBorder, 0,0 );
      this.camera.lookAt( this.cameraTarget );
      this.renderer.render( this.scene, this.camera );
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
  width: 100%;
  height: 100%;
}

.form-container {
  position: absolute;
  bottom: 30px;
  right: 0;
  max-width: 200px;
}
</style>