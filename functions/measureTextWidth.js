function measureTextWidths() {
    var textWidths = [];

    try {
        var canvasContext = document.createElement("canvas").getContext("2d");
        var fontList = nds.common.bi.fontMetricsFontList;

        for (var i = 0; i < fontList.length; i += 1) {
            canvasContext.font = '72px "' + fontList[i] + '"';
            var textWidth = canvasContext.measureText("mmmmmmmmmmlli").width;
            textWidths.push(textWidth);
        }
    } catch (error) {}

    return textWidths;
}