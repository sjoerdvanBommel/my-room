import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { CameraHelper, PerspectiveCamera } from "three";
import "./App.css";
import { MyRoom } from "./MyRoom";

function ThreeScene() {
  const { fogColor } = useControls({
    fogColor: "#e7f4f8",
  });

  const shadowCameraRef = useRef<PerspectiveCamera>(null!);
  useHelper(shadowCameraRef, CameraHelper);

  return (
    <>
      {/* <ambientLight /> */}
      <pointLight
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadow-bias={-0.00004}
      />
      {/* <pointLight
        position={[-3, -3, 2]}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        shadow-bias={-0.00001}
      /> */}
      <OrbitControls
        minDistance={3.25}
        maxDistance={5.5}
        // Don't allow going below the room
        maxPolarAngle={Math.PI / 2}
        enablePan={false}
      />
      <axesHelper />
      <Environment files={"studio.hdr"} />
      <fog attach="fog" args={[fogColor]} near={6} far={10} />

      <MyRoom />
    </>
  );
}

function App() {
  return (
    <div className="App h-screen">
      <Canvas shadows camera={{ position: [3, 2.5, 2.2] }}>
        <ThreeScene />
      </Canvas>
    </div>
  );
}

export default App;
