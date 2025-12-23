// jest.setup.js
const $ = require('jquery'); // On remplace "import" par "require"
global.jQuery = global.$ = $;

// Mock des fonctions globales utilisées par HTML5 UP
global.breakpoints = jest.fn();
global.breakpoints.on = jest.fn();
global.browser = {
    name: 'chrome',
    mobile: false,
    canUse: jest.fn(() => true)
};

// Mock du plugin Poptrox
$.fn.poptrox = jest.fn().mockReturnValue($({}));