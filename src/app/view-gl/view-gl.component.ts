// SSL cert: https://www.section.io/engineering-education/how-to-get-ssl-https-for-localhost/
// SSL cert (works): https://medium.com/@richardr39/using-angular-cli-to-serve-over-https-locally-70dab07417c8
import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, 
  OnDestroy, ChangeDetectionStrategy, ElementRef, QueryList } from '@angular/core';
import * as THREE from 'three';
import { Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HttpContext, HttpHeaders } from '@angular/common/http';
import {HostListener} from '@angular/core';

@Component({
  selector: 'view-gl',
  templateUrl: './view-gl.component.html',
  styleUrls: ['./view-gl.component.css'],
  // changeDetection : 
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class ViewGLComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('title') title : any;
  @ViewChild('myCanvas') canvas : any;
  @ViewChild('xrbutton') xrbutton : any;
  // context: CanvasRenderingContext2D = new CanvasRenderingContext2D;

  
  container :any ;


  camera: THREE.PerspectiveCamera  ;
  scene: THREE.Scene ;
  renderer: any ;
  controls :any;
  loader: GLTFLoader ;
  // gl: WebGLRenderingContext;
  

  //some 3D model for the mesh
  cube01: THREE.Mesh ;
  cube01_wireframe : THREE.Mesh  ;
  bar01 : THREE.Mesh  ;
  bar02 : THREE.Mesh  ;
  canvas1 : any;
  // ctxgl : WebGLRenderingContext;

  // myPaymentPromise = new Promise<string | string>((resolve, reject) => {
  //   // a resolved promise with  an object of 1000 Euro payment
  //   // and a thank you message
  //   resolve(
  //      'Thank You',
  //   )
  //   // reject with 0 Euro and an unstatisfatory note
  //   reject('Sorry Lawn was not properly Mowed',
  //   )
  // })  
 
  // @HostListener('document:keyup', ['$event'])
  //   onKeyUp(ev:KeyboardEvent) {
  //     // do something meaningful with it
  //     console.log(`The user just pressed ${ev.key}!`);
  // }
  // @HostListener('window:onload', ['$event'])
  // onPageLoad(event: Event) {
  //   console.log('***** loaded this is veryt good',event); 
  // }
  // afterTrowingHandler(error: { message: any; stack: any; }, [ event ]: any) {
  //   const { message, stack } = error
  //   const { type, currentTarget } = event;
  //   console.log({
  //     error: { message, stack },
  //     event: { type, currentTarget },
  //   });
  // }
  
  // @HostListener('document:DOMContentLoaded', ['$event'])
  // onDomContentLoaded(event: Event) {
  //   // var script1 = document.createElement('script');
    // script1.type = 'text/javascript';
    // script1.src = 'https://aframe.io/releases/1.4.1/aframe.min.js';    
    // document.head.appendChild(script1);
    
    // var script2 = document.createElement('script');
    // script2.type = 'text/javascript';
    // script2.src = 'https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js';    
    // document.head.appendChild(script2);    
    
    // var script3 = document.createElement('script');
    // script3.type = 'text/javascript';
    // script3.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js';    
    // document.head.appendChild(script3);

    // const app = document.getElementById("ardiv");

    // --code below is for AR.js but it shows a cube that cannot be moved from the front of the screen ---
    //  const app = document.getElementById("myscene");
    // const mydiv = document.getElementById("mydiv");

    // // mydiv?.addEventListener("touchend", function(event){
    // console.info("They did click! "+navigator);
    // console.info(navigator);
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position)=>{
    //   const longitude = position.coords.longitude;
    //   const latitude = position.coords.latitude;
    //   console.info("My GPS are: "+ longitude +  " and " + latitude);

    //   const box = document.createElement("a-entity");
    //   box.setAttribute('material', "color: red");
    //   box.setAttribute('geometry', "primitive: box");
    //   // box.setAttribute('gps-new-entity-place', 'latitude: 50.857; longitude: -0.167');
    //   box.setAttribute("gps-new-entity-place", "latitude: "+latitude+0.000+"; longitude: "+longitude+0.001+"'");
    //   // box.setAttribute('position','0 0 ');
    //   box.setAttribute('scale', '10 10 10');
    //   app?.appendChild(box);


    //   });
    // } else {
    // console.log("No support for geolocation")
    // }   
    
    // --------------
    //});
    // // 2. Create a new <p></p> element programmatically
    
    // const scene = document.createElement("a-scene");
    // scene.setAttribute("embedded", '');
    // scene.setAttribute("arjs", '');
    // app?.appendChild(scene);

    // const marker = document.createElement("a-marker-camera");
    // marker.setAttribute("preset", "hiro");
    // scene.appendChild(marker);

    // // const box = document.createElement("a-entity");
    // // box.setAttribute("geometry", "primitive: box; width: 3");
    // // box.setAttribute("material", "color: red");
    // // box.setAttribute('position', '0 0 0');
    // const box = document.createElement("a-box");
    // box.setAttribute('color', "#4CC3D9");
    // box.setAttribute('position', '0 0.7 0');
    // app?.appendChild(box);

    // const box = document.createElement("a-entity");
    // box.setAttribute('material', "color: red");
    // box.setAttribute('geometry', "primitive: box");
    // box.setAttribute('position', '0 0.7 0');
    // app?.appendChild(box);


    

    // <a-entity material='color: red' geometry='primitive: box' gps-new-entity-place="latitude: <your-lat>; longitude: <your-loon>" scale="10 10 10"></a-entity>


    // // 3. Add the text content
    // // p.textContent = "Hello, World!";
    // // 4. Append the p element to the div element


    // const camera = document.createElement("a-entity");
    // camera.setAttribute("camera", "");
    // scene.appendChild(camera);



    // const sky = document.createElement("sky");

    // sky.setAttribute("color", "#ECECEC");
    // app?.appendChild(sky);

    // console.log('DOMContentLoaded TODO: your logic');

    // //do the camera bit
    // let testEntityAdded = false;
    // // const el = document.getElementById("mycamera");

    // const el = document.querySelector("[gps-new-camera]");
    // // console.log("I am here 2"+el);
    // console.log(el?.attributes);
    // // console.log("I am here 2"+el?.print);
    // // if (el){
    // //   console.log("I am here 3");

    // el?.addEventListener("gps-camera-update-position", function(event) {
    //   console.log("I will run even though the previous handler crashed");

      // console.log("I am here 4");

      //   if(!testEntityAdded) {
      //     console.log("I am here");

      //       // alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
      //       // Add a box to the north of the initial GPS position
      //       // const entity = document.createElement("a-box");
      //       // entity.setAttribute("scale", {
      //       //     x: 20, 
      //       //     y: 20,
      //       //     z: 20
      //       // });
      //       // entity.setAttribute('material', { color: 'red' } );
      //       // entity.setAttribute('gps-new-entity-place', {
      //       //     latitude: e.detail.position.latitude + 0.001,
      //       //     longitude: e.detail.position.longitude
      //       // });
      //       // document.querySelector("a-scene").appendChild(entity);
      //   }
      //   testEntityAdded = true;
    // });


     
    // }
  // }
  constructor() { 
    // this.gl = new WebGLRenderingContext();
    
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.001, 10000);
    // The API directly updates the camera matrices.
    // Disable matrix auto updates so three.js doesn't attempt
    // to handle the matrices independently.
    //this was in the AR API not sure why!
    // this.camera.matrixAutoUpdate = false;


    this.scene = new THREE.Scene();
    this.loader = new GLTFLoader();

    const light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
    this.scene.add( light );


    // // add the scene
    var geometry = new THREE.BoxGeometry( 1,1,1 );
    var material = new THREE.MeshBasicMaterial( { color: "#99ccff" ,
    wireframe:false,
    opacity: 0.5,
    transparent: true,
    alphaTest: 0.05   } );
    this.cube01 = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube01 );

    var geometry = new THREE.BoxGeometry( 3,3,3 );
    var material = new THREE.MeshBasicMaterial( { color: "#433F81",wireframe:true,transparent:true } );
    this.cube01_wireframe = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube01_wireframe );

    var geometry = new THREE.BoxGeometry( 10,0.05,0.5 );
    var material = new THREE.MeshBasicMaterial( { color: "#66ff66" } );
    this.bar01 = new THREE.Mesh( geometry, material );
    this.bar01.position.z = 0.5;
    this.scene.add( this.bar01 );

    var geometry = new THREE.BoxGeometry( 10,0.05,0.5 );
    var material = new THREE.MeshBasicMaterial( { color: "#ff9900" } );
    this.bar02 = new THREE.Mesh( geometry, material );
    this.bar02.position.z = 0.5;
    this.scene.add( this.bar02 );
    this.loadFile();

    
  }
  ngOnInit(): void {

  }

  async afterDOMLoaded(){
    // const app = document.getElementById("myscene");

    // // mydiv?.addEventListener("touchend", function(event){
    //   console.info("They did click! "+navigator);
    //   console.info(navigator);
    //   if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition((position) => {
    //       const longitude = position.coords.longitude;
    //       const latitude = position.coords.latitude;
    //       console.info("My GPS are: " + longitude + " and " + latitude);

    //       const box = document.createElement("a-entity");
    //       box.setAttribute('material', "color: red");
    //       box.setAttribute('geometry', "primitive: box");
    //       // box.setAttribute('gps-new-entity-place', 'latitude: 50.857; longitude: -0.167');
    //       box.setAttribute('gps-new-entity-place','latitude: ' + latitude + 0 + '; longitude: ' + longitude + 0.1 + '\'');
    //       box.setAttribute('scale', '5 5 5');
    //       app?.appendChild(box);

    //       const west = longitude - 0.001, east = longitude + 0.001, south = latitude - 0.001, north = latitude + 0.001;

    //       // const response = await fetch(`https://hikar.org/webapp/map?bbox=${west},${south},${east},${north}&layers=poi&outProj=4326`);
    //       // const pois = await response.json();
    //       // pois.features.forEach(feature => {
    //       //   const entity = document.createElement("a-box");
    //       //   entity.setAttribute("scale", {
    //       //     x: 20,
    //       //     y: 20,
    //       //     z: 20
    //       //   });
    //       //   entity.setAttribute('material', { color: 'red' });
    //       //   entity.setAttribute('gps-new-entity-place', {
    //       //     latitude: feature.geometry.coordinates[1],
    //       //     longitude: feature.geometry.coordinates[0]
    //       //   });
    //       //   document.querySelector("a-scene").appendChild(entity);
    //       // });

    //     });
    // } else {
    //    console.log("No support for geolocation")
    // }    
  }
  createContext() : WebGLRenderingContext{
    // // this.container  = document.createElement( 'div' );

    // keep this to initialise canvas
    // this.canvas1  = document.createElement( 'canvas' );
    // this.canvas1 = document.getElementById('glcanvas');
    // document.createElement( 'canvas' );
    // console.log(this.canvas.nativeElement.getContext("experimental-webgl"));

    // this.canvas.nativeElement.getContext('webgl', {xrCompatible: true});
    this.canvas1 = this.canvas.nativeElement;
    // console.log();

    // this.canvas1.width = 1000;//window.innerWidth;
    // console.log(this.canvas1.width);
    // console.log(window.innerWidth);
    // this.canvas1.height = 2;//window.innerHeight;
    // this.canvas1.style.border = "10px solid red";
    // var context = this.canvas1.getContext('webgl', {xrCompatible: true});
    // console.log("***"+this.canvas.nativeElement.getContext('webgl', {xrCompatible: true}));

    

    // this.ctxgl = new WebGLRenderingContext();

    // // var ctx = canvas1.getContext('webgl');
    // // if (ctx!=null){
    // //   console.log("1111");
    // //   console.log(ctx);
    // //   ctx.enable(ctx.DEPTH_TEST);
    // //   ctx.clearColor(0.1, 0.5, 0.1, 1.0);
    // //   ctx.blendColor(0.1, 0.5, 0.1, 1.0);
    // //   ctx.clear(ctx.DEPTH_BUFFER_BIT | ctx.COLOR_BUFFER_BIT);
    // // }

    // this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas1 });


    // var ctx = this.canvas1.getContext("2d");
   
    // const gl = this.canvas1.getContext("webgl", {xrCompatible: true});
    const gl = this.canvas.nativeElement.getContext("webgl", {xrCompatible: true});
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
      );
    }
    // Set up the WebGLRenderer, which handles rendering to the session's base layer.
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: true,
      canvas: this.canvas1,
      context: gl
    });
    this.renderer.autoClear = false;
    //initialise the renderer
    this.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    this.renderer.setClearColor("#FFFFFF");
    this.camera.position.set( 0, 2, 30 );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);


    // this.canvas1.setAttribute("id", "myCanvas");
    // this.ctxgl = this.canvas1.getContext('experimental-webgl');
    // if (!this.ctxgl) {
    // // browser supports WebGL but initialization failed.
    // console.log("I am broken");
    // }else{
    // console.log("YEIII not broken");

    // }
    return gl;
  
    }
    createScene(){


      // The cube will have a different color on each side.
      const materials = [
        new THREE.MeshBasicMaterial({color: 0xff0000}),
        new THREE.MeshBasicMaterial({color: 0x0000ff}),
        new THREE.MeshBasicMaterial({color: 0x00ff00}),
        new THREE.MeshBasicMaterial({color: 0xff00ff}),
        new THREE.MeshBasicMaterial({color: 0x00ffff}),
        new THREE.MeshBasicMaterial({color: 0xffff00})
      ];
      
      const geometry = new THREE.BoxGeometry( 16, 16, 16 );
      const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
      const cube = new THREE.Mesh( geometry, materials );
      cube.position.set(0, 0, 0);
      // this.scene.add( cube );

      // var geometry1 = new THREE.BoxGeometry( 1,1,1 );
      // var material1 = new THREE.MeshBasicMaterial( { color: "#99ccff" ,
      // wireframe:false,
      // opacity: 0.5,
      // transparent: true,
      // alphaTest: 0.05   } );
      // var cube01 = new THREE.Mesh( geometry, material );
      // this.scene.add( cube01 );


      // Create the cube and add it to the demo scene.
      // const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2), materials);
      // scene.add(cube);   
    }


    onSessionStarted(session : any, gl : WebGLRenderingContext) {
      // let xrSession: any = null;
      // let xrReferenceSpace = null;

      // // Store the session for use later.
      let xrSession = session;
    
      // xrSession.requestReferenceSpace('local')
      // .then((referenceSpace) => {
      //   xrReferenceSpace = referenceSpace;
      // })
      // .then(setupWebGLLayer) // Create a compatible XRWebGLLayer
      // .then(() => {
      //   // Start the render loop
      //   xrSession.requestAnimationFrame(onDrawFrame);
      // });

      // let xrSession: any = null;
      let xrReferenceSpace = null;

      // Store the session for use later.
      // let xrSession = session;
      //xrSession.updateRenderState({
      //   baseLayer: new XRWebGLLayer(xrSession, gl)
      // });
      // A 'local' reference space has a native origin that is located
      // near the viewer's position at the time the session was created.
      // const referenceSpace = await session.requestReferenceSpace('local');

      xrSession.requestReferenceSpace('local')
      .then((xrReferenceSpace : any) => {

      // Create a render loop that allows us to draw on the AR view.
      const onXRFrame = (time : any, frame: any) => {
      // Queue up the next draw request.
      xrSession.requestAnimationFrame(onXRFrame.bind(this));
      alert(
        "this is me."
        );
      // // Bind the graphics framebuffer to the baseLayer's framebuffer
      // gl.bindFramebuffer(gl.FRAMEBUFFER, xrSession.renderState.baseLayer.framebuffer)

      // Retrieve the pose of the device.
      // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
      //const pose = frame.getViewerPose(xrReferenceSpace);
      // if (pose) {
      // // In mobile AR, we only have one view.
      // const view = pose.views[0];

      // const viewport = xrSession.renderState.baseLayer.getViewport(view);
      // this.renderer.setSize(viewport.width, viewport.height)

      // // window.requestAnimationFrame(this.render.bind(this));
      // // this.cube01.rotation.x += 0.002;
      // // this.cube01.rotation.y += 0.002;
      // // this.cube01.rotation.z += 0.002;
      // // this.cube01_wireframe.rotation.x += 0.01;
      // // this.cube01_wireframe.rotation.y += 0.01;

      // // this.bar01.rotation.z-=0.01;
      // // this.bar02.rotation.z+=0.01;  

      // // // Use the view's transform matrix and projection matrix to configure the THREE.camera.
      // // this.camera.matrix.fromArray(view.transform.matrix)
      // // this.camera.projectionMatrix.fromArray(view.projectionMatrix);
      // // this.camera.updateMatrixWorld(true);

      // // // Render the scene with THREE.WebGLRenderer.
      // // this.renderer.render(this.scene,this.camera);
      // // }
      }
      // xrSession.requestAnimationFrame(onXRFrame.bind(this));
      });

    }

    // implement this https://github.com/immersive-web/webxr-samples/blob/main/immersive-ar-session.html
    async beginXRSession(gl : WebGLRenderingContext){
      // window.navigator.xr?.requestSession("immersive-ar")
      // .then(session => {

      //   session.updateRenderState({
      //     //   baseLayer: new XRWebGLLayer(session, gl),
      //     // });
      // })}
      // ).catch(error => console.log("Error: "+error.message)); // logs any error from the promise

      // console.log("1");
      // // session?.updateRenderState({
      // //   baseLayer: new XRWebGLLayer(session, gl),
      // // });
      // console.log("3");

      // A 'local' reference space has a native origin that is located
      // near the viewer's position at the time the session was created.
      // const referenceSpace = await session?.requestReferenceSpace('local');

      // requestSession must be called within a user gesture event
      // like click or touch when requesting an immersive session.


      window.navigator.xr?.requestSession('immersive-ar')
      .then((session) =>{
      this.onSessionStarted(session,gl)
      }
      )
      .catch(err => {
        // May fail for a variety of reasons. Probably just want to
        // render the scene normally without any tracking at this point.
        console.log("Session not supported: "+err);

        // window.requestAnimationFrame(onDrawFrame);
      });

      
    }

    async createXRSession(gl : WebGLRenderingContext){

      if ("xr" in window.navigator) {

        // Check to see if there is an XR device available that supports immersive VR
        // presentation (for example: displaying in a headset). If the device has that
        // capability the page will want to add an "Enter VR" button to the page (similar to
        // a "Fullscreen" button) that starts the display of immersive VR content.
        console.log("Supported "+window.navigator.xr);

        window.navigator.xr?.isSessionSupported('immersive-ar').then(
          (supported) => {
            console.log("Supported "+supported);
            if (supported) {
              var enterXrBtn = document.createElement("button");
              
              enterXrBtn.innerHTML = "Enter AR";
              var myobject = this;
              enterXrBtn.addEventListener("click", function(){ 
                myobject.beginXRSession(gl)
              }, false);
              this.xrbutton.nativeElement.appendChild( enterXrBtn )
            } else {
              console.log("A button cannot be created/ ");
            }
        }).catch(err => {
          // May fail for a variety of reasons. Probably just want to
          // render the scene normally without any tracking at this point.
          console.log("Session not supported: "+err);
  
          // window.requestAnimationFrame(onDrawFrame);
        });;
        
        console.log("I am here");
        /* WebXR can be used! */

        // Initialize a WebXR session using "immersive-ar".
        // const session = await window.navigator.xr?.requestSession("immersive-ar")
        // .then(() => myPaymentPromise.then(res => console.log(res)))
        // .catch(error => console.log(error));

       

      } else {
        /* WebXR isn't available */
        alert(
          "WebXR not available!"
          );
      }

      
    }
    protected loadFile(){

      this.loader.loadAsync('/assets/Parrot.glb')
      .then(data => {

        console.log(data);
        const model = data.scene.children[0];
        model.position.set(0, 0, 0);
        model.scale.set(0.5,0.5,0.5);
        var mixer= new THREE.AnimationMixer(model);

        this.scene.add(model);
      }, 
      function reject() {
       console.log("rerr")
      } 
      );
  }
  ngAfterViewInit() : void {
    if(document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded',this.afterDOMLoaded);
    } else if(document.readyState === 'interactive')  {
      let gl : WebGLRenderingContext = this.createContext();
      this.createScene();
      this.createXRSession(gl);
      console.log("&&&");

      console.log(this.canvas1.offsetHeight);
      console.log(this.canvas1.offsetWidth);
      // this.canvas1.setAttribute("width","10%");
      // console.log(this.canvas1.attributes);
      // this.canvas1.width = 1445;
      // this.canvas1.height = 10;
    } else if(document.readyState === 'complete')  {
      
      this.canvas1.height = 500;
      this.canvas1.width = 500;
    }
    // this.title.nativeElement.appendChild( this.renderer.domElement );
    // this.createScene();
    this.render();


  } 
  ngOnDestroy(){
    
  }
  private render() {
    window.requestAnimationFrame(this.render.bind(this));
    this.cube01.rotation.x += 0.002;
    this.cube01.rotation.y += 0.002;
    this.cube01.rotation.z += 0.002;
    this.cube01_wireframe.rotation.x += 0.01;
    this.cube01_wireframe.rotation.y += 0.01;

    this.bar01.rotation.z-=0.01;
    this.bar02.rotation.z+=0.01;     
    this.renderer.render( this.scene, this.camera );
  }

}
