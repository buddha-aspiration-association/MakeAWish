function animateBackground(duration) {
    const startTime = performance.now();
    const startBg = {
        outerOpacity: 0
    };
    const endBg = {
        outerOpacity: 0.9
    };

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const currentOuterOpacity = startBg.outerOpacity + (endBg.outerOpacity - startBg.outerOpacity) * easeProgress;

        document.body.style.background = `
            radial-gradient(circle, transparent 20%, rgba(0, 0, 0, ${currentOuterOpacity}) 70%),
            antiquewhite
        `;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}
