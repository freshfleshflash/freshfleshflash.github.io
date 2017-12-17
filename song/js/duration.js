var duration = (function () {

    var reset = function () {
        var distance = $('#bg')[0].scrollWidth;
        var speed = defaultSpeed * 100;
        var duration = Math.floor(distance / speed);

        var second = makeDigitTwo(duration % 60);
        var minute = makeDigitTwo(Math.floor(duration / 60));

        var newTime = minute + ":" + second;
        $("#endingTime").text(newTime);
    };

    var showProgress = function () {
        var distance = $('#bg').scrollLeft();
        var speed = defaultSpeed * 100;
        var duration = Math.floor(distance / speed);

        var second = makeDigitTwo(duration % 60);
        var minute = makeDigitTwo(Math.floor(duration / 60));

        var currentTime = minute + ":" + second;

        $("#startingTime").text(currentTime);
    };

    var makeDigitTwo = function (number) {
        var res;
        res = (number < 10) ? "0" + number : number;
        return res;
    };

    return {
        reset: reset,
        showProgress: showProgress
    };
})();