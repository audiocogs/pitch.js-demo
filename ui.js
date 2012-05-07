Mike.on('error', function(e) {
    console.log('Uncaught error:', e);
});

var wheel = document.querySelector('.tuner .wheel'),
    c = document.querySelector('.tuner .freq').childNodes[0],
    flat = document.querySelector('.tuner .flat'),
    sharp = document.querySelector('.tuner .sharp'),
    arrow = document.querySelector('.tuner .arrow'),
    pitch = null;

wheel.rotate = function (angle) {
    var prefixes = ['webkitT', 'MozT', 'msT', 'OT', 't'];

    for (var i=0; i<prefixes.length; i++) {
        this.style[prefixes[i] + 'ransform'] = 'rotate(' + angle + 'rad)';
    }
};

function toggleClass (elem, cls, add) {
    if (elem.classList) {
        elem[add ? 'add' : 'remove'](cls);
    } else if (typeof elem.className === 'string') {
        elem.className = elem.className.replace(cls, '') +
            (add ? ' ' + cls : '');
    } else if (typeof elem.className === 'object') {
        elem.className.baseVal = elem.className.baseVal.replace(cls, '') +
            (add ? ' ' + cls : '');
    }
}
    
var mike = new Mike({
    swfPath: 'vendor/mike.swf',
    parentElement: document.querySelector('.tuner'),
    settings: {
        codec: Mike.SoundCodec.NELLYMOSER,
        sampleRate: 44100
    }
});

mike.on('ready', function() {
    pitch = new PitchAnalyzer(44100);

    this.setMicrophone();
    this.start();

    if (!this.getParam('muted')) {
        this.hide();
    }
});

mike.on('statechange', function(e) {
    this.hide();
})

mike.on('error', function(e) {
    console.log(e);
});

mike.on('data', function(data) {
    pitch.input(data);
    pitch.process();
    var tone = pitch.findTone();
    
    if (tone) {
        var freq = tone.freq,
            note = getNote(freq),
            angle = -getAngle(note + 3),
            detune = note - Math.round(note),
            isFlat = detune < -0.01,
            isSharp = detune > 0.01,
            inTune = !isFlat && !isSharp;
            
        wheel.rotate(angle);
        c.textContent = Math.round(freq);

        toggleClass(flat, 'highlighted', isFlat);
        toggleClass(sharp, 'highlighted', isSharp);
        toggleClass(arrow, 'highlighted', inTune);
        
        // TODO
        // 1. octave indicators
    }
});

function getNote(frequency, reference) {
    if (!frequency) return null;
    reference = reference || 440;
    return 69 + 12 * Math.log(frequency / reference) / Math.LN2;
}

function getAngle(midiNote) {
    return midiNote ? Math.PI * (midiNote % 12) / 6 : 0;
}

function getOctave (midiNote) {
    return ~~(midiNote / 12);
}
