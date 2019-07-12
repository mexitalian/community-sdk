/**
This example will stream a single color pixel to Pixel Kit.
*/
const DeviceManager = require('../communitysdk').DeviceManager;
const PixelKit = require('../communitysdk').RetailPixelKit;
const { COLOR_LIMIT, COLUMNS, ROWS } = require('../src/const');

const randomInt = (int) => Math.ceil(Math.random() * int); // index beings at 1
const randomColorInt = () => randomInt(COLOR_LIMIT);
const toHex = (int) => `#${int.toString(16)}`;
const randomColorHex = () => toHex(randomColorInt());

const getRandomPixel = () => {
    /**
     * Generates a random x, y, and color pixel
     * @return {array}
     */
    const x = randomInt(COLUMNS)
    const y = randomInt(ROWS)
    color = randomColorHex()
    return [x, y, color]
}

DeviceManager.listConnectedDevices()
.then((devices) => {
    // Filter devices to find a Pixel Kit
    let rpk = devices.find((device) => {
        return device instanceof PixelKit;
    });
    if(!rpk) {
        console.log('No Pixel Kit was found :(');
    } else {
        console.log('Pixel Kit found!');
        /*
        A frame is an array of 128 hexadecimal colors prefixed with `#`.
        We'll create a single color frame (all the pixels with the same
        color) to stream to Pixel Kit.
        */
        // let frame = [];
        // for(let i = 0; i < 128; i++) {
        //     frame.push('#ffff00'); // Yellow frame!
        // }
        /*
        We will send a frame every 100 milliseconds to Pixel Kit (10 frames
        per second). It's important to keep sending frames to the Pixel Kit,
        otherwise it will go back to the mode it was before.
        */
        console.log('Streaming frame.');
        setInterval(() => {
            const pixels = [getRandomPixel()];
            rpk.streamPixels(pixels)
                .catch((error) => {
                    console.log('Problem streaming frame', error);
                });
        }, 100);
    }
});
