import { useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { Color, Group, Mesh, MeshBasicMaterial } from "three";

export const MyRoom = () => {
  const gltf = useGLTF("./my room.glb");
  console.log(gltf);

  const { backgroundColor } = useControls({ backgroundColor: "#96B9D3" });
  const { map } = useTexture({ map: "./textures/Baked high res.jpg" });

  map.flipY = false;

  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child) => {
        if (child instanceof Mesh && child.name === "Base") {
          child.geometry.attributes.uv = child.geometry.attributes.uv2;
          child.material = new MeshBasicMaterial({ map });
        }
        if (child instanceof Group && child.name.startsWith("Drawer")) {
          child.children.forEach((subchild) => {
            subchild.geometry.attributes.uv = subchild.geometry.attributes.uv2;
            subchild.material = new MeshBasicMaterial({ map });
          });
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
