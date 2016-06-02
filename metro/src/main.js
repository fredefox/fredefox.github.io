angular.module('Metronome', [])
    .directive('metronome', function() {
        return {
            templateUrl: '/metro/src/template/metronome.html',
            link: function($scope) {
                $scope.metronome = {
                    bpm: 120,
                    signature: {
                        numerator:   4,
                        denominator: 4
                    }
                };
                function mkBeat(n) {
                    var tick   = new Audio('/metro/assets/tick.mp3'),
                        tock   = new Audio('/metro/assets/tock.mp3'),
                        curr   = 0,
                        sounds = [tick];
                    if(n > 1) {
                        var t = _.times(n-1, function() { return tock; });
                        sounds = sounds.concat(t);
                    }
                    return function() {
                        var s = sounds[curr++ % sounds.length];
                        s.play();
                    }
                }
                $scope.$watch('metronome', function(v) {
                    $scope._beatInterval = 60/v.bpm*1000;
                    $scope._beat = mkBeat(v.signature.numerator);
                }, true);
            },
            controller: function($scope) {
                    var prev  = 0,
                        bpm   = 120,
                        box   = document.querySelector('.indicator'),
                        step  = function() {
                            $scope._beat();
                            if($scope.$$phase) return;
                            $scope.$apply(function() {
                                $scope._oddBeat = !$scope._oddBeat;
                            });
                        }
                    function loop() {
                        var curr = performance.now();
                        if(curr - prev > $scope._beatInterval) {
                            prev = curr;
                            step();
                        }
                        requestAnimationFrame(loop);
                    }
                    $scope._start = loop;
            }
        };
    });
