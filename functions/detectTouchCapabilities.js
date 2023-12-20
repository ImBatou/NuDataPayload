function detectTouchCapabilities() {
    var touchInfo = {
        maxTouchPoints: "NA",		//mtp
        touchStartSupported: false,	//ts
        touchEventSupported: false	//te
    };

    if (typeof navigator.maxTouchPoints !== 'undefined') {
        touchInfo.maxTouchPoints = navigator.maxTouchPoints;
    } else if (typeof navigator.msMaxTouchPoints !== 'undefined') {
        touchInfo.maxTouchPoints = navigator.msMaxTouchPoints;
    }

    touchInfo.touchStartSupported = 'ontouchstart' in window;

    touchInfo.touchEventSupported = false;
    try {
        document.createEvent("TouchEvent");
        touchInfo.touchEventSupported = true;
    } catch (error) {}

    return touchInfo;
}