import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Palette, Eye, Maximize2, Zap } from 'lucide-react';

export type MaterialPreset = 'chrome' | 'orchid' | 'obsidian' | 'champagne';

interface MaterialConfig {
  name: string;
  color: number;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  emissive?: number;
  emissiveIntensity?: number;
  rimColor: number;
  lightColor: number;
}

const MATERIAL_PRESETS: Record<MaterialPreset, MaterialConfig> = {
  chrome: {
    name: 'Liquid Chrome',
    color: 0xedf2f7,
    metalness: 0.98,
    roughness: 0.12,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    rimColor: 0x93c5fd,
    lightColor: 0xffffff,
  },
  orchid: {
    name: 'Orchid Prism',
    color: 0xf472b6,
    metalness: 0.92,
    roughness: 0.18,
    clearcoat: 0.95,
    clearcoatRoughness: 0.15,
    emissive: 0x7c3aed,
    emissiveIntensity: 0.18,
    rimColor: 0xc084fc,
    lightColor: 0xfbcfe8,
  },
  obsidian: {
    name: 'Deep Obsidian',
    color: 0x18181b,
    metalness: 0.96,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    emissive: 0x0284c7,
    emissiveIntensity: 0.1,
    rimColor: 0x38bdf8,
    lightColor: 0x60a5fa,
  },
  champagne: {
    name: 'Gold Aurora',
    color: 0xfde047,
    metalness: 0.95,
    roughness: 0.14,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12,
    emissive: 0xd97706,
    emissiveIntensity: 0.12,
    rimColor: 0xfef08a,
    lightColor: 0xffedd5,
  },
};

export const KineticSculpture = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [preset, setPreset] = useState<MaterialPreset>('chrome');
  const [isRotating, setIsRotating] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [interactionActive, setInteractionActive] = useState(false);
  const [fps, setFps] = useState(60);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const mouseLightRef = useRef<THREE.PointLight | null>(null);

  // Interaction tracking
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const previousPointerPos = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0.35, y: -0.3 });
  const velocity = useRef({ x: 0, y: 0 });
  const pulseIntensity = useRef(0);

  // Trigger pulse wave on click
  const triggerPulse = useCallback(() => {
    pulseIntensity.current = 2.4;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // LIGHTING SETUP FOR METALLIC SHINE
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const rimLight = new THREE.DirectionalLight(MATERIAL_PRESETS[preset].rimColor, 3.6);
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const topLight = new THREE.DirectionalLight(0xffffff, 1.8);
    topLight.position.set(0, 8, -2);
    scene.add(topLight);

    const mouseLight = new THREE.PointLight(0xa5f3fc, 2.8, 12);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);
    mouseLightRef.current = mouseLight;

    // MASTER SCULPTURE GROUP
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    // MATERIAL: Physical Brushed Metallic with anisotropic reflections
    const curPreset = MATERIAL_PRESETS[preset];
    const material = new THREE.MeshPhysicalMaterial({
      color: curPreset.color,
      metalness: curPreset.metalness,
      roughness: curPreset.roughness,
      clearcoat: curPreset.clearcoat,
      clearcoatRoughness: curPreset.clearcoatRoughness,
      emissive: curPreset.emissive || 0x000000,
      emissiveIntensity: curPreset.emissiveIntensity || 0,
      wireframe: wireframe,
      side: THREE.DoubleSide,
      flatShading: false,
    });
    materialRef.current = material;

    // PARAMETRIC TURBINE DISC BLADES
    // In Spree Commerce reference, it's ~58 circular blades overlapping along an inclined torus ring
    const DISC_COUNT = 64;
    const MAJOR_RADIUS = 2.4;
    const MINOR_RADIUS = 0.55;
    const DISC_RADIUS = 0.72;
    const DISC_THICKNESS = 0.024;

    // Base geometry for each blade
    const discGeometry = new THREE.CylinderGeometry(
      DISC_RADIUS,
      DISC_RADIUS,
      DISC_THICKNESS,
      36,
      1,
      false
    );

    // Array to hold individual disc objects for wave animation
    const discs: THREE.Mesh[] = [];

    for (let i = 0; i < DISC_COUNT; i++) {
      const u = (i / DISC_COUNT) * Math.PI * 2;

      // 3D toroidal curve position
      const px = Math.cos(u) * MAJOR_RADIUS;
      const py = Math.sin(u) * (MAJOR_RADIUS * 0.88);
      const pz = Math.sin(u * 2) * MINOR_RADIUS;

      const mesh = new THREE.Mesh(discGeometry, material);
      mesh.position.set(px, py, pz);

      // Compute orientation along the ring tangent
      const nextU = ((i + 1) / DISC_COUNT) * Math.PI * 2;
      const nx = Math.cos(nextU) * MAJOR_RADIUS;
      const ny = Math.sin(nextU) * (MAJOR_RADIUS * 0.88);
      const nz = Math.sin(nextU * 2) * MINOR_RADIUS;

      const tangent = new THREE.Vector3(nx - px, ny - py, nz - pz).normalize();
      const normal = new THREE.Vector3(px, py, pz).normalize();
      const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

      // Matrix to orient the disc along the tangent with fan blade tilt
      const rotMatrix = new THREE.Matrix4().makeBasis(normal, binormal, tangent);
      mesh.quaternion.setFromRotationMatrix(rotMatrix);

      // Fanned blade pitch angle (~55 degrees offset)
      mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), u * 1.5 + 0.95);
      mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.72);

      // Store initial transformation data for pulse / ripple
      mesh.userData = {
        baseX: px,
        baseY: py,
        baseZ: pz,
        baseScale: 1.0,
        index: i,
        angle: u,
      };

      mainGroup.add(mesh);
      discs.push(mesh);
    }

    // FLOATING ORBITAL ACCENT RING (delicate tech aura)
    const ringGeo = new THREE.TorusGeometry(MAJOR_RADIUS * 1.28, 0.008, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.28,
    });
    const accentRing = new THREE.Mesh(ringGeo, ringMat);
    accentRing.rotation.x = Math.PI / 3.2;
    mainGroup.add(accentRing);

    // Initial group tilt to match Spree's angled presentation
    mainGroup.rotation.x = dragRotation.current.x;
    mainGroup.rotation.y = dragRotation.current.y;
    mainGroup.rotation.z = -0.15;

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = now;
      }

      // Smooth mouse parallax lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      // Update point light following mouse
      if (mouseLightRef.current) {
        mouseLightRef.current.position.x = mousePos.current.x * 5;
        mouseLightRef.current.position.y = mousePos.current.y * 5;
      }

      // Pulse damping
      if (pulseIntensity.current > 0.01) {
        pulseIntensity.current *= 0.94;
      } else {
        pulseIntensity.current = 0;
      }

      // Dynamic disc ripples along the loop
      const rippleTime = elapsedTime * 2.8;
      for (let i = 0; i < discs.length; i++) {
        const disc = discs[i];
        const u = disc.userData.angle;

        // Wave propagation through the discs
        const wave = Math.sin(u * 3 - rippleTime) * 0.08;
        const pulse = Math.sin(u * 6 - elapsedTime * 8) * (pulseIntensity.current * 0.22);
        const scaleEffect = 1 + wave * 0.8 + pulse;

        disc.scale.set(scaleEffect, scaleEffect, 1 + pulse * 1.5);
      }

      // Inertia and rotation handling
      if (isDragging.current) {
        // Dragging overrides auto-rotation
        mainGroup.rotation.x = dragRotation.current.x;
        mainGroup.rotation.y = dragRotation.current.y;
      } else {
        // Apply inertia velocity
        dragRotation.current.x += velocity.current.x;
        dragRotation.current.y += velocity.current.y;
        velocity.current.x *= 0.94;
        velocity.current.y *= 0.94;

        // Auto-rotation when active
        if (isRotating) {
          dragRotation.current.y += 0.0065;
          dragRotation.current.x = 0.32 + Math.sin(elapsedTime * 0.6) * 0.08;
        }

        // Apply mouse tilt parallax
        mainGroup.rotation.x = dragRotation.current.x + mousePos.current.y * 0.25;
        mainGroup.rotation.y = dragRotation.current.y + mousePos.current.x * 0.35;
      }

      // Orbit the accent ring
      accentRing.rotation.z += 0.003;

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // MOUSE & TOUCH EVENT LISTENERS
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = x;
      mousePos.current.targetY = y;

      if (isDragging.current) {
        const deltaX = e.clientX - previousPointerPos.current.x;
        const deltaY = e.clientY - previousPointerPos.current.y;

        velocity.current.y = deltaX * 0.006;
        velocity.current.x = deltaY * 0.006;

        dragRotation.current.y += velocity.current.y;
        dragRotation.current.x += velocity.current.x;

        previousPointerPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging.current = true;
      setInteractionActive(true);
      previousPointerPos.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      setTimeout(() => setInteractionActive(false), 800);
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);

      renderer.dispose();
      discGeometry.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      material.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // UPDATE MATERIAL WHEN PRESET OR WIREFRAME CHANGES
  useEffect(() => {
    if (!materialRef.current || !rimLightRef.current || !keyLightRef.current) return;
    const conf = MATERIAL_PRESETS[preset];

    materialRef.current.color.setHex(conf.color);
    materialRef.current.metalness = conf.metalness;
    materialRef.current.roughness = conf.roughness;
    materialRef.current.clearcoat = conf.clearcoat;
    materialRef.current.clearcoatRoughness = conf.clearcoatRoughness;
    materialRef.current.emissive.setHex(conf.emissive || 0x000000);
    materialRef.current.emissiveIntensity = conf.emissiveIntensity || 0;
    materialRef.current.wireframe = wireframe;
    materialRef.current.needsUpdate = true;

    rimLightRef.current.color.setHex(conf.rimColor);
    keyLightRef.current.color.setHex(conf.lightColor);
  }, [preset, wireframe]);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[620px] select-none flex items-center justify-center">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        onClick={triggerPulse}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Click to pulse ripple • Drag to rotate in 3D"
      />

      {/* Subtle Ambient Radial Lighting Behind 3D Object */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700 -z-0 opacity-60 dark:opacity-40"
        style={{
          background:
            preset === 'orchid'
              ? 'radial-gradient(circle at 55% 45%, rgba(192, 132, 252, 0.22) 0%, transparent 65%)'
              : preset === 'obsidian'
              ? 'radial-gradient(circle at 55% 45%, rgba(56, 189, 248, 0.20) 0%, transparent 65%)'
              : preset === 'champagne'
              ? 'radial-gradient(circle at 55% 45%, rgba(251, 191, 36, 0.22) 0%, transparent 65%)'
              : 'radial-gradient(circle at 55% 45%, rgba(147, 197, 253, 0.22) 0%, transparent 65%)',
        }}
      />

      {/* Floating 3D Control Pill Bar (Floating on top or bottom-left) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/60 shadow-lg text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 text-muted-foreground font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>WEBGL 3D</span>
          <span className="text-[10px] opacity-60">({fps} FPS)</span>
        </div>

        <div className="h-4 w-px bg-border/60" />

        {/* Pulse Interactive Button */}
        <button
          onClick={triggerPulse}
          className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
          title="Trigger kinetic pulse ripple"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
        </button>

        {/* Rotate Toggle Button */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isRotating
              ? 'text-primary bg-primary/10'
              : 'text-muted-foreground hover:bg-muted'
          }`}
          title={isRotating ? 'Pause rotation' : 'Resume auto-rotation'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>

        {/* Wireframe Toggle */}
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            wireframe
              ? 'text-orchid-primary bg-orchid-primary/10'
              : 'text-muted-foreground hover:bg-muted'
          }`}
          title="Toggle wireframe topology"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Material Palette Switcher (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 p-1 rounded-full bg-background/80 backdrop-blur-md border border-border/60 shadow-lg">
        {(Object.keys(MATERIAL_PRESETS) as MaterialPreset[]).map((key) => {
          const m = MATERIAL_PRESETS[key];
          const isActive = preset === key;
          return (
            <button
              key={key}
              onClick={() => setPreset(key)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-foreground text-background shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full border border-black/20"
                style={{ backgroundColor: `#${m.color.toString(16).padStart(6, '0')}` }}
              />
              <span className="hidden sm:inline">{m.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Drag Indicator hint */}
      {interactionActive && (
        <div className="absolute inset-x-0 bottom-16 flex justify-center pointer-events-none z-20">
          <span className="px-3 py-1 rounded-full bg-foreground/90 text-background text-xs font-medium shadow-md backdrop-blur-sm animate-fade-in">
            Interacting in 3D Space
          </span>
        </div>
      )}
    </div>
  );
};
