var size = (function () {
    var leading, fontSize;

    var resize = function () {
        leading = ($("#bg").height()) / (constVar.maxQueryCount * 2);
        fontSize = leading * 0.4;
        $('#bg').css('font-size', fontSize + "px");
        $('#song').css('font-size', fontSize * 1.5 + "px");
        $('.timeContainer').css('font-size', fontSize + "px");
    };

    resize();

    return {
        leading: leading,
        fontSize: fontSize
    };
})();