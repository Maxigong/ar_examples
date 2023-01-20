import { CSS3DObject } from "./libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";

// gsap.set(".link", { opacity: 0, zIndex: -1 });
let tl = gsap.timeline();
// tl.to(".link", { opacity: 1, y: 220, stagger: 0.3 }).pause();

const button = document.querySelector("#button");

button.addEventListener("click", () => {
    start();
});

const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "./multiple.mind",
    });

    const { renderer, camera, cssScene, cssRenderer } = mindarThree;
    const mainContainer = new CSS3DObject(document.querySelector(".section"));

    mainContainer.userData.clickable = true;

    const firstImage = mindarThree.addCSSAnchor(0);
    firstImage.group.add(mainContainer);

    firstImage.onTargetFound = () => {
        gsap.to(".blue", { rotate: 360, repeat: -1 });
    };
    firstImage.onTargetLost = () => {
        gsap.set(".blue", { clearProps: "roate" });
    };

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
        cssRenderer.render(cssScene, camera);
    });
};
