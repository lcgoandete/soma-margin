const fs = require("fs");

function getRandomInt(min, max) {
    const a = Math.ceil(min);
    const b = Math.floor(max);
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function load_image(image) {
    const image_regex = RegExp('\.jpg$|\.png$|\.gif$|\.bmp$');
    const b64_regex = RegExp('^base64:');
    if (image_regex.test(image)) {
        return fs.readFileSync(image, {'encoding': 'base64'});
    } else if (b64_regex.test(image)) {
        return image.substring(7);
    } else {
        return image.toString('base64');
    }
}

function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

module.exports = {
    getRandomInt,
    load_image,
    wait
}