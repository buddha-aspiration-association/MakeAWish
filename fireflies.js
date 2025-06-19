document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    function createFireflies() {

        if (document.querySelector(".fireflies-container")) return;

        const firefliesContainer = document.createElement("div");
        firefliesContainer.classList.add("fireflies-container");
        body.appendChild(firefliesContainer);

        for (let i = 0; i < 20; i++) {
            let firefly = document.createElement("div");
            firefly.classList.add("firefly");

            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;
            firefly.style.left = `${x}px`;
            firefly.style.top = `${y}px`;

            let duration = Math.random() * 5 + 16;
            firefly.style.animationDuration = `${duration}s`;

            let delay = Math.random() * 3;
            firefly.style.animationDelay = `${delay}s`;

            firefly.style.animationName = `moveBezier${i}`;

            let keyframes = `
                @keyframes moveBezier${i} {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    20% { transform: translate(${randomRange(-50, 50)}px, ${randomRange(-50, 50)}px) rotate(${randomRange(-20, 20)}deg); }
                    40% { transform: translate(${randomRange(-80, 80)}px, ${randomRange(-80, 80)}px) rotate(${randomRange(-15, 15)}deg); }
                    60% { transform: translate(${randomRange(-100, 100)}px, ${randomRange(-100, 100)}px) rotate(${randomRange(-10, 10)}deg); }
                    80% { transform: translate(${randomRange(-50, 50)}px, ${randomRange(-50, 50)}px) rotate(${randomRange(-5, 5)}deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
            `;

            let styleSheet = document.styleSheets[0];
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

            firefliesContainer.appendChild(firefly);
        }
    }

    function randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function removeFireflies() {
        const firefliesContainer = document.querySelector(".fireflies-container");
        if (firefliesContainer) {
            firefliesContainer.remove();
        }
    }

    function updateEffects() {
        if (document.body.classList.contains("fireflies-active")) {
            createFireflies();
        } else {
            removeFireflies();
        }
    }

    const observer = new MutationObserver(updateEffects);
    observer.observe(document.querySelector("#indexContent-placeholder"), { childList: true, subtree: true });

    updateEffects();
});