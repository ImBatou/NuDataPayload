function generateCanvasImage() {
    var imageData = "NA";

    try {
        var canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 40;
        canvas.style.display = "inline";

        var context = canvas.getContext("2d");
        context.fillText("aBc#$efG~ \ude73\ud63d", 4, 10);

        context.fillStyle = "rgba(67, 92, 0, 0.5)";
        context.font = "18pt Arial";
        context.fillText("aBc#$~efG \ude73\ud63d", 8, 12);

        imageData = canvas.toDataURL();
    } catch (error) {}

    return imageData;
}