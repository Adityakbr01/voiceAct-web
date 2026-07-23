"use client";

import { useEffect, useRef } from "react";
import {
  Vector3,
  MeshPhysicalMaterial,
  InstancedMesh,
  AmbientLight,
  SphereGeometry,
  ShaderChunk,
  Scene,
  Color,
  Object3D,
  SRGBColorSpace,
  MathUtils,
  PMREMGenerator,
  Vector2,
  WebGLRenderer,
  PerspectiveCamera,
  PointLight,
  ACESFilmicToneMapping,
  Plane,
  Raycaster,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Custom delta timer class to avoid three.js Timer class packaging changes
class Timer {
  private lastTime = 0;
  constructor() {
    this.lastTime = performance.now();
  }
  update() {}
  getDelta() {
    const now = performance.now();
    const delta = (now - this.lastTime) / 1000;
    this.lastTime = now;
    return delta;
  }
  reset() {
    this.lastTime = performance.now();
  }
  dispose() {}
}

class ThreeApp {
  options: any;
  canvas!: HTMLCanvasElement;
  camera!: PerspectiveCamera;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov!: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene!: Scene;
  renderer!: WebGLRenderer;
  postprocessingInstance: any;
  size: { width: number; height: number; wWidth: number; wHeight: number; ratio: number; pixelRatio: number } = {
    width: 0,
    height: 0,
    wWidth: 0,
    wHeight: 0,
    ratio: 0,
    pixelRatio: 0,
  };
  onBeforeRender: (time: { elapsed: number; delta: number }) => void = () => {};
  onAfterRender: (time: { elapsed: number; delta: number }) => void = () => {};
  onAfterResize: (size: any) => void = () => {};
  isIntersecting = false;
  isRunning = false;
  isDisposed = false;
  intersectionObserver?: IntersectionObserver;
  resizeObserver?: ResizeObserver;
  resizeTimeout?: any;
  timer = new Timer();
  timeState = { elapsed: 0, delta: 0 };
  rafId?: number;

  constructor(options: any) {
    this.options = { ...options };
    this.initCamera();
    this.initScene();
    this.initRenderer();
    this.resize();
    this.initObservers();
  }

  initCamera() {
    this.camera = new PerspectiveCamera();
    this.cameraFov = this.camera.fov;
  }

  initScene() {
    this.scene = new Scene();
  }

  initRenderer() {
    if (this.options.canvas) {
      this.canvas = this.options.canvas;
    } else if (this.options.id) {
      this.canvas = document.getElementById(this.options.id) as HTMLCanvasElement;
    } else {
      console.error("Three: Missing canvas or id parameter");
    }
    this.canvas.style.display = "block";
    const rendererOptions = {
      canvas: this.canvas,
      powerPreference: "high-performance",
      ...(this.options.rendererOptions ?? {}),
    };
    this.renderer = new WebGLRenderer(rendererOptions);
    this.renderer.outputColorSpace = SRGBColorSpace;
  }

  initObservers() {
    if (!(this.options.size instanceof Object)) {
      window.addEventListener("resize", this.onWindowResize.bind(this));
      if (this.options.size === "parent" && this.canvas.parentNode) {
        this.resizeObserver = new ResizeObserver(this.onWindowResize.bind(this));
        this.resizeObserver.observe(this.canvas.parentNode as Element);
      }
    }
    this.intersectionObserver = new IntersectionObserver(this.onIntersection.bind(this), {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });
    this.intersectionObserver.observe(this.canvas);
    document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this));
  }

  removeObservers() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibilityChange.bind(this));
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    this.isIntersecting = entries[0].isIntersecting;
    this.isIntersecting ? this.startLoop() : this.stopLoop();
  }

  onVisibilityChange() {
    if (this.isIntersecting) {
      document.hidden ? this.stopLoop() : this.startLoop();
    }
  }

  onWindowResize() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.resize.bind(this), 100);
  }

  resize() {
    let width = 0, height = 0;
    if (this.options.size instanceof Object) {
      width = this.options.size.width;
      height = this.options.size.height;
    } else if (this.options.size === "parent" && this.canvas.parentNode) {
      width = (this.canvas.parentNode as HTMLElement).offsetWidth;
      height = (this.canvas.parentNode as HTMLElement).offsetHeight;
      if (width === 0 || height === 0) {
        width = window.innerWidth;
        height = window.innerHeight;
      }
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }
    width = Math.max(1, width);
    height = Math.max(1, height);
    this.size.width = width;
    this.size.height = height;
    this.size.ratio = width / height;
    this.updateCameraProjection();
    this.updateRendererSize();
    this.onAfterResize(this.size);
  }

  updateCameraProjection() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.adjustFov(this.cameraMinAspect);
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        this.adjustFov(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }

  adjustFov(aspect: number) {
    const v = Math.tan(MathUtils.degToRad(this.cameraFov / 2)) / (this.camera.aspect / aspect);
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(v));
  }

  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const fov = (this.camera.fov * Math.PI) / 180;
      this.size.wHeight = 2 * Math.tan(fov / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    }
  }

  updateRendererSize() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.postprocessingInstance?.setSize(this.size.width, this.size.height);
    let dpr = window.devicePixelRatio;
    if (this.maxPixelRatio && dpr > this.maxPixelRatio) {
      dpr = this.maxPixelRatio;
    } else if (this.minPixelRatio && dpr < this.minPixelRatio) {
      dpr = this.minPixelRatio;
    }
    this.renderer.setPixelRatio(dpr);
    this.size.pixelRatio = dpr;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  startLoop() {
    if (this.isRunning) return;
    const animate = () => {
      this.rafId = requestAnimationFrame(animate);
      this.timer.update();
      this.timeState.delta = this.timer.getDelta();
      this.timeState.elapsed += this.timeState.delta;
      this.onBeforeRender(this.timeState);
      this.render();
      this.onAfterRender(this.timeState);
    };
    this.isRunning = true;
    this.timer.reset();
    animate();
  }

  stopLoop() {
    if (this.isRunning) {
      cancelAnimationFrame(this.rafId!);
      this.isRunning = false;
    }
  }

  clear() {
    this.scene.traverse((obj: any) => {
      if (obj.isMesh && typeof obj.material === "object" && obj.material !== null) {
        Object.keys(obj.material).forEach((key) => {
          const val = obj.material[key];
          if (val !== null && typeof val === "object" && typeof val.dispose === "function") {
            val.dispose();
          }
        });
        obj.material.dispose();
        obj.geometry.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    this.removeObservers();
    this.stopLoop();
    this.timer.dispose();
    this.clear();
    this.postprocessingInstance?.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.isDisposed = true;
  }
}

const interactionTargets = new Map<HTMLCanvasElement, any>();
const globalPointer = new Vector2();
let eventsRegistered = false;

function registerInteraction(canvas: HTMLCanvasElement, target: any) {
  if (!interactionTargets.has(canvas)) {
    interactionTargets.set(canvas, target);
    if (!eventsRegistered) {
      document.body.addEventListener("pointermove", onPointerMove);
      document.body.addEventListener("pointerleave", onPointerLeave);
      document.body.addEventListener("click", onGlobalClick);

      // Passive listeners so we DO NOT block page scrolling on mobile!
      document.body.addEventListener("touchstart", onTouchStart, { passive: true });
      document.body.addEventListener("touchmove", onTouchMove, { passive: true });
      document.body.addEventListener("touchend", onTouchEnd, { passive: true });
      document.body.addEventListener("touchcancel", onTouchEnd, { passive: true });

      eventsRegistered = true;
    }
  }

  return {
    dispose() {
      interactionTargets.delete(canvas);
      if (interactionTargets.size === 0 && eventsRegistered) {
        document.body.removeEventListener("pointermove", onPointerMove);
        document.body.removeEventListener("pointerleave", onPointerLeave);
        document.body.removeEventListener("click", onGlobalClick);

        document.body.removeEventListener("touchstart", onTouchStart);
        document.body.removeEventListener("touchmove", onTouchMove);
        document.body.removeEventListener("touchend", onTouchEnd);
        document.body.removeEventListener("touchcancel", onTouchEnd);

        eventsRegistered = false;
      }
    },
  };
}

function onPointerMove(e: PointerEvent) {
  globalPointer.x = e.clientX;
  globalPointer.y = e.clientY;
  processInteraction();
}

function processInteraction() {
  for (const [elem, target] of interactionTargets) {
    const rect = elem.getBoundingClientRect();
    if (isInsideRect(rect)) {
      updateCoordinates(target, rect);
      if (!target.hover) {
        target.hover = true;
        target.onEnter(target);
      }
      target.onMove(target);
    } else if (target.hover && !target.touching) {
      target.hover = false;
      target.onLeave(target);
    }
  }
}

function onGlobalClick(e: MouseEvent) {
  globalPointer.x = e.clientX;
  globalPointer.y = e.clientY;
  for (const [elem, target] of interactionTargets) {
    const rect = elem.getBoundingClientRect();
    updateCoordinates(target, rect);
    if (isInsideRect(rect)) target.onClick(target);
  }
}

function onPointerLeave() {
  for (const target of interactionTargets.values()) {
    if (target.hover) {
      target.hover = false;
      target.onLeave(target);
    }
  }
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length > 0) {
    globalPointer.x = e.touches[0].clientX;
    globalPointer.y = e.touches[0].clientY;

    for (const [elem, target] of interactionTargets) {
      const rect = elem.getBoundingClientRect();
      if (isInsideRect(rect)) {
        target.touching = true;
        updateCoordinates(target, rect);
        if (!target.hover) {
          target.hover = true;
          target.onEnter(target);
        }
        target.onMove(target);
      }
    }
  }
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    globalPointer.x = e.touches[0].clientX;
    globalPointer.y = e.touches[0].clientY;

    for (const [elem, target] of interactionTargets) {
      const rect = elem.getBoundingClientRect();
      updateCoordinates(target, rect);

      if (isInsideRect(rect)) {
        if (!target.hover) {
          target.hover = true;
          target.touching = true;
          target.onEnter(target);
        }
        target.onMove(target);
      } else if (target.hover && target.touching) {
        target.onMove(target);
      }
    }
  }
}

function onTouchEnd() {
  for (const target of interactionTargets.values()) {
    if (target.touching) {
      target.touching = false;
      if (target.hover) {
        target.hover = false;
        target.onLeave(target);
      }
    }
  }
}

function updateCoordinates(target: any, rect: DOMRect) {
  const { position, nPosition } = target;
  position.x = globalPointer.x - rect.left;
  position.y = globalPointer.y - rect.top;
  nPosition.x = (position.x / rect.width) * 2 - 1;
  nPosition.y = (-position.y / rect.height) * 2 + 1;
}

function isInsideRect(rect: DOMRect) {
  const { x, y } = globalPointer;
  return x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height;
}

const F = new Vector3();
const I = new Vector3();
const O = new Vector3();
const V = new Vector3();
const B = new Vector3();
const N = new Vector3();
const _ = new Vector3();
const j = new Vector3();
const H = new Vector3();
const T = new Vector3();

class Physics {
  config: any;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center = new Vector3();

  constructor(config: any) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.initParticles();
    this.setSizes();
  }

  initParticles() {
    const { config, positionData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < config.count; i++) {
      const idx = 3 * i;
      positionData[idx] = MathUtils.randFloatSpread(2 * config.maxX);
      positionData[idx + 1] = MathUtils.randFloatSpread(2 * config.maxY);
      positionData[idx + 2] = MathUtils.randFloatSpread(2 * config.maxZ);
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);
    }
  }

  update(time: { delta: number }) {
    const { config, center, positionData, sizeData, velocityData } = this;
    let startIndex = 0;
    if (config.controlSphere0) {
      startIndex = 1;
      F.fromArray(positionData, 0);
      F.lerp(center, 0.1).toArray(positionData, 0);
      V.set(0, 0, 0).toArray(velocityData, 0);
    }
    for (let idx = startIndex; idx < config.count; idx++) {
      const base = 3 * idx;
      I.fromArray(positionData, base);
      B.fromArray(velocityData, base);
      B.y -= time.delta * config.gravity * sizeData[idx];
      B.multiplyScalar(config.friction);
      B.clampLength(0, config.maxVelocity);
      I.add(B);
      I.toArray(positionData, base);
      B.toArray(velocityData, base);
    }

    for (let idx = startIndex; idx < config.count; idx++) {
      const base = 3 * idx;
      I.fromArray(positionData, base);
      B.fromArray(velocityData, base);
      const radius = sizeData[idx];
      for (let jdx = idx + 1; jdx < config.count; jdx++) {
        const otherBase = 3 * jdx;
        O.fromArray(positionData, otherBase);
        N.fromArray(velocityData, otherBase);
        const otherRadius = sizeData[jdx];
        _.copy(O).sub(I);
        const dist = _.length();
        const sumRadius = radius + otherRadius;
        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          j.copy(_)
            .normalize()
            .multiplyScalar(0.5 * overlap);
          H.copy(j).multiplyScalar(Math.max(B.length(), 1));
          T.copy(j).multiplyScalar(Math.max(N.length(), 1));
          I.sub(j);
          B.sub(H);
          I.toArray(positionData, base);
          B.toArray(velocityData, base);
          O.add(j);
          N.add(T);
          O.toArray(positionData, otherBase);
          N.toArray(velocityData, otherBase);
        }
      }
      if (config.controlSphere0) {
        _.copy(F).sub(I);
        const dist = _.length();
        const sumRadius0 = radius + sizeData[0];
        if (dist < sumRadius0) {
          const diff = sumRadius0 - dist;
          j.copy(_.normalize()).multiplyScalar(diff);
          H.copy(j).multiplyScalar(Math.max(B.length(), 2));
          I.sub(j);
          B.sub(H);
        }
      }
      if (Math.abs(I.x) + radius > config.maxX) {
        I.x = Math.sign(I.x) * (config.maxX - radius);
        B.x = -B.x * config.wallBounce;
      }
      if (config.gravity === 0) {
        if (Math.abs(I.y) + radius > config.maxY) {
          I.y = Math.sign(I.y) * (config.maxY - radius);
          B.y = -B.y * config.wallBounce;
        }
      } else if (I.y - radius < -config.maxY) {
        I.y = -config.maxY + radius;
        B.y = -B.y * config.wallBounce;
      }
      const maxBoundary = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(I.z) + radius > maxBoundary) {
        I.z = Math.sign(I.z) * (config.maxZ - radius);
        B.z = -B.z * config.wallBounce;
      }
      I.toArray(positionData, base);
      B.toArray(velocityData, base);
    }
  }
}

class CustomPhysicalMaterial extends MeshPhysicalMaterial {
  uniforms: any;
  onBeforeCompile2: any;

  constructor(params: any) {
    super(params);
    this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 },
    };
    (this.defines as any).USE_UV = "";
    this.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.uniforms);
      shader.fragmentShader =
        "\n        uniform float thicknessPower;\n        uniform float thicknessScale;\n        uniform float thicknessDistortion;\n        uniform float thicknessAmbient;\n        uniform float thicknessAttenuation;\n      " +
        shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        "\n        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\n          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\n          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\n          #ifdef USE_COLOR\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\n          #else\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;\n          #endif\n          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\n        }\n\n        void main() {\n      "
      );
      const t = ShaderChunk.lights_fragment_begin.replaceAll(
        "RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",
        "\n          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\n        "
      );
      shader.fragmentShader = shader.fragmentShader.replace("#include <lights_fragment_begin>", t);
      if (this.onBeforeCompile2) this.onBeforeCompile2(shader);
    };
  }
}

const DEFAULT_BALLPIT_CONFIG = {
  count: 200,
  colors: [0, 0, 0],
  ambientColor: 16777215,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true,
};

const dummyObject = new Object3D();

class InstancedSpheres extends InstancedMesh {
  config: any;
  physics: Physics;
  ambientLight!: AmbientLight;
  light!: PointLight;

  constructor(renderer: WebGLRenderer, params: any = {}) {
    const config = { ...DEFAULT_BALLPIT_CONFIG, ...params };
    const roomEnv = new RoomEnvironment();
    const envMap = new PMREMGenerator(renderer).fromScene(roomEnv).texture;
    const geometry = new SphereGeometry();
    const material = new MeshPhysicalMaterial({ envMap, ...config.materialParams });
    material.envMapRotation.x = -Math.PI / 2;
    super(geometry, material, config.count);
    this.config = config;
    this.physics = new Physics(config);
    this.initLights();
    this.setColors(config.colors);
  }

  initLights() {
    this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity);
    this.add(this.ambientLight);
    this.light = new PointLight(this.config.colors[0], this.config.lightIntensity);
    this.add(this.light);
  }

  setColors(colors: any[]) {
    if (Array.isArray(colors) && colors.length > 1) {
      const gradient = (() => {
        let cols: Color[] = [];
        colors.forEach((col) => {
          cols.push(new Color(col));
        });
        return {
          getColorAt: function (ratio: number, out = new Color()) {
            const scaled = Math.max(0, Math.min(1, ratio)) * (colors.length - 1);
            const idx = Math.floor(scaled);
            const start = cols[idx];
            if (idx >= colors.length - 1) return start.clone();
            const alpha = scaled - idx;
            const end = cols[idx + 1];
            out.r = start.r + alpha * (end.r - start.r);
            out.g = start.g + alpha * (end.g - start.g);
            out.b = start.b + alpha * (end.b - start.b);
            return out;
          },
        };
      })();

      for (let idx = 0; idx < this.count; idx++) {
        this.setColorAt(idx, gradient.getColorAt(idx / this.count));
        if (idx === 0) {
          this.light.color.copy(gradient.getColorAt(idx / this.count));
        }
      }
      if (this.instanceColor) this.instanceColor.needsUpdate = true;
    }
  }

  update(time: { delta: number }) {
    this.physics.update(time);
    for (let idx = 0; idx < this.count; idx++) {
      dummyObject.position.fromArray(this.physics.positionData, 3 * idx);
      if (idx === 0 && this.config.followCursor === false) {
        dummyObject.scale.setScalar(0);
      } else {
        dummyObject.scale.setScalar(this.physics.sizeData[idx]);
      }
      dummyObject.updateMatrix();
      this.setMatrixAt(idx, dummyObject.matrix);
      if (idx === 0) this.light.position.copy(dummyObject.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

function createBallpit(canvas: HTMLCanvasElement, params: any = {}) {
  const app = new ThreeApp({
    canvas,
    size: "parent",
    rendererOptions: { antialias: true, alpha: true },
  });
  let spheres: InstancedSpheres;
  app.renderer.toneMapping = ACESFilmicToneMapping;
  app.camera.position.set(0, 0, 20);
  app.camera.lookAt(0, 0, 0);
  app.cameraMaxAspect = 1.5;
  app.resize();

  function initialize(p: any) {
    if (spheres) {
      app.clear();
      app.scene.remove(spheres);
    }
    spheres = new InstancedSpheres(app.renderer, p);
    app.scene.add(spheres);
  }
  initialize(params);

  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const intersectPoint = new Vector3();
  let paused = false;

  canvas.style.touchAction = "none";
  canvas.style.userSelect = "none";
  (canvas.style as any).webkitUserSelect = "none";

  const target = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    touching: false,
    onEnter() {
      raycaster.setFromCamera(target.nPosition, app.camera);
      app.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, intersectPoint);
      spheres.physics.center.copy(intersectPoint);
      spheres.config.controlSphere0 = true;
    },
    onMove() {
      raycaster.setFromCamera(target.nPosition, app.camera);
      app.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, intersectPoint);
      spheres.physics.center.copy(intersectPoint);
      spheres.config.controlSphere0 = true;
    },
    onLeave() {
      spheres.config.controlSphere0 = false;
    },
  };

  const interaction = registerInteraction(canvas, target);

  app.onBeforeRender = (time) => {
    if (!paused) spheres.update(time);
  };

  app.onAfterResize = (size) => {
    spheres.config.maxX = size.wWidth / 2;
    spheres.config.maxY = size.wHeight / 2;
  };

  return {
    three: app,
    get spheres() {
      return spheres;
    },
    setCount(c: number) {
      initialize({ ...spheres.config, count: c });
    },
    togglePause() {
      paused = !paused;
    },
    dispose() {
      interaction.dispose();
      app.dispose();
    },
  };
}

interface BallpitProps {
  className?: string;
  followCursor?: boolean;
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  colors?: any[];
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
}

const Ballpit = ({ className = "", followCursor = true, ...props }: BallpitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spheresInstanceRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    spheresInstanceRef.current = createBallpit(canvas, { followCursor, ...props });

    return () => {
      if (spheresInstanceRef.current) {
        spheresInstanceRef.current.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas className={className} ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default Ballpit;
