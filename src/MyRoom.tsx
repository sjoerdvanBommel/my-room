import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { Color, Mesh } from "three";

export const MyRoom = () => {
  const gltf = useGLTF("./my room.glb");
  const { backgroundColor } = useControls({ backgroundColor: "#96B9D3" });

  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });
    }
  }, [gltf]);

  useEffect(() => {
    const object = gltf?.scene.getObjectByName("BackgroundFloor");
    if (object instanceof Mesh) {
      object.material.color = new Color(backgroundColor);
    }
  }, [backgroundColor]);

  return <primitive object={gltf.scene} />;
};
