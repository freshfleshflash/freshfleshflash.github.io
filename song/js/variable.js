var constVar = {
    maxQueryCount: 7
};

var loading = false;
var titleFlag = false;
var autoFlag = false;
var autoTrainInterval;
var defaultSpeed = 3;
var autoTrainSpeed = defaultSpeed;

var thumbLeft, thumbWidth;
var totalLeft;

var synth;
var songs = [];
var notes = ["B4", "A4", "G4", "F4", "E4", "D4", "C4"];

var staticLines = [];