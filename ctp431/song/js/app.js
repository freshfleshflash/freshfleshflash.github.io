$(window).on('beforeunload', function () {
    $('#bg').scrollLeft(0);
});

$(document).ready(function () {
    graphic.setDiv();
    graphic.setButtons();
    graphic.setSlider();
    graphic.render();

    synth = new Tone.PolySynth(7).toMaster();

    $("#render").click(function () {
        if ($("#qWord").val() == "") alert("Name the song");
        else {
            if (!titleFlag) {
                titleFlag = true;
                title.disappear();
            }

            init($("#qWord").val());

            $("#song").text($("#qWord").val());
            $("#song").css("top", parseInt($("#bg").css("top")) * 1.2 + parseInt($("#bg").css("height")) + "px").css("left", totalLeft + $("#bg").width() / 2 - $("#song").width() / 2);
        }
    });
});

var init = function (qWord) {

    tweets.callAPI(true, qWord);

    $('#bg').scroll(function () {

        duration.showProgress();

        for (var i = 0; i < songs.length; i++) {
            var w = $("#" + songs[i].id).width();

            if (songs[i].left < $('#bg').scrollLeft() && !songs[i].released) {

                if (!songs[i].passed) {
                    synth.triggerAttack(notes[songs[i].lineId]);
                    $("#note" + songs[i].lineId).addClass("on");
                    $("#note" + songs[i].lineId).css("background", "hsl(" + $("#range").val() + ", 48%, 79%)");

                    songs[i].passed = true;
                } else if (songs[i].left + w < $('#bg').scrollLeft() && songs[i].passed) {
                    $("#note" + songs[i].lineId).removeClass("on");
                    $("#note" + songs[i].lineId).css("background", "#A4A29D");

                    synth.triggerRelease(notes[songs[i].lineId]);

                    songs[i].released = true;
                }
            } else if (songs[i].left > $('#bg').scrollLeft() && songs[i].passed && !songs[i].released) {
                $("#note" + songs[i].lineId).removeClass("on");
                $("#note" + songs[i].lineId).css("background", "#A4A29D");

                synth.triggerRelease(notes[songs[i].lineId]);

                songs[i].released = true;
            }

            else if (songs[i].left > $('#bg').scrollLeft() && songs[i].released) {
                songs[i].released = false;
                songs[i].passed = false;
            }
        }

        thumb.getValue();

        if ($('#bg').scrollLeft() + $('#bg').width() >= $('#bg')[0].scrollWidth) {
            if (!loading) {
                tweets.load(qWord);
                spinner.start();
            }
        }
    });

    $(window).bind('mousewheel', function (e) {
        var preScroll = $('#bg').scrollLeft();
        $('#bg').scrollLeft(preScroll - e.originalEvent.wheelDeltaX);

        return false;
    });

    var hhh = 180;

    $("#playContainer").click(function () {

        if (autoFlag) {
            $("#play").css("display", "block");
            $("#pause").css("display", "none");

            for (var i = 0; i < songs.length; i++) {
                synth.triggerRelease(notes[songs[i].lineId]);
                $("#note" + songs[i].lineId).removeClass("on");
                $("#note" + songs[i].lineId).css("background", "#A4A29D");
                songs[i].released = true;
                songs[i].passed = false;
            }
        } else {
            $("#play").css("display", "none");
            $("#pause").css("display", "block");
            $(".dummy").css("display", "block");
        }

        autoFlag = !autoFlag;

        if (autoFlag) {
            autoTrainInterval = setInterval(function () {
                auto.move();
            }, 10);
        } else {
            clearInterval(autoTrainInterval);
        }
    });

    var stage = 0.1;

    $("#backContainer").click(function () {
        if (autoTrainSpeed > defaultSpeed - 2) autoTrainSpeed -= stage;
    });

    $("#fwdContainer").click(function () {
        if (autoTrainSpeed < defaultSpeed + 2) autoTrainSpeed += stage;
    });
};

$('input[type=range]').on('input', function () {
    synth.set("detune", $("#range").val() * 10);
    document.styleSheets[1].addRule("::-webkit-slider-thumb", "background: hsl(" + $("#range").val() + ", 48%, 79%);");
    $(".on").css("background", "hsl(" + $("#range").val() + ", 48%, 79%)");
});

$("#info").click(function() {
    alert("[What]\n\nGrabs tweets containing keywords and turns them into sound,\nenabling an endless song\n\n\n[How]\n\nTop slider: tune controller\n\nBottom bar: scroller\n\nPlay button: auto play\n\nRew button: play slower\n\nFwd button: play faster");
});