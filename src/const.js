const COLOR_LIMIT = 16777215;
const COLUMNS = 16;
const ROWS = 8;
const PIXEL_COUNT = COLUMNS * ROWS;
const OFF = '#000000';
const BLANK_SCREEN = Array.apply(null, { length: PIXEL_COUNT }).map(() => OFF);

module.exports = {
    COLOR_LIMIT, COLUMNS, ROWS, PIXEL_COUNT, OFF, BLANK_SCREEN
}
