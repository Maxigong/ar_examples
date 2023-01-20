import { CSS3DObject } from "./libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";

gsap.set(".link", { opacity: 0, zIndex: -1 });
let tl = gsap.timeline();
tl.to(".link", { opacity: 1, y: 220, stagger: 0.3 }).pause();

const button = document.querySelector("#button");

button.addEventListener("click", () => {
    start();
});

// document.addEventListener("DOMContentLoaded", () => {
const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.querySelector(".canvas"),
        imageTargetSrc: "./target.mind",
    });

    const { renderer, camera, cssScene, cssRenderer } = mindarThree;
    const mainContainer = new CSS3DObject(document.querySelector("#cardMain"));

    mainContainer.userData.clickable = true;
    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(mainContainer);

    cssAnchor.onTargetFound = () => {
        tl.play();
    };
    cssAnchor.onTargetLost = () => {
        tl.reverse();
    };

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
        cssRenderer.render(cssScene, camera);
    });
};

// });
