import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { sRGBEncoding } from "three";
import "./App.css";
import { MyRoom } from "./MyRoom";

function ThreeScene() {
  const controlsRef = useRef(null!);

  return (
    <>
      <OrbitControls
        minDistance={3.25}
        maxDistance={20}
        minPolarAngle={0.7}
        // Don't allow going below the room
        maxPolarAngle={Math.PI / 2 - 0.3}
        maxAzimuthAngle={2.8}
        minAzimuthAngle={-0.6}
        enablePan={false}
        target={[0, 0.8, 0]}
        ref={controlsRef}
      />
      <Stage
        shadows
        intensity={1}
        environment="city"
        preset="rembrandt"
        controls={controlsRef}
        adjustCamera={false}
      >
        <MyRoom />
      </Stage>
    </>
  );
}

function App() {
  return (
    <div className="App h-screen w-screen">
      <Canvas shadows gl={{ outputEncoding: sRGBEncoding }}>
        <PerspectiveCamera makeDefault position={[7, 5.5, 7.2]} />
        <ThreeScene />
      </Canvas>
    </div>
  );
}

export default App;
