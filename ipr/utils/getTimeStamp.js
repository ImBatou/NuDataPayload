lastTs = 0
firstTs = 0

function getTimeStampS() {
    date = parseInt((new Date).getTime() / 1000, 10)
    return Math.round(date).toString(16)
}

function getTimeStampMs() {
  date = parseInt((new Date).getTime(), 10)
  rounded = Math.round(date)
  return rounded
}

function doDiffAndSave(ts) {
    diff = (ts - lastTs).toString(16)
    lastTs = ts
    console.log(diff)
    return diff
}

function doDiffSiceStart(ts) {
    diff = (ts - firstTs).toString(16)
    return diff
}

function getAndSaveFirstTimeStamp() {
    ts = getTimeStampMs()
    firstTs = ts
    lastTs = ts
}