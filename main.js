import * as three from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Maze3D from "maze3d/maze3d-es-node"

const container = document.getElementById("app")
const scene = new three.Scene()
const renderer = new three.WebGLRenderer()
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 20
renderer.setSize(window.innerWidth, window.innerHeight)
const controls = new OrbitControls(camera, renderer.domElement)
container.appendChild(renderer.domElement)

const constraints = {
  barrierChar: "X",
  spaceChar: " ",
  pathChar: "O",
  width: 11,
  height: 11,
  depth: 11,
  xChance: 3,
  yChance: 3,
  zChance: 3,
  diagChance: 3,
  voidSpace: [[0,20,0],[0,3,0],[0,4,0],[0,5,0],[0,5,1],[1,0,0],[1,1,0],[1,2,0],
  [1,3,0],[1,3,1],[1,4,0],[1,4,1],[1,5,0],[1,5,1],[1,5,2],[2,0,0],[2,0,1],
  [2,1,0],[2,1,1],[2,2,0],[2,2,1],[2,3,0],[2,3,1],[2,3,2],[2,4,0],[2,4,1],
  [2,4,2],[2,5,0],[2,5,1],[2,5,2],[3,0,0],[3,0,1],[3,0,2],[3,1,0],[3,1,1],
  [3,1,2],[3,2,0],[3,2,1],[3,2,2],[3,3,0],[3,3,1],[3,3,2],[3,4,0],[3,4,1],
  [3,4,2],[3,4,3],[3,5,0],[3,5,1],[3,5,2],[3,5,3],[4,0,0],[4,0,1],[4,0,2],
  [4,0,3],[4,1,0],[4,1,1],[4,1,2],[4,1,3],[4,2,0],[4,2,1],[4,2,2],[4,2,3],
  [4,3,0],[4,3,1],[4,3,2],[4,3,3],[4,4,0],[4,4,1],[4,4,2],[4,4,3],[4,5,0],
  [4,5,1],[4,5,2],[4,5,3],[4,5,4],[5,0,0],[5,0,1],[5,0,2],[5,0,3],[5,0,4],
  [5,1,0],[5,1,1],[5,1,2],[5,1,3],[5,1,4],[5,2,0],[5,2,1],[5,2,2],[5,2,3],
  [5,2,4],[5,3,0],[5,3,1],[5,3,2],[5,3,3],[5,3,4],[5,4,0],[5,4,1],[5,4,2],
  [5,4,3],[5,4,4],[5,5,0],[5,5,1],[5,5,2],[5,5,3],[5,5,4],[5,5,5],[6,0,0],
  [6,0,1],[6,0,2],[6,0,3],[6,0,4],[6,0,5],[6,1,0],[6,1,1],[6,1,2],[6,1,3],
  [6,1,4],[6,1,5],[6,2,0],[6,2,1],[6,2,2],[6,2,3],[6,2,4],[6,2,5],[6,3,0],
  [6,3,1],[6,3,2],[6,3,3],[6,3,4],[6,3,5],[6,4,0],[6,4,1],[6,4,2],[6,4,3],
  [6,4,4],[6,4,5],[6,5,0],[6,5,1],[6,5,2],[6,5,3],[6,5,4],[6,5,5],[7,0,0],
  [7,0,1],[7,0,2],[7,0,3],[7,0,4],[7,0,5],[7,0,6],[7,1,0],[7,1,1],[7,1,2],
  [7,1,3],[7,1,4],[7,1,5],[7,1,6],[7,2,0],[7,2,1],[7,2,2],[7,2,3],[7,2,4],
  [7,2,5],[7,2,6],[7,3,0],[7,3,1],[7,3,2],[7,3,3],[7,3,4],[7,3,5],[7,3,6],
  [7,4,0],[7,4,1],[7,4,2],[7,4,3],[7,4,4],[7,4,5],[7,4,6],[7,5,0],[7,5,1],
  [7,5,2],[7,5,3],[7,5,4],[7,5,5],[7,5,6],[8,0,0],[8,0,1],[8,0,2],[8,0,3],
  [8,0,4],[8,0,5],[8,0,6],[8,0,7],[8,1,0],[8,1,1],[8,1,2],[8,1,3],[8,1,4],
  [8,1,5],[8,1,6],[8,1,7],[8,2,0],[8,2,1],[8,2,2],[8,2,3],[8,2,4],[8,2,5],
  [8,2,6],[8,2,7],[8,3,0],[8,3,1],[8,3,2],[8,3,3],[8,3,4],[8,3,5],[8,3,6],
  [8,3,7],[8,4,0],[8,4,1],[8,4,2],[8,4,3],[8,4,4],[8,4,5],[8,4,6],[8,4,7],
  [8,5,0],[8,5,1],[8,5,2],[8,5,3],[8,5,4],[8,5,5],[8,5,6],[8,5,7]],
  voidChar: "#",
  sliceOffVoid: true
};

const clientMaze = new Maze3D(constraints)
clientMaze.generateMazeTemplate()
clientMaze.generateMazeBarriers()
while (clientMaze.path.length === 0){
  try {
     clientMaze.solveMaze([0,0,0], [constraints.depth-1, constraints.height-1,constraints.width-1])
  } catch(e) {
     if (e.message.startsWith("solveMaze Error 4")) {
         clientMaze.generateMazeBarriers()
     } else {
        console.log(e)
        break;
      }
   }
}
console.log(clientMaze)

const modelOptions = {
  geometry: new three.BoxGeometry(1, 1, 1),
  instance: true,
  barrier: {
     generate: true,
     opacity: 1.0,
     color: 0x0000ff
  },
  space: {
     generate: false,
     opacity: 1.0,
     color: 0xff0000
  },
  path: {
     generate: true,
     opacity: 1.0,
     color: 0x00ff00
  },
  void: {
     generate: false,
     opacity: 1.0,
     color: 0x634f4f
  },
  map: {
     generate: false,
     opacity: 1.0,
     color: 0xf1f10f
  }
};
clientMaze.generateModel(modelOptions)
clientMaze.modelAPI("addModel", scene)


const lightOptions = {
  intensity: 0.3,
  colorHex: 0xffaaaa,
  distanceMultXYZ: [constraints.depth, constraints.height, constraints.width],
  showTargetObj: false,
  shadow: {
     enabled: false,
     type: three.PCFSoftShadowMap,
     mapWidth: 2056,
     mapHeight: 2056,
     near: 0.5,
     far: 500,
     bias: -0.00001,
     penumbra: 0.5
  }
};
Object.assign(lightOptions, clientMaze.getCornerSpotLightData());


clientMaze.generateSpotLights(renderer, lightOptions)
clientMaze.modelAPI("addLights", scene)
renderer.setAnimationLoop(() => {
  controls.update()
  renderer.render(scene, camera)
})