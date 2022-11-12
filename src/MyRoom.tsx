import { Html, useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Mesh, MeshBasicMaterial, sRGBEncoding, Texture } from "three";

const BAKED_POSTFIX = "_baked";
const SCREEN_POSTFIX = "_screen";
const GLASS_POSTFIX = "_glass";

export const MyRoom = () => {
  const gltf = useGLTF("./my room.glb");
  const boxGltf = useGLTF("./box.glb");

  const texturePaths: string[] = [];
  gltf.scene.traverse((child) => {
    if (child.name.endsWith(BAKED_POSTFIX)) {
      texturePaths.push(
        child.name.substring(0, child.name.length - BAKED_POSTFIX.length)
      );
    }
  });

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
        if (child instanceof Mesh && child.name.endsWith(GLASS_POSTFIX)) {
          // child.material = new MeshPhysicalMaterial({
          //   color: "white",
          //   emissive: "white",
          //   emissiveIntensity: 2,
          // });
        } else if (
          child instanceof Mesh &&
          child.name.endsWith(SCREEN_POSTFIX)
        ) {
          child.material = new MeshBasicMaterial({ color: "black" });
        } else if (
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

  const tvScreen = gltf.scene.getObjectByName("TV_screen");
  const gltfRef = useRef(null!);

  return (
    <>
      <primitive object={boxGltf.scene} />
      <primitive object={gltf.scene} ref={gltfRef} />
      <Html
        transform
        center
        scale={0.055}
        position={[
          tvScreen!.position.x,
          tvScreen!.position.y + 0.3,
          tvScreen!.position.z - 0.05,
        ]}
        rotation={[
          tvScreen!.rotation.x,
          tvScreen!.rotation.y + Math.PI,
          tvScreen!.rotation.z,
        ]}
        occlude={[gltfRef]}
      >
        <img
          src="./netflix-intro.gif"
          className="w-[692px] max-w-none select-none pointer-events-none"
        />
      </Html>
    </>
  );
};
