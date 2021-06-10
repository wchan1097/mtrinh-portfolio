var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var step = 0;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

window.onload = init();

window.onresize = () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  renderer.setSize(screenWidth, screenHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render();
}

function render() {
  let regex = new RegExp('^cube-[\d]*');
  scene.traverse((element) => {
    if (regex.test(element.name)) {
      console.log(camera);
    }
  })
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function init() {
  /* ---------------------------- Functions ---------------------------- */

  /* ------------------------------ Scene ------------------------------ */

  /**
   * Scene initialized. 
   */
  renderer.setClearColor(0xd1daff);
  renderer.setSize(screenWidth, screenHeight);
  renderer.shadowMap.enabled = true;

  var axis = new THREE.AxesHelper(20);

  /**
   * Plane element initialized. 
   */

  var planeGeometry = new THREE.PlaneGeometry(30, 60, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial(new THREE.Color("rgb(255, 255, 255)"));
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  plane.rotation.x = -.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  /**
   * Spot light element initialized. 
   */

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 40, -10);
  spotLight.castShadow = true;

  var ambientLight = new THREE.AmbientLight(0x99a0de);

  /**
   * Adding elements to scene. 
   */

  scene.add(plane);
  scene.add(spotLight);
  scene.add(ambientLight);

  /**
   * Camera element initialized. 
   */

  camera.position.x = -50;
  camera.position.y = 0;
  camera.position.z = 0;

  camera.lookAt(scene.position);

  var controls = new function () {
    this.numberOfObjects = scene.children.length;
    this.rotationSpeed = .02;
    this.maxSize = 6;
    this.autoAddCube = false;
    this.addCube = function () {
      var sphereSize = Math.ceil(Math.random() * this.maxSize + 1);
      var sphereGeometry = new THREE.SphereGeometry(sphereSize, 30, 30);
      var sphereMaterial = new THREE.MeshLambertMaterial({
        color: new THREE.Color(`rgb(150,150,150)`)
      });
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.x = -15 + Math.round(Math.random() * planeGeometry.parameters.width);
      sphere.position.y = (sphereSize / 2) + Math.round((Math.random() * (30) - 15));
      sphere.position.z = -30 + Math.round(Math.random() * planeGeometry.parameters.height);
      sphere.castShadow = true;
      scene.add(sphere);
    }
    this.removeCube = function () {
      var allChildren = scene.children;
      var lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    }
  }

  scene.fog = new THREE.Fog(0xd1daff, -10, 60);

  /**
   * Render.
   */
  var initMax = 20;
  for (var initCube = 0; initCube < initMax; initCube++) {
    controls.addCube();
  }
  $("#webgl").append(renderer.domElement);
  render();
}