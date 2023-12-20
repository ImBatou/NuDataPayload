function getSupportedAudioFormats() {
    var supportedFormats = "fa";

    try {
        var audioElement = document.createElement("audio");
        var audioFormats = ["mpeg", "ogg", "wav"];

        if (typeof audioElement !== "undefined") {
            for (var formatIndex in audioFormats) {
                if (audioFormats.hasOwnProperty(formatIndex)) {
                    var currentFormat = audioFormats[formatIndex];
                    if (audioElement.canPlayType("audio/" + currentFormat) !== "") {
                        supportedFormats += "," + currentFormat;
                    }
                }
            }
        }
    } catch (error) {}

    return supportedFormats;
}