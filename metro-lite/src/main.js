this.metronome = (function() {
    var prev  = performance.now(),
        tick   = new Audio('/metro/assets/tick.mp3'),
        tock   = new Audio('/metro/assets/tock.mp3'),
        step  = function() {
            tick.play();
        },
        isLooping = false;
    function loop(cfg) {
        if(!isLooping) return;
        var curr = performance.now();
        if(curr - prev > cfg.delta) {
            prev = curr;
            cfg.beat();
        }
        requestAnimationFrame(function() {
            loop(cfg);
        });
    }
    function startLoop() {
        isLooping = true;
        loop(loadConfig());
    }
    function stopLoop() {
        isLooping = false;
    }
    function loadConfig() {
        function getVal(sel) {
            var e = document.querySelector(sel);
            return Number(e.value);
        }
        var config = {
            bpm: getVal(".bpm"),
            signature: {
                numerator: getVal(".sig-num"),
                denominator: getVal(".sig-den")
            }
        };
        function mkBeat(n) {
            var curr   = 0,
                sounds = [tick];
            if(n > 1) {
                var t = Array(n-1).fill(tock);
                sounds = sounds.concat(t);
            }
            return function() {
                var s = sounds[curr++ % sounds.length];
                s.play();
            }
        }
        return {
            delta: 60 / config.bpm *1000,
            beat: mkBeat(config.signature.numerator)
        };
    }
    return {
        play: startLoop,
        stop: stopLoop
    };
})();
