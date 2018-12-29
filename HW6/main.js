/////////////////////////////////////////////////////////
// global variables
var camera, renderer;
var agent;
//初始化变量
var hour,minute,second;//时 分 秒
hour=minute=second=0;//初始化
var millisecond=0;//毫秒
var start

// program starts here ...
init();
animate();

function init() {

  initThree();
  start=setInterval(timer,50);//每隔50毫秒执行一次timer函数;
  
  //scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 500;
  camera.position.y = 400;


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  /////////////////////////////////////////////////////////////////////

  
  // scene grid [-400,400]x[-400,400]
  var gridXZ = new THREE.GridHelper(800, 80, 'red', 'white');
  scene.add(gridXZ);

  // in scene.js
  sceneFromJSON ( );  // using LevelDesigner
  
  //////////////////////////////////////////////////////////////////////////	
  	let size = 10; // halfsize of agent
//    agent = new Agent(new THREE.Vector3(-400 + 400 * Math.random(), 0, -400 + 400 * Math.random()), mesh);
    agent = new Agent(new THREE.Vector3(50,0,-50), size);

}


function animate() {

  agent.update(0.05)
  
  // check agent crossing obstacles ...
  scene.obstacles.forEach ( function (obs) { obs.checkCollision (agent)} );

  if (scene.targets.length > 0)
  	requestAnimationFrame(animate);
  else{
	  alert ('game over')
	  window.clearInterval(start);
  }
  	

  render();
}

function render() {
  renderer.render(scene, camera);
}

 

//计时函数
function timer()
{
  millisecond=millisecond+50;
  if(millisecond>=1000)
  {
	millisecond=0;
	second=second+1;
  }
  if(second>=60)
  {
	second=0;
	minute=minute+1;
  }

  if(minute>=60)
  {
	minute=0;
	hour=hour+1;
  }
  document.getElementById('time').innerHTML=hour+'时'+minute+'分'+second+'秒';

}


