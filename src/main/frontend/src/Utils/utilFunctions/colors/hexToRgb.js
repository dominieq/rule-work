function hexToRgb(hex, opacity) {
    let r = 0, g = 0, b = 0;
    let result;

    if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }

    if (opacity != null) {
        result = `rgb(${+r}, ${+g}, ${+b}, ${opacity})`;
    } else {
        result = `rgb(${+r}, ${+g}, ${+b}, ${opacity})`;
    }

    return result;
}

export default hexToRgb;