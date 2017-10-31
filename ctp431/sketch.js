var roomNum = 4;

var context = new (window.AudioContext || window.webkitAudioContext)();
var buffers = new Array(roomNum);
var fftSize = 32;
var gainNodes = new Array(roomNum);

// sketch
var totalW = $(window).width();
var totalH = $(window).height();

// room
var rooms = [];
var gapW = totalW / (5 * Math.sqrt(roomNum) + Math.sqrt(roomNum) + 1);
var gapH = totalH / (4 * Math.sqrt(roomNum) + Math.sqrt(roomNum) + 1);
var roomW = gapW * 5;
var roomH = gapH * 4;

// human
var humans = new Array(roomNum);
var movements = new Array(roomNum);

movements[0] = {
    armDeg: 180,
    elbowDeg: 180,
    legDeg: 0,
    leftArmAng: 200,
    leftElbowAng: 30,
    leftLegAng: 0,
    leftKneeAng: 0,
    rightArmAng: 200,
    rightElbowAng: 30,
    rightLegAng: 0,
    rightKneeAng: 0
};

movements[1] = {
    armDeg: 0,
    elbowDeg: 0,
    legDeg: 0,
    leftArmAng: 90,
    leftElbowAng: -30,
    leftLegAng: 0,
    leftKneeAng: 0,
    rightArmAng: -90,
    rightElbowAng: 30,
    rightLegAng: 0,
    rightKneeAng: 0
};

movements[2] = {
    armDeg: 180,
    elbowDeg: 0,
    legDeg: 0,
    leftArmAng: -200,
    leftElbowAng: 0,
    leftLegAng: 0,
    leftKneeAng: 0,
    rightArmAng: 200,
    rightElbowAng: 0,
    rightLegAng: 0,
    rightKneeAng: 0
};

movements[3] = {
    armDeg: 180,
    elbowDeg: 180,
    legDeg: 0,
    leftArmAng: 90,
    leftElbowAng: -30,
    leftLegAng: 0,
    leftKneeAng: 0,
    rightArmAng: 90,
    rightElbowAng: -30,
    rightLegAng: 0,
    rightKneeAng: 0
};

var playImg, stopImg, openImg;

function preload() {
    playImg = loadImage("asset/play.png");
    stopImg = loadImage("asset/stop.png");
    openImg = loadImage("asset/open.png");

    alert("SEPARATE ROOM, SEPARATE MUSIC\nMAKE THEM DANCE ALTOGETHER TO THE MUSIC!!!\n[1st button: 'play', 2nd button: 'stop', 3rd button: 'open']");
}

function setup() {
    createCanvas(totalW, totalH);
    smooth();
    colorMode(HSB);

    setRooms();
    setHumans();

    strokeWeight(1.5);
    stroke(0);
    fill(255);
}

function draw() {
    background(0, 0, 40);
    drawRooms();

    push();
    noStroke();
    fill(0, 0, 40);
    rect(0, gapH + roomH, totalW, gapH);
    rect(0, gapH * 2 + roomH + roomH, totalW, gapH);
    pop();

    var room;
    for (var i = 0; i < roomNum; i++) {
        room = rooms[i];
        push();
        strokeWeight(3);
        noFill();
        rect(room.x, room.y, roomW, roomH);
        pop();
    }

    // push();
    // noFill();
    // strokeWeight(10);
    // rectMode(CENTER);
    // rect(totalW / 2, totalH / 2, totalW * 0.95, totalH * 0.95);
    // pop();
}

function setHumans() {
    for (var i = 0; i < roomNum; i++) {
        humans[i] = new Human(i, rooms[i]);
    }
}

function Human(id, room) {
    this.id = id;
    this.room = room;
    this.x = room.x;
    this.y = room.y;

    var humanX = roomW * 0.75;
    var humanY = roomH * 1.02;
    var r = roomW * 0.1;
    var bodyH = r * 1.6;
    var armLeng = r * 0.7;
    var legLeng = r * 0.7;

    var leftArmAng = -150;
    var leftElbowAng = 0;
    var leftLegAng = 0;
    var leftKneeAng = 0;

    var rightArmAng = -150;
    var rightElbowAng = 0;
    var rightLegAng = 0;
    var rightKneeAng = 0;

    var jumpingDeg = 0;
    var speed = random(-1, 1);

    var m = movements[id];
    var movingDir = 1;

    this.dance = function (sum, bass, treble) {
        leftArmAng = (m.armDeg + map(treble, 0, 255, 0, m.leftArmAng)) * movingDir;
        leftElbowAng = (m.elbowDeg + map(bass, 0, 255, 0, m.leftElbowAng)) * movingDir;
        leftLegAng = m.legDeg + map(treble, 0, 255, 0, m.leftLegAng);
        leftKneeAng = m.legDeg + map(bass, 0, 255, 0, m.leftKneeAng);

        rightArmAng = (m.armDeg + map(treble, 0, 255, 0, m.rightArmAng)) * movingDir;
        rightElbowAng = (m.elbowDeg + map(bass, 0, 255, 0, m.rightElbowAng)) * movingDir;
        rightLegAng = m.legDeg + map(treble, 0, 255, 0, m.rightLegAng);
        rightKneeAng = m.legDeg + map(bass, 0, 255, 0, m.rightKneeAng);

        var amp = map(sum, 0, 255 * 32, 0, 3);
        jumpingDeg = map(bass, 0, 255, 0, -roomH * 0.05 * amp);
    };

    this.move = function () {
        humanX += speed;
        if (humanX >= roomW - r * 1.2 || humanX <= r * 1.2 + roomW * 0.4) {
            speed = -speed;
            if (id == 1 || id == 2) movingDir = -movingDir;
        }
    };

    this.draw = function () {
        push();
        translate(this.x, this.y);
        translate(humanX, humanY - jumpingDeg);

        translate(0, -legLeng * 2 - bodyH - r * 0.9);
        ellipse(0, 0, r * 0.85, r * 0.85);
        translate(0, r * 0.75);
        rect(-r / 2, 0, r, bodyH, 0);

        // left
        push();
        translate(-r / 2, 0);
        rotate(radians(180 + leftArmAng));
        line(0, 0, 0, armLeng);

        translate(0, armLeng);
        rotate(radians(leftElbowAng));
        line(0, 0, 0, armLeng);
        pop();

        push();
        translate(-r / 2, bodyH);
        rotate(radians(leftLegAng));
        line(0, 0, 0, legLeng);

        translate(0, legLeng);
        rotate(radians(leftKneeAng));
        line(0, 0, 0, legLeng);
        pop();

        // right
        push();
        translate(r / 2, 0);
        rotate(-radians(180 + rightArmAng));
        line(0, 0, 0, armLeng);

        translate(0, armLeng);
        rotate(-radians(rightElbowAng));
        line(0, 0, 0, armLeng);
        pop();

        push();
        translate(r / 2, bodyH);
        rotate(-radians(rightLegAng));
        line(0, 0, 0, legLeng);

        translate(0, legLeng);
        rotate(-radians(rightKneeAng));
        line(0, 0, 0, legLeng);
        pop();
        pop();
    };
}

function drawRooms() {
    var room;
    for (var i = 0; i < roomNum; i++) {
        room = rooms[i];
        push();
        strokeWeight(3);
        rect(room.x, room.y, roomW, roomH);
        pop();
        room.audio.draw(room.x, room.y);
        humans[i].draw();

        room.drawBars();
    }
}

function setRooms() {
    for (var i = 0; i < roomNum; i++) {
        rooms[i] = new Room(i, gapW + (gapW + roomW) * (i % sqrt(roomNum)), gapH + (gapH + roomH) * parseInt(i / sqrt(roomNum)));
    }

    $('#title').css({'left': gapW, 'top': gapH - $('#title').height()});
}

function Room(id, x, y) {
    var barNum = 12;
    var barH = roomH * 0.3;
    var barGap = roomW / barNum;

    this.id = id;
    this.x = x;
    this.y = y;

    this.audio = new Audio(id);

    this.drawBars = function () {
        push();
        translate(x, y + roomH);
        strokeWeight(5);
        for (var i = 0; i < barNum + 1; i++) {
            line(barGap * i, 0, barGap * i, -barH);
        }
        line(0, -barH, roomW, -barH);
        line(0, 0, roomW, 0);
        pop();
    };

    // $('body').append('<div id="yell' + this.id + '" visibility="visible">TURN DOWN THE MUSIC!!!</div>');
}

var isPlayings = [false, false, false, false];

function Audio(id) {
    this.id = id;
    this.color = color(random(360), 100, 100);

    var source, data;
    var analyser = context.createAnalyser();
    analyser.fftSize = fftSize;

    $('body').append('<div id="play' + this.id + '"></div>');
    $('body').append('<div id="stop' + this.id + '"></div>');
    $('body').append('<div id="open' + this.id + '"><input type="file" style="opacity: 0;"/></div>');

    $('#open' + this.id).change(function (e) {
        fileChanged(e);
    });

    $('#play' + this.id).click(function () {
        isPlayings[id] = true;

        source = context.createBufferSource();
        source.buffer = buffers[id];
        source.connect(context.destination);
        source.connect(analyser);
        source.start();
    });

    $('#stop' + this.id).click(function () {
        if (source) {
            isPlayings[id] = false;
            source.stop();
        }
    });

    $('#mute' + this.id).click(function () {
        if (source) {
            gainNodes[this.id].gain.value = 0;
        }
    });

    var fileChanged = function (e) {
        var file = e.target.files[0];
        var fileReader = new FileReader();
        fileReader.onload = fileLoaded;
        fileReader.readAsArrayBuffer(file);
    };

    var fileLoaded = function (e) {
        context.decodeAudioData(e.target.result, function (buffer) {
            buffers[id] = buffer;
        });
    };

    var amp;
    this.changeAmp = function (sum) {
        amp = map(sum, 0, 255 * data.length, 0, 3);
    };

    this.draw = function (x, y) {
        var audioX = roomW * 0.1;
        var audioY = roomH * 0.25
        var w = roomW * 0.4;
        var h = roomH * 0.4;

        var centerW = w * 0.6;
        var sideW = (w - centerW) / 2;

        var displayW = centerW * 0.85;
        var displayH = h * 0.6;
        var displayGap = (centerW - displayW) / 2;

        var buttonH = h - displayH - displayGap * 3;
        var buttonW = buttonH;
        var buttonInW = buttonW * 0.6;
        var buttonInGap = (buttonH - buttonInW) / 2;
        var buttonNum = 3;
        var buttonGap = (displayW - buttonW * buttonNum) / (buttonNum - 1);

        if (!isPlayings[id]) amp = 1;
        var bigR = sideW * 0.7 * amp;
        var smallR = bigR * 0.2 * amp;

        var deskW = w * 1.1;
        var deskH = roomH - audioY - h;

        push();
        translate(x, y);
        translate(audioX, audioY);

        // audio
        rect(0, 0, w, h);
        line(sideW, 0, sideW, h);
        line(w - sideW, 0, w - sideW, h);

        // desk
        rect(w / 2 - deskW / 2, h, deskW, deskH);

        // display
        rect(sideW + displayGap, displayGap, displayW, displayH);

        // visualizer
        push();
        translate(sideW + displayGap, displayGap + displayH);
        if (isPlayings[id]) renderVisualizer(displayW, displayH, this.color);
        pop();

        image(playImg, sideW + displayGap + buttonInGap, displayH + displayGap * 2 + buttonInGap, buttonInW, buttonInW);
        image(stopImg, sideW + displayGap + (buttonW + buttonGap) + buttonInGap, displayH + displayGap * 2 + buttonInGap, buttonInW, buttonInW);
        image(openImg, sideW + displayGap + (buttonW + buttonGap) * 2 + buttonInGap, displayH + displayGap * 2 + buttonInGap, buttonInW, buttonInW);

        // buttons
        $('#play' + this.id).css({
            'left': x + audioX + sideW + displayGap,
            'top': y + audioY + displayH + displayGap * 2,
            'width': buttonW,
            'height': buttonH
        });

        $('#stop' + this.id).css({
            'left': x + audioX + sideW + displayGap + (buttonW + buttonGap),
            'top': y + audioY + displayH + displayGap * 2,
            'width': buttonW,
            'height': buttonH
        });

        $('#open' + this.id).css({
            'left': x + audioX + sideW + displayGap + (buttonW + buttonGap) * 2,
            'top': y + audioY + displayH + displayGap * 2,
            'width': buttonW,
            'height': buttonH
        });

        translate(w / 2, h);

        // speakers
        push();
        translate(-w / 2 + w * 1 / 5 * 1 / 2, -h / 2);
        ellipse(0, -h / 4, bigR, bigR);
        ellipse(0, -h / 4, smallR, smallR);
        ellipse(0, h / 4, bigR, bigR);
        ellipse(0, h / 4, smallR, smallR);
        pop();

        push();
        translate(w / 2 - w * 1 / 5 * 1 / 2, -h / 2);
        ellipse(0, -h / 4, bigR, bigR);
        ellipse(0, -h / 4, smallR, smallR);
        ellipse(0, h / 4, bigR, bigR);
        ellipse(0, h / 4, smallR, smallR);
        pop();

        pop();
    };

    var renderVisualizer = function (w, h, c) {
        data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);

        var sliceW = w / data.length;

        push();
        strokeWeight(1);
        fill(c);
        for (var i = 0; i < data.length; i++) {
            rect(sliceW * i, 0, sliceW, -map(data[i], 0, 255, 0, h));
        }
        pop();

        var bass = (data[1] + data[2] + data[3]) / 3;
        var treble = (data[data.length - 1] + data[data.length - 2] + data[data.length - 3]) / 3;
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i];
        }

        humans[id].dance(sum, bass, treble);
        humans[id].move();
        rooms[id].audio.changeAmp(sum);
    };
}