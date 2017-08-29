// @flow
import * as THREE from 'three';

export default function createMoon(element: HTMLElement) {
  let scene, camera, renderer;
  let mouseX, mouseY;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  let directionalLight1;

  function init() {
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x242424);

    camera = new THREE.PerspectiveCamera(
      15,
      element.clientWidth / element.clientHeight,
      1,
      2000
    );
    camera.position.z = 200;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(element.clientWidth, element.clientHeight);
    element.appendChild(renderer.domElement);

    // 全局环境光
    const ambientLight1 = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight1);

    // 平行光,突出模型体积
    directionalLight1 = new THREE.DirectionalLight(0xcccccc);
    directionalLight1.position.set(0, 0, 80);
    scene.add(directionalLight1);

    const moonGeometry = new THREE.SphereGeometry(5, 32, 32);
    const moonMaterial = new THREE.MeshLambertMaterial({
      color: 0xffff00
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    document.addEventListener('mousemove', onDocumentMouseMove);
  }

  function onDocumentMouseMove(event: MouseEvent) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function render() {
    // camera.position.x += (mouseX - camera.position.x) * 0.05;
    // camera.position.y += (-mouseY - camera.position.y) * 0.05;
    // camera.position.x += mouseX * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function animate() {
    const time = Date.now() / 300;
    directionalLight1.position.x = Math.cos(time) * 50;
    directionalLight1.position.y = Math.sin(time) * 50;
    requestAnimationFrame(animate);
    render();
  }

  return {
    init,
    render,
    animate
  };
}
