var action, mixer, camera, scene;
var clock = new THREE.Clock();
var action = {}

init();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1500);
    camera.position.z = 20;
    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.5);
    camera.add(pointLight);

    scene.add(camera);
    scene.background = new THREE.Color(0xe2e3e4);
    mixer = new THREE.AnimationMixer(scene)
        // mixer = new THREE.AnimationMixer(scene);

    loader = new THREE.JSONLoader();

    const cube = loader.load('./cube.json', (geometry, materials) => {

        materials.forEach(function(material) {
            material.skinning = true;
        });

        var mesh = new THREE.SkinnedMesh(
            geometry, materials
        );

        mixer = new THREE.AnimationMixer(mesh);

        mesh.rotation.set(Math.PI * 0.25, -Math.PI * 0.75, 0)

        action.jump = mixer.clipAction(geometry.animations[0]);

        action.jump.enabled = true;

        scene.add(mesh);
        action.jump.play()

    })

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);
    animate()

}

function animate() {
    requestAnimationFrame(animate);
    mixer.update(clock.getDelta())
    renderer.render(
        scene,
        camera
    );
}