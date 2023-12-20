document.addEventListener("focus", function(event) {
    var data = mouseData(event);
    info = getEventPosition(data);
    if (info == "") {
        return
    }
    length = "b" in data && "undefined" !== typeof data["b"].value ? data["b"].value.length : null
    ts = getTimeStampMs()
    generalString += "kk," + doDiffAndSave(ts) + "," + length + "," + info + ";"
    printTsToGeneralString(ts)

    ts = getTimeStampMs()
    generalString += "ff," + doDiffAndSave(ts) + "," + info + ";"
});