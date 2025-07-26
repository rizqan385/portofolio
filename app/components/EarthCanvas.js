'use client'

import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { OrbitControls, Stars } from '@react-three/drei'

function Earth(props) {
  const colorMap = useLoader(TextureLoader, '/textures/earthmap.jpg')
  return (
    <mesh {...props}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
  )
}

function Planet({ distance, size, speed, textureUrl, rotationSpeed = 0.01 }) {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, textureUrl)
  const angleRef = useRef(0)

  useFrame((_, delta) => {
    angleRef.current += speed * delta
    const x = distance * Math.cos(angleRef.current)
    const z = distance * Math.sin(angleRef.current)
    if (meshRef.current) {
      meshRef.current.position.set(x, 0, z)
      meshRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} metalness={0.3} roughness={1} />
    </mesh>
  )
}

function MilkyWayBackground() {
  const texture = useLoader(TextureLoader, '/textures/stars_milky_way.jpg')

  return (
    <mesh scale={[-100, 100, 100]}>
      <sphereGeometry args={[100, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

export default function EarthCanvas() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-10, 0, -10]} intensity={0.5} />

      {/* Background Stars and Milky Way */}
      <MilkyWayBackground />
      <Stars
        radius={100}
        depth={30}
        count={8000}
        factor={3}
        saturation={0}
        fade
      />

      {/* Earth */}
      <Earth position={[0, 0, 0]} />

      {/* Planets */}
      <Planet distance={4} size={0.3} speed={0.5} textureUrl="/textures/mercury.jpg" rotationSpeed={0.015} />
      <Planet distance={5.5} size={0.25} speed={0.3} textureUrl="/textures/venus.jpg" rotationSpeed={0.01} />
      <Planet distance={7} size={0.2} speed={0.4} textureUrl="/textures/sun2.jpg" rotationSpeed={0.02} />

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}
