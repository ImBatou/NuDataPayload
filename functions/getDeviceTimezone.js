function getDeviceTimezone() {
    var a = (new Date(2014,0,2)).getTimezoneOffset()
      , b = (new Date(2014,5,2)).getTimezoneOffset();
    return Math.max(a, b)
}