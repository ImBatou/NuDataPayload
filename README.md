# Nudata web payload

## How Nudata web works

A JSON payload will be created and added in the headers called **Nds-Pmd**
This JSON is a list of fingerprinting data stringified and encrypted in ROT13 (it's just a Ceasar cipher)

Quick function in case you need it:
```js
function scrambleText(inputString) {
    var updatedString = inputString.replace(/[A-Za-z]/g, function(char) {
        var offset = char.toUpperCase() <= "M" ? 13 : -13;
        return String.fromCharCode(char.charCodeAt(0) + offset);
    });

    return updatedString;
}
```

## The variables

* **bd:** Check some screen info, full function : 
```js
innerWidth + ":" + innerHeight + ":" + window.outerWidth + ":" + window.outerHeight + ":" + screen.availWidth + ":" + screen.availHeight
```

* **jsv:** Just a string (ndjsStaticVersion in the js)
* **wv:** Just a string (ndsWidgetVersion in the js)
* **bp:** Hash of all the plugins
```js
customHash(getPluginInfo().toString())
```
* **sr:** Resolution + colorDepth
```js
screen.width + "x" + screen.height + " " + screen.colorDepth
```

* **didtz:** Timezone
```js
getDeviceTimezone()
```

* **wkr:** Random number between 100 and 1000000
```js
Math.floor(1000000 * Math.random()) + 1000
```

* **flv:** is flash installed (Should always be false on new browsers)
* **fv:** Get video types supported
```js
supportedVideoFormats()
```

* **fv:** Get audio types supported
```js
getSupportedAudioFormats()
```

* **hf:** Hash of a html canva created
```js
customHash(generateCanvasImage())
```

* **pl:** Navigator platform
```js
navigator.platform
```

* **ft:** Tactile
```js
detectTouchCapabilities()
```

* **fc:**  Check cookies, should both be true if new browser
```js
checkCookiesSupport()
```

* **fs:** Check if window.localStorage works
```js
checkLocalStorage()
```

* **wg:** Hash of webgl info
```js
customHash(JSON.stringify(getWebGLInfo()))
```

* **fm:** Hash of font fingerprint
```js
customHash(measureTextWidths())
```

* **ic:** Don't know for now

* **wt:** is at the bottom litteraly called "wt"