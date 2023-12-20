function getMouseCoordinates(event) {
    var x = 0, y = 0;

    if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
    } else if (event.clientX || event.clientY) {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x: x, y: y };
}

function mouseData(a) {
    a || (a = window.event);
    var b = null;
    
    // Set 'b' to target if it is present, else set it to srcElement
    if (a.target) {
        b = a.target;
    } else if (a.srcElement) {
        b = a.srcElement;
    }

    // 3 is a text node
    if (3 == b.nodeType) {
        b = b.parentNode;
    }

    // Set 'c' to keyCode if it is present, else set it to which
    if (a.keyCode) {
        var c = a.keyCode;
    } else if (a.which) {
        c = a.which;
    }

    var d = false;

    // Check if 'a' has 'which' property, if true, set 'd' based on its value
    if (a.which) {
        d = 3 == a.which;
    } else if (a.button) {
        d = 2 == a.button;
    }

    var e = getMouseCoordinates(a);
    var q = {};
    q.a = a;
    q["b"] = b;
    q.c = d;
    q.d = c;
    q.e = e.x;
    q.f = e.y;

    return q;
}

function getPropertyFromObject(obj) {
    x = []
    if (!('b' in obj)) {
        return null;
    }

    if (typeof obj['b'].id === 'string' && obj['b'].id !== '') {
        return obj['b'].id;
    }

    if (typeof obj['b'].name === 'string' && obj['b'].name !== '') {
        return obj['b'].name;
    }

    let index = Array.prototype.slice.call(x).indexOf(obj['b']);
    return index >= 0 ? 'ndiprinput' + index : '';
}


document.addEventListener("mousemove", function(event) {
    var data = mouseData(event);
    info = getPropertyFromObject(data)
    // The three important values are data.e, data.f and info
    console.log(info);
});