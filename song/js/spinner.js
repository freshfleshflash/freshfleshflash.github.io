var spinner = (function () {
    var question = $('#question').text();
    var questionDivSize = question.length * size.fontSize * 0.8;

    var spinner;
    var spinnerInterval;
    var spinnerSize = questionDivSize * 0.45;

    var opt = {
        lines: 15, // The number of lines to draw
        length: spinnerSize * 0.6,//40, // The length of each line
        width: 10, // The line thickness
        radius: spinnerSize,//50, // The radius of the inner circle
        corners: 3, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#373736',
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent in px
        left: '50%', // Left position relative to parent in px
        position: 'fixed' // Element positioning
    };

    var positionQuestion = function () {
        $('#question').css('width', questionDivSize + 'px')
            .css('height', questionDivSize + 'px')
            .css('line-height', questionDivSize + 'px')
            .css('margin-top', -questionDivSize * 0.5 + 'px')
            .css('margin-left', -questionDivSize * 0.5 + 'px');
    };

    var start = function () {
        spinner = new Spinner(opt);
        spinner.spin($('#bg')[0]);
        $('#question').css('display', 'block');
    };

    var stop = function () {
        clearInterval(spinnerInterval);
        spinner.stop();
        $('#question').css('display', 'none');
    };

    positionQuestion();

    return {
        start: start,
        stop: stop
    };
})();