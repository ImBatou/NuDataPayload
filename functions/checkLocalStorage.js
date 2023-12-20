function checkLocalStorage() {
    var a = !1;
    try {
        var b = window.localStorage;
        b.setItem("ndls", "ndls");
        b.removeItem("ndls");
        a = !0
    } catch (c) {}
    return a
}