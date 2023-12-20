function getWebGlInfo() {
    var webGLInfo = {};
    var canvas = document.createElement("canvas");
    var contextNames = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
    var context;

    for (var i = 0; i < contextNames.length; i++) {
        try {
            context = canvas.getContext(contextNames[i]);
            if (context) {
                webGLInfo.ContextName = contextNames[i];
                break;
            }
        } catch (error) {}
    }

    if (!(context && "getParameter" in context)) {
        return null;
    }

    var properties = "VENDOR VERSION RENDERER SHADING_LANGUAGE_VERSION DEPTH_BITS MAX_VERTEX_ATTRIBS MAX_VERTEX_TEXTURE_IMAGE_UNITS MAX_VARYING_VECTORS MAX_VERTEX_UNIFORM_VECTORS MAX_COMBINED_TEXTURE_IMAGE_UNITS MAX_TEXTURE_SIZE MAX_CUBE_MAP_TEXTURE_SIZE NUM_COMPRESSED_TEXTURE_FORMATS MAX_RENDERBUFFER_SIZE MAX_VIEWPORT_DIMS ALIASED_LINE_WIDTH_RANGE ALIASED_POINT_SIZE_RANGE".split(" ");

    for (var j = 0; j < properties.length; j++) {
        var propertyName = properties[j];
        if (propertyName in context) {
            webGLInfo[propertyName] = context.getParameter(context[propertyName]);
        }
    }

    return webGLInfo;
}