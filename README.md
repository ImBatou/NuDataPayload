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

### bd
Check some screen info, full function : 
```js
innerWidth + ":" + innerHeight + ":" + window.outerWidth + ":" + window.outerHeight + ":" + screen.availWidth + ":" + screen.availHeight
```

### jsv
Just a string (ndjsStaticVersion in the js)

### wv
Just a string (ndsWidgetVersion in the js)

### bp
Hash of all the plugins
```js
customHash(getPluginInfo().toString())
```

### sr
Resolution + colorDepth
```js
screen.width + "x" + screen.height + " " + screen.colorDepth
```

### didtz
Timezone
```js
getDeviceTimezone()
```

### wkr
Random number between 100 and 1000000
```js
Math.floor(1000000 * Math.random()) + 1000
```

### flv
Check if flash installed (Should always be false on new browsers)

### fv
Get video types supported
```js
supportedVideoFormats()
```

### fv
Get audio types supported
```js
getSupportedAudioFormats()
```

### hf
Hash of a html canva created
```js
customHash(generateCanvasImage())
```

### pl
Navigator platform
```js
navigator.platform
```

### ft
Tactile capabilities
```js
detectTouchCapabilities()
```

### fc
Check cookies, should both be true if new browser
```js
checkCookiesSupport()
```

### fs
Check if window.localStorage works
```js
checkLocalStorage()
```

### wg
Hash of webgl info
```js
customHash(JSON.stringify(getWebGLInfo()))
```

### fm
Hash of font fingerprint
```js
customHash(measureTextWidths())
```

### ic
Don't know for now

### wt:
is at the bottom litteraly called "wt"




## The more complex part (ipr)

Now that we know the "easy" variable the is one missing called **ipr**

Ipr follow the same principle each time, it is a list of action, each starting with their name and ending with a semicolon **;**

The list of possible actions are those (that I found in the file if you found others please tell me):
st, mms, so, ff, kd, ku, kk, ff, fb, **mc**, or, gy, ac, lac, te, **mm**

The one not in bold are the actions that I did not meet and so do not explain here, if you happen to find a page using one of those, please contact me and send me the link


* It always starts with a hard coded part
```
ncip,0,
```
* After that the actual epoch timestamp (in s) in hexadecimal
```js
date = parseInt((new Date).getTime() / 1000, 10)
hexa = Math.round(date).toString(16)
```
* Another hardcoded part (it's not hardcoded but it never change for the first time)
```
,2,1;
```

* Now you should have the first action
*Example*
```
ncip,0,658262b7,2,1;
```

### mm
mm is for "MouseMovement" the payload is constitued of four parts:

* The name
* The time (in ms) difference between this one and the precedent action in hexa
* The x value in hexa (data.e in my example)
* The y value in hexa (data.f)
* The id of where you are moving on
*Example*
```
mm,121d3d,f2,c7,Main;
```