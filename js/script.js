// Mostrar sorpresa después del loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").style.display = "block";
    init3D();
  }, 3000);
});

// Configurar escena 3D
function init3D() {
  const container = document.getElementById("scene-container");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Luces
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(2, 4, 5).normalize();
  scene.add(dirLight);
  scene.add(new THREE.AmbientLight(0xaaaaaa, 0.6));

  // Cargar tu modelo GLB
  const loader = new THREE.GLTFLoader();
  loader.load(
    "Models/Flower.glb", // <-- tu archivo exacto
    function (gltf) {
      const model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);
      model.position.y = -0.5;
      scene.add(model);

      // Animación de giro
      function animate() {
        requestAnimationFrame(animate);
        model.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    },
    undefined,
    function (error) {
      console.error("Error cargando modelo:", error);
    }
  );
}
