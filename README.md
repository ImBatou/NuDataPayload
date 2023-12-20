# Nudata web payload (WIP)

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
Always the same, could be different if N was different but for now never met a case where that happened
```js
d = 0
c = "de"
N = ""
Z = 25

N = 0 < Z && N.length > Z ? d.toString(16) + "," + wa + ";0," + c + ";" : N + (d.toString(16) + "," + c + ";");
```

### wt:
is at the bottom litteraly called "wt"




## The more complex part (ipr)

Now that we know the "easy" variable the is one missing called **ipr**

Ipr follow the same principle each time, it is a list of action, each starting with their name and ending with a semicolon **;**

The list of possible actions are those (that I found in the file if you found others please tell me):
**ncip***, st, mms, so, **ff***, kd, ku, **kk***, fb, **mc***, or, gy, ac, lac, te, **mm***

The one not in bold are the actions that I did not meet and so do not explain here, if you happen to find a page using one of those, please contact me and send me the link

### ncip
ncip is **always** the first action in the list

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

### ts
ts is for "TimeStamp" and will be an important one because it follows a lot of the next payload that we will talk about

* The name
* The time (in ms) difference between this one and the precedent action in hexa, but because this action is right next to a precedent one, this should always be 0
* The time (in ms) difference between this one and the creation of the ncip
*Example*
```
ts,0,128be;
```

Be careful, on the first ts for the ncip, you should not put 0 on the third value but nothing
*Example*
```
ncip,0,658262b7,2,1;ts,0,;
```

### mm
mm is for "MouseMovement":

* The name
* The time (in ms) difference between this one and the precedent action in hexa
* The x value in hexa (data.e in my example)
* The y value in hexa (data.f)
* The id of where you are moving on
*Example*
```
mm,121d3d,f2,c7,Main;
```

This payload is usually followed by a ts one

### mc
mc is for "MouseClick":

* The name
* The time (in ms) difference between this one and the precedent action in hexa
* The x value in hexa (data.e in my example)
* The y value in hexa (data.f)
* The id of where you are moving on
*Example*
```
mc,625c,80,fe,email[objectobject]__input
```

This payload is usually followed by a ts one

### kk
The first payload for the "Focus" event:

* The name
* The time (in ms) difference between this one and the precedent action in hexa
* The length of the input where the focus is done (if nothing in the input yet : 0)
* The id of where you are moving on

*Example with test in the input box*
```
kk,18bee,4,email[objectobject]__input;
```

This payload is usually followed by a ts one

### ff
ff is the second event of the "Focus" event:

* The name
* The time (in ms) difference between this one and the precedent action in hexa
* The id of where you are moving on
*Example*
```
ff,3f88,email[objectobject]__input;
```

This payload is usually followed by a ts one