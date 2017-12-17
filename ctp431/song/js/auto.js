var auto = (function () {
    var move = function () {
        var preScroll = $('#bg').scrollLeft();
        $('#bg').scrollLeft(preScroll + autoTrainSpeed);
    };

    return {
        move: move
    };
})();