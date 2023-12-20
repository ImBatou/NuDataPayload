document.addEventListener("mousemove", function(event) {
    var data = mouseData(event);
    info = getEventPosition(data);
    if (info == "") {
        return
    }
    ts = getTimeStampMs()
    generalString += "mm," + doDiffAndSave(ts) + "," + data.e + "," + data.f + "," + info + ";"
    printTsToGeneralString(ts)
});