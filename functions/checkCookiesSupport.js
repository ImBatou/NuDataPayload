function checkCookiesSupport(mode) {
    var supportsThirdPartyCookies = true;
    var supportsNavigatorCookies = typeof navigator.cookieEnabled !== 'undefined' && navigator.cookieEnabled ? true : false;

    if (mode === 1) {
        try {
            document.cookie = "ncookietest=1; SameSite=None; Secure";
            supportsThirdPartyCookies = document.cookie.indexOf("ncookietest=1") !== -1;
            document.cookie = "ncookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT; SameSite=None; Secure";
        } catch (error) {}
    }

    return {
        thirdPartyCookies: supportsThirdPartyCookies, //tc
        navigatorCookies: supportsNavigatorCookies //nc
    };
}