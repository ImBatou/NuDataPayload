function customHash(inputString) {
    var hash1 = 0, hash2 = 0, charCode;

    if (inputString.length === 0)
        return "00000000";
    for (var i = 0; i < inputString.length; i++) {
        charCode = inputString.charCodeAt(i);
        if (i % 2 === 0) {
            hash1 = (hash1 << 5) - hash1 + charCode;
            hash1 |= 0;
        } else {
            hash2 = (hash2 << 5) - hash2 + charCode;
            hash2 |= 0;
        }
    }

    if (hash1 < 0)
        hash1 = 4294967295 + hash1 + 1;
    if (hash2 < 0)
        hash2 = 4294967295 + hash2 + 1;

    return hash1.toString(16) + hash2.toString(16);
}