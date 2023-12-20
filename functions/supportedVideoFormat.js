function supportedVideoFormats() {
    var formats = "fv";

    try {
        var videoElement = document.createElement("video");
        var videoFormats = ["ogg", "mp4", "webm"];

        if (typeof videoElement !== "undefined") {
            for (var formatIndex in videoFormats) {
                if (videoFormats.hasOwnProperty(formatIndex)) {
                    var currentFormat = videoFormats[formatIndex];
                    if (videoElement.canPlayType("video/" + currentFormat) !== "") {
                        formats += "," + currentFormat;
                    }
                }
            }
        }
    } catch (error) {}

    return formats;
}