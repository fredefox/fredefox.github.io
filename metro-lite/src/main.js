this.metronome = (function() {
    var prev  = performance.now(),
        tick  = new Audio('assets/Blip.ogg')
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
    var _ = {times: function() {console.error('Not implemented');}}
    function loadConfig() {
        var config = {
            bpm: 120,
            signature: {
                numerator: 4,
                denominator: 4
            }
        };
        function mkBeat(n) {
            var tick   = new Audio('/metro/assets/tick.mp3'),
                tock   = new Audio('/metro/assets/tock.mp3'),
                curr   = 0,
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
