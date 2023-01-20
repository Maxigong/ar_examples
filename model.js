import { GLTFLoader } from "./libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js";
const THREE = window.MINDAR.IMAGE.THREE;
// console.log(window.MINDAR.THREE);
const button = document.querySelector("#button");

button.addEventListener("click", () => {
    start();
});

const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "./target.mind",
    });

    const { renderer, camera, scene } = mindarThree;
    const anchor = mindarThree.addAnchor(0);
    const light = new THREE.HemisphereLight(0xffffff, 0xbbffff, 1);
    scene.add(light);
    const loader = new GLTFLoader();

    loader.load("./medieval_fantasy_book/scene.gltf", (gltf) => {
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        anchor.group.add(gltf.scene);
    });

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
};

// });
