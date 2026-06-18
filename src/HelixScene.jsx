import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeHelixCurve(offset) {
  const points = [];
  const turns = Math.PI * 5.5;
  const count = 180;

  for (let index = 0; index < count; index += 1) {
    const t = index / (count - 1);
    const angle = t * turns + offset;
    const radius = 1.45 + Math.sin(t * Math.PI * 4) * 0.05;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * 6.2,
        Math.sin(angle) * radius,
      ),
    );
  }

  return new THREE.CatmullRomCurve3(points);
}

function setLinePositions(geometry, offsetA, offsetB) {
  const positions = [];
  const turns = Math.PI * 5.5;

  for (let index = 0; index < 34; index += 1) {
    const t = index / 33;
    const angleA = t * turns + offsetA;
    const angleB = t * turns + offsetB;
    const y = (t - 0.5) * 6.2;
    positions.push(Math.cos(angleA) * 1.45, y, Math.sin(angleA) * 1.45);
    positions.push(Math.cos(angleB) * 1.45, y, Math.sin(angleB) * 1.45);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
}

export default function HelixScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061113, 0.08);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.25, 10);

    const root = new THREE.Group();
    root.rotation.set(-0.08, -0.28, 0.06);
    scene.add(root);

    const cyan = new THREE.Color("#34dce6");
    const jade = new THREE.Color("#4fe0a7");
    const coral = new THREE.Color("#ff8d72");

    const strandA = new THREE.Mesh(
      new THREE.TubeGeometry(makeHelixCurve(0), 220, 0.036, 14, false),
      new THREE.MeshStandardMaterial({
        color: cyan,
        emissive: cyan,
        emissiveIntensity: 1.25,
        roughness: 0.28,
        metalness: 0.14,
      }),
    );
    const strandB = new THREE.Mesh(
      new THREE.TubeGeometry(makeHelixCurve(Math.PI), 220, 0.036, 14, false),
      new THREE.MeshStandardMaterial({
        color: jade,
        emissive: jade,
        emissiveIntensity: 1.05,
        roughness: 0.32,
        metalness: 0.12,
      }),
    );
    root.add(strandA, strandB);

    const rungGeometry = new THREE.BufferGeometry();
    setLinePositions(rungGeometry, 0, Math.PI);
    const rungs = new THREE.LineSegments(
      rungGeometry,
      new THREE.LineBasicMaterial({
        color: 0xd8fffa,
        transparent: true,
        opacity: 0.34,
      }),
    );
    root.add(rungs);

    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: coral,
      emissiveIntensity: 0.85,
      roughness: 0.22,
    });
    const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, 68);
    const matrix = new THREE.Matrix4();
    const turns = Math.PI * 5.5;
    for (let index = 0; index < 34; index += 1) {
      const t = index / 33;
      const y = (t - 0.5) * 6.2;
      const angle = t * turns;
      matrix.setPosition(Math.cos(angle) * 1.45, y, Math.sin(angle) * 1.45);
      nodes.setMatrixAt(index * 2, matrix);
      matrix.setPosition(
        Math.cos(angle + Math.PI) * 1.45,
        y,
        Math.sin(angle + Math.PI) * 1.45,
      );
      nodes.setMatrixAt(index * 2 + 1, matrix);
    }
    root.add(nodes);

    const rings = new THREE.Group();
    [2.2, 2.9, 3.55].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.01, 8, 160),
        new THREE.MeshBasicMaterial({
          color: index === 1 ? 0x4fe0a7 : 0x34dce6,
          transparent: true,
          opacity: 0.26,
        }),
      );
      ring.rotation.x = Math.PI / 2 + index * 0.18;
      ring.rotation.y = index * 0.38;
      rings.add(ring);
    });
    root.add(rings);

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = [];
    for (let index = 0; index < 280; index += 1) {
      const radius = 2.2 + Math.random() * 3.2;
      const angle = Math.random() * Math.PI * 2;
      particlePositions.push(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 7.6,
        Math.sin(angle) * radius,
      );
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particlePositions, 3),
    );
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xcffffb,
        size: 0.026,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      }),
    );
    root.add(particles);

    const ambient = new THREE.AmbientLight(0x94ffef, 1.2);
    const key = new THREE.PointLight(0x34dce6, 18, 24);
    key.position.set(3.6, 3.4, 5);
    const fill = new THREE.PointLight(0xff8d72, 8, 18);
    fill.position.set(-3.8, -2.8, 4);
    scene.add(ambient, key, fill);

    const target = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();

    function resize() {
      const width = mount.clientWidth || 640;
      const height = mount.clientHeight || 560;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function onPointerMove(event) {
      const rect = mount.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.5;
    }

    let animationId = 0;
    function animate() {
      const elapsed = clock.getElapsedTime();
      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;

      root.rotation.y = elapsed * 0.24 - 0.28 + pointer.x;
      root.rotation.x = -0.12 + Math.sin(elapsed * 0.7) * 0.045 - pointer.y;
      rings.rotation.z = elapsed * 0.18;
      rings.rotation.y = elapsed * 0.1;
      particles.rotation.y = -elapsed * 0.055;
      particles.rotation.x = Math.sin(elapsed * 0.2) * 0.08;

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    }

    resize();
    animate();
    mount.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      mount.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      strandA.geometry.dispose();
      strandB.geometry.dispose();
      strandA.material.dispose();
      strandB.material.dispose();
      rungGeometry.dispose();
      rungs.material.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      rings.children.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      particleGeometry.dispose();
      particles.material.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="helix-canvas" ref={mountRef} aria-hidden="true" />;
}
