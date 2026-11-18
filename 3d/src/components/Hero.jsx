import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Crystal() {
  const mesh = useRef(null)

  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.25
    mesh.current.rotation.x += delta * 0.1
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshStandardMaterial color="#c9a24b" wireframe />
    </mesh>
  )
}

function Stars() {
  const pts = useRef(null)

  // 600 nombres = 200 étoiles (x, y, z), calculées une seule fois
  const positions = useMemo(
    () => new Float32Array(Array.from({ length: 600 }, () => (Math.random() - 0.5) * 14)),
    []
  )

  useFrame((_, delta) => {
    if (pts.current) pts.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#f5efe6" size={0.03} sizeAttenuation />
    </points>
  )
}

export default function Hero() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0b1220' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <Crystal />
        <Stars />
      </Canvas>
    </div>
  )
}