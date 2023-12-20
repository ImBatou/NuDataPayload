function getPluginInfo() {
    var pluginArray = [];
    var versionRegex = /([0-9]+)\.[0-9|.]+/g;

    if (window.ActiveXObject) {
        // Internet Explorer
        if (document.plugins && document.plugins.length > 0) {
            for (var i = 0; i < document.plugins.length; i++) {
                var pluginSrc = document.plugins[i].src;
                var version = pluginSrc.replace(versionRegex, "$1");
                pluginArray.push(version);
            }
        }
    } else {
        // Other browsers
        try {
            if (navigator.plugins && navigator.plugins.length > 0) {
                for (var j = 0; j < navigator.plugins.length; j++) {
                    var pluginName = navigator.plugins[j].name;
                    var version = pluginName.replace(versionRegex, "$1");
                    pluginArray.push(version);
                }
            }
        } catch (e) {
            // Catching any exceptions and adding "denied" to the array
            pluginArray.push("denied");
        }
    }

    // Sort the plugin versions if any are collected
    if (pluginArray.length > 0) {
        pluginArray.sort();
    }

    // Concatenate the sorted plugin versions into a string
    var result = "p";
    for (var k = 0; k < pluginArray.length; k++) {
        result += "," + pluginArray[k];
    }

    return result;
}