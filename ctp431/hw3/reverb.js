
var Reverb = function (context, parameters, buffer) {

    this.context = context;
    this.input = context.createGain();

    // create nodes
    this.convolver = context.createConvolver();
    this.convolver.buffer = buffer;
    this.wetGain = context.createGain();
    this.dryGain = context.createGain();

    // connect
    delay.delayLine.connect(this.convolver);
    this.convolver.connect(this.wetGain);
    this.input.connect(this.dryGain);

    this.dryGain.connect(this.context.destination);
    this.wetGain.connect(this.context.destination);

    this.wetGain.gain.value = parameters.reverbWetDry;
    this.dryGain.gain.value = (1 - parameters.reverbWetDry);
    this.parameters = parameters;
};

Reverb.prototype.updateParams = function (params, value) {
    switch (params) {
        case 'reverb_wet_dry':
            this.parameters.reverbWetDry = value;
            this.wetGain.gain.value = value;
            this.dryGain.gain.value = 1 - value;
            break;
    }
};

function loadReverb(fileName) {
    var request = new XMLHttpRequest();
    request.open("GET", fileName, true);
    request.responseType = "arraybuffer";
    request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {
            reverb = new Reverb(context, reverb_params, buffer);
        }, function (e) {
            console.log(e);
        });
    };
    request.onerror = function (e) {
        console.log(e);
    };
    request.send();
};