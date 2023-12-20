generalString = ""

window.onload = function(event) {
    getAndSaveFirstTimeStamp();
    generalString += "ncip,0," + getTimeStampS() + ",2,1;"
    printTsToGeneralString(-1)
}