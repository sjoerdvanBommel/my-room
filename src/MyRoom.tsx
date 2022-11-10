import { useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { Color, Mesh, MeshBasicMaterial, sRGBEncoding, Texture } from "three";

const BAKED_POSTFIX = "_baked";
const SCREEN_POSTFIX = "_screen";

export const MyRoom = () => {
  const gltf = useGLTF("./my room.glb");

  const texturePaths: string[] = [];
  gltf.scene.traverse((child) => {
    if (child.name.endsWith(BAKED_POSTFIX)) {
      texturePaths.push(
        child.name.substring(0, child.name.length - BAKED_POSTFIX.length)
      );
    }
  });

  const { backgroundColor } = useControls({ backgroundColor: "#96B9D3" });
  const textures = useTexture(
    texturePaths.map((x) => `./textures/${x}.jpg`),
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
        // if (child instanceof Mesh && child.name.endsWith(SCREEN_POSTFIX)) {
        //   child.material = new MeshStandardMaterial({
        //     roughness: 0,
        //     metalness: 1,
        //   });
        // }
        if (
          child instanceof Mesh &&
          texturePaths.find(
            (x) =>
              child.parent?.name.startsWith(x) &&
              child.parent?.name.endsWith(BAKED_POSTFIX)
          )
        ) {
          if (child.geometry.attributes.uv2) {
            child.geometry.attributes.uv = child.geometry.attributes.uv2;
          }
          // TODO: reuse material
          const map =
            textures[
              texturePaths.indexOf(
                child.parent!.name.substring(
                  0,
                  child.parent!.name.length - BAKED_POSTFIX.length
                )
              )
            ];

          child.material = new MeshBasicMaterial({ map });
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
