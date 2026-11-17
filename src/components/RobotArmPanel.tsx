import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import * as THREE from 'three';

const CYCLE_DURATION = 9;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothStep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function RobotArm({ paused }: { paused: boolean }) {
  const baseRef = useRef<THREE.Group>(null);
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);
  const wristRef = useRef<THREE.Group>(null);
  const leftFingerRef = useRef<THREE.Group>(null);
  const rightFingerRef = useRef<THREE.Group>(null);
  const objectRef = useRef<THREE.Group>(null);
  const animationTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  const sourcePosition = useMemo(() => new THREE.Vector3(2.35, 0.9, -1.5), []);
  const destinationPosition = useMemo(() => new THREE.Vector3(-2.45, 0.92, 1.45), []);

  useFrame((state) => {
    const now = state.clock.getElapsedTime();

    if (paused) {
      lastFrameTimeRef.current = now;
    } else {
      animationTimeRef.current += now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;
    }

    const cycle = (animationTimeRef.current % CYCLE_DURATION) / CYCLE_DURATION;

    const baseYaw = THREE.MathUtils.lerp(-0.7, 1.2, smoothStep(0.04, 0.2, cycle));
    const shoulderTilt = THREE.MathUtils.lerp(-1.25, 0.58, smoothStep(0.18, 0.44, cycle));
    const elbowOffset = THREE.MathUtils.lerp(0.7, -1.1, smoothStep(0.36, 0.7, cycle));
    const wristPitch = THREE.MathUtils.lerp(0.3, -0.45, smoothStep(0.48, 0.82, cycle));

    let gripperGap = 0.7;
    if (cycle >= 0.34 && cycle < 0.46) {
      gripperGap = THREE.MathUtils.lerp(0.7, 0.18, smoothStep(0.34, 0.46, cycle));
    } else if (cycle >= 0.46 && cycle < 0.8) {
      gripperGap = 0.18;
    } else if (cycle >= 0.8) {
      gripperGap = THREE.MathUtils.lerp(0.18, 0.7, smoothStep(0.8, 0.96, cycle));
    }

    if (baseRef.current) {
      baseRef.current.rotation.y = baseYaw;
    }
    if (shoulderRef.current) {
      shoulderRef.current.rotation.z = shoulderTilt;
    }
    if (elbowRef.current) {
      elbowRef.current.rotation.z = elbowOffset;
    }
    if (wristRef.current) {
      wristRef.current.rotation.z = wristPitch;
    }
    if (leftFingerRef.current && rightFingerRef.current) {
      leftFingerRef.current.position.x = -gripperGap;
      rightFingerRef.current.position.x = gripperGap;
    }

    const objectTarget = new THREE.Vector3();
    if (cycle < 0.3) {
      objectTarget.copy(sourcePosition);
    } else if (cycle < 0.5) {
      objectTarget.set(2.45, 1.7, 0.2);
    } else if (cycle < 0.8) {
      objectTarget.set(-2.1, 1.85, 1.2);
    } else {
      objectTarget.copy(destinationPosition);
    }

    if (objectRef.current) {
      objectRef.current.position.lerp(objectTarget, 0.08);
      objectRef.current.rotation.x += 0.04;
      objectRef.current.rotation.y += 0.06;
    }
  });

  return (
    <group position={[0, -0.8, 0]} scale={1.45}>
      <mesh position={[0, -0.28, 0]} receiveShadow rotation-x={-Math.PI / 2}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#0b0d11" metalness={0.92} roughness={0.4} />
      </mesh>

      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[5.2, 0.14, 5.2]} />
        <meshStandardMaterial color="#13181d" metalness={0.8} roughness={0.32} />
      </mesh>

      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1.1, 0.7, 32]} />
        <meshStandardMaterial color="#edf4f9" metalness={0.97} roughness={0.18} />
      </mesh>

      <group ref={baseRef} position={[0, 0.65, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.48, 0.62, 0.78, 28]} />
          <meshStandardMaterial color="#12171c" metalness={0.95} roughness={0.24} />
        </mesh>
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.12, 16]} />
          <meshStandardMaterial color="#d4d9df" metalness={1} roughness={0.18} />
        </mesh>

        <group ref={shoulderRef} position={[0, 0.5, 0]}>
          <mesh position={[1.55, 0, 0]} castShadow>
            <boxGeometry args={[3.1, 0.6, 0.74]} />
            <meshStandardMaterial color="#eef3f8" metalness={0.98} roughness={0.16} />
          </mesh>

          <mesh position={[0.56, 0.28, 0]} castShadow>
            <boxGeometry args={[1.08, 0.42, 0.82]} />
            <meshStandardMaterial color="#11161b" metalness={0.84} roughness={0.28} />
          </mesh>

          <mesh position={[0.56, 0.1, 0.38]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.22, 12]} />
            <meshStandardMaterial color="#c5ccd5" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[0.56, 0.1, -0.38]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.22, 12]} />
            <meshStandardMaterial color="#c5ccd5" metalness={1} roughness={0.2} />
          </mesh>

          <group ref={elbowRef} position={[3.1, 0, 0]}>
            <mesh position={[1.25, 0, 0]} castShadow>
              <boxGeometry args={[2.8, 0.52, 0.66]} />
              <meshStandardMaterial color="#f2f6fa" metalness={0.99} roughness={0.15} />
            </mesh>

            <mesh position={[0.18, 0.3, 0]} castShadow>
              <boxGeometry args={[0.72, 0.76, 0.82]} />
              <meshStandardMaterial color="#11161b" metalness={0.9} roughness={0.24} />
            </mesh>

            <mesh position={[0.18, -0.08, 0.4]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 12]} />
              <meshStandardMaterial color="#c5ccd5" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[0.18, -0.08, -0.4]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 12]} />
              <meshStandardMaterial color="#c5ccd5" metalness={1} roughness={0.2} />
            </mesh>

            <group ref={wristRef} position={[2.6, 0, 0]}>
              <mesh position={[0.7, 0, 0]} castShadow>
                <boxGeometry args={[1.24, 0.38, 0.44]} />
                <meshStandardMaterial color="#f0f5fb" metalness={0.98} roughness={0.15} />
              </mesh>

              <group position={[1.12, 0, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.56, 0.56, 0.56]} />
                  <meshStandardMaterial color="#181d24" metalness={0.88} roughness={0.22} />
                </mesh>

                <mesh position={[0.28, 0.14, 0.22]} castShadow>
                  <cylinderGeometry args={[0.07, 0.07, 0.18, 12]} />
                  <meshStandardMaterial color="#d1d8df" metalness={1} roughness={0.16} />
                </mesh>
                <mesh position={[0.28, 0.14, -0.22]} castShadow>
                  <cylinderGeometry args={[0.07, 0.07, 0.18, 12]} />
                  <meshStandardMaterial color="#d1d8df" metalness={1} roughness={0.16} />
                </mesh>

                <group position={[0.4, 0, 0]}>
                  <group ref={leftFingerRef} position={[-0.18, 0, 0]}>
                    <mesh castShadow position={[0, 0.12, 0]}>
                      <boxGeometry args={[0.52, 0.16, 0.12]} />
                      <meshStandardMaterial color="#f6f9fd" metalness={0.96} roughness={0.2} />
                    </mesh>
                  </group>

                  <group ref={rightFingerRef} position={[0.18, 0, 0]}>
                    <mesh castShadow position={[0, 0.12, 0]}>
                      <boxGeometry args={[0.52, 0.16, 0.12]} />
                      <meshStandardMaterial color="#f6f9fd" metalness={0.96} roughness={0.2} />
                    </mesh>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      <group ref={objectRef} position={sourcePosition.toArray() as [number, number, number]}>
        <mesh castShadow>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshStandardMaterial color="#e8edf3" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      <mesh position={sourcePosition.clone().setY(0.28).toArray() as [number, number, number]} receiveShadow>
        <boxGeometry args={[1.05, 0.16, 1.05]} />
        <meshStandardMaterial color="#171c22" metalness={0.7} roughness={0.4} />
      </mesh>

      <mesh position={destinationPosition.clone().setY(0.28).toArray() as [number, number, number]} receiveShadow>
        <boxGeometry args={[1.05, 0.16, 1.05]} />
        <meshStandardMaterial color="#181d23" metalness={0.72} roughness={0.38} />
      </mesh>
    </group>
  );
}

function RobotArmCanvas({ controlsRef, paused }: { controlsRef: MutableRefObject<any>; paused: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
      className="h-full w-full"
    >
      <PerspectiveCamera makeDefault position={[6.8, 4.7, 9.2]} fov={31} />
      <color attach="background" args={['#070b10']} />
      <fog attach="fog" args={['#070b10', 9, 20]} />

      <ambientLight intensity={0.58} color="#edf4ff" />
      <directionalLight
        castShadow
        position={[6.5, 9, 8.5]}
        intensity={2.7}
        color="#ffffff"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight position={[2, 7.5, 9]} angle={0.42} penumbra={1} intensity={46} color="#ffffff" />
      <spotLight position={[-5, 5, -6]} angle={0.52} penumbra={1} intensity={28} color="#a8d7ff" />
      <spotLight position={[-4, 3.5, 5]} angle={0.5} penumbra={1} intensity={16} color="#ff4d5c" />

      <RobotArm paused={paused} />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        target={[0.6, 1.7, 0]}
        minDistance={4.2}
        maxDistance={14}
        minPolarAngle={0.8}
        maxPolarAngle={1.5}
      />

      <ContactShadows position={[0, -0.57, 0]} opacity={0.7} scale={14} blur={2.4} far={4.5} />
    </Canvas>
  );
}

export default function RobotArmPanel() {
  const controlsRef = useRef<any>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebglAvailable(Boolean(context));
  }, []);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  if (!webglAvailable) {
    return (
      <div className="technical-panel relative flex min-h-[490px] flex-col justify-between overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-chakra-silver/70">
          <span>CH / IPD</span>
          <span className="h-px w-12 bg-chakra-electric/60" />
        </div>
        <div className="relative z-10 mt-8 flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-chakra-electric/40 bg-white/[0.02] text-chakra-electric">
            <span className="font-display text-2xl font-bold">3D</span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-chakra-silver">WebGL unavailable</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-chakra-white">Interactive robotic system offline</h3>
          <p className="mt-3 max-w-sm text-sm text-chakra-silver-2">This browser does not support WebGL, so the live robotics demo is unavailable. Try a modern browser with hardware acceleration enabled.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="technical-panel relative flex min-h-[490px] flex-col overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-chakra-silver">Interactive robotic system</p>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-chakra-silver/70">CH / IPD</div>
      </div>

      <div className="relative z-10 flex-1">
        <div className="pointer-events-none absolute left-5 top-14 z-20 rounded border border-white/10 bg-[#070b10]/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-chakra-silver-2 backdrop-blur-sm">
          Drag to rotate | Scroll to zoom
        </div>
        <RobotArmCanvas controlsRef={controlsRef} paused={isPaused} />
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={() => setIsPaused((current) => !current)}
          className="inline-flex items-center justify-center border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-chakra-white transition hover:border-chakra-electric/50 hover:text-chakra-electric"
          aria-pressed={isPaused}
        >
          {isPaused ? 'Resume animation' : 'Pause animation'}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center border border-chakra-electric/40 bg-chakra-electric/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-chakra-electric transition hover:bg-chakra-electric/15"
        >
          Reset view
        </button>
      </div>
    </div>
  );
}
