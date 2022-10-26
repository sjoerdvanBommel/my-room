import { useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { Color, Mesh, MeshBasicMaterial, sRGBEncoding, Texture } from "three";

export const MyRoom = () => {
  const gltf = useGLTF("./my room.glb");
  console.log(gltf);

  const { backgroundColor } = useControls({ backgroundColor: "#96B9D3" });
  const [closetMap, clothingClosetMap, roomMap] = useTexture(
    [
      "./textures/Baked high res.jpg",
      "./textures/Clothing closet.jpg",
      "./textures/room.jpg",
    ],
    (textures) => {
      (textures as Texture[]).forEach((texture) => {
        texture.flipY = false;
        texture.encoding = sRGBEncoding;
      });
    }
  );

  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          if (child.parent?.name === "GeneralClosset") {
            child.geometry.attributes.uv = child.geometry.attributes.uv2;
            child.material = new MeshBasicMaterial({ map: closetMap });
          }
          if (child.parent?.name === "ClothingCloset") {
            child.geometry.attributes.uv = child.geometry.attributes.uv2;
            child.material = new MeshBasicMaterial({ map: clothingClosetMap });
          }
          if (child.name === "Room") {
            child.geometry.attributes.uv = child.geometry.attributes.uv2;
            child.material = new MeshBasicMaterial({ map: roomMap });
          }
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
