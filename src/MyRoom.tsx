import { useGLTF } from '@react-three/drei';

export const MyRoom = () => {
  const gltf = useGLTF('./my room.glb');

  return (
    <primitive object={gltf.scene} />
  )
}
