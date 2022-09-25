import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { MyRoom } from "./MyRoom";

function ThreeScene() {
  return (
    <Canvas camera={{ position: [3, 2.5, 2.2] }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControls target={[0, 0, 0]} />
      <axesHelper />

      <MyRoom />
    </Canvas>
  );
}

function App() {
  return (
    <div className="App h-screen">
      <ThreeScene />
    </div>
  );
}

export default App;
