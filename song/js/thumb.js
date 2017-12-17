var thumb = (function () {
    var scrollbarArea = $('#bg').width();

    var getValue = function () {
        thumbLeft = math_map($('#bg').scrollLeft(), 0, $('#bg')[0].scrollWidth, 0, $('#bg').width() );
        thumbWidth = scrollbarArea * $('#bg').width() / $('#bg')[0].scrollWidth;
    };

    var math_map = function (value, input_min, input_max, output_min, output_max) {
        return output_min + (output_max - output_min) * (value - input_min) / (input_max - input_min);
    };

    return {
        getValue: getValue,
        math_map: math_map
    };
})();