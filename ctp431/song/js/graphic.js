var graphic = (function () {

    var render = function () {
        var x = parseInt($("#bg").css("left"));
        var y = parseInt($("#bg").css("top"));
        var h = ($("#bg").height()) / 7;

        $(".note").css("width", 25);

        for (var i = 0; i < constVar.maxQueryCount; i++) {
            $("#note" + i).css("left", x).css("top", y + 1 + i * h).css("height", h);
        }
        $("#rightBorder").css("left", x + $("#bg").width() - 25).css("top", y + 1).css("height", h * 7);
    };

    var setDiv = function () {
        totalLeft = $(window).width() / 2 - $("#bg").width() / 2;
        $("#bg").css("left", totalLeft);

        $(".timeContainer").css("top", parseInt($("#bg").css("top")) * 1.1 + parseInt($("#bg").css("height")) + "px");
        $("#startingTime").css("left", totalLeft);
        $("#endingTime").css("left", totalLeft + $("#bg").width() - $("#endingTime").width());

        for (var i = 0; i < constVar.maxQueryCount; i++) {
            staticLines[i] = size.leading * 1 + i * size.leading * 2 - size.fontSize * 0.5;
        }
    };

    var setButtons = function () {
        var commonRatio = 1.15;

        $("#playContainer").css("left", $(window).width() / 2 - parseInt($(".container").css("width")) / 2).css("top", parseInt($("#bg").css("top")) + $("#bg").height() * commonRatio);
        $("#backContainer").css("left", $(window).width() / 2 - $("#bg").width() / 4 - parseInt($(".container").css("width")) / 2).css("top", parseInt($("#bg").css("top")) + $("#bg").height() * commonRatio);
        $("#fwdContainer").css("left", $(window).width() / 2 + $("#bg").width() / 4 - parseInt($(".container").css("width")) / 2).css("top", parseInt($("#bg").css("top")) + $("#bg").height() * commonRatio);
    };

    var setSlider = function () {
        $(".slider").css("left", totalLeft);
        document.styleSheets[1].addRule("::-webkit-slider-thumb", "background: hsl(" + $("#range").val() + ", 48%, 79%);");
    };

    return {
        render: render,
        setDiv: setDiv,
        setButtons: setButtons,
        setSlider: setSlider
    };
})();