function printTsToGeneralString(ts) {
    if (ts == -1) {
        generalString += "ts,0,;"
        return
    }

    generalString += "ts,0," + ts.toString(16) + ";"
    console.log(generalString)
}