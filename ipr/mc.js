document.addEventListener("click", function(event) {
    var data = mouseData(event);
    info = getEventPosition(data);
    if (info == "") {
        return
    }
    ts = getTimeStampMs()
    generalString += "mc," + doDiffAndSave(ts) + ",", data.e + "," + data.f + "," + info + ";"
    printTsToGeneralString(ts)
});