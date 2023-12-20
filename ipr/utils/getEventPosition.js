function getEventPosition(obj) {
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