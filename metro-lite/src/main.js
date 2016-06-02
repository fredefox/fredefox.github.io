this.metronome = (function() {
    var prev  = performance.now(),
        delta = 800,
        tick  = new Audio('assets/Blip.ogg')
        step  = function() {
            tick.play();
        },
        isLooping = false;
    function loop() {
        if(!isLooping) return;
        var curr = performance.now();
        if(curr - prev > delta) {
            prev = curr;
            step();
        }
        requestAnimationFrame(loop);
    }
    function startLoop() {
        isLooping = true;
        loop();
    }
    function stopLoop() {
        isLooping = false;
    }
    return {
        play: startLoop,
        stop: stopLoop
    };
})();
