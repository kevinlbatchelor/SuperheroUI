/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
    return new Angular2App(defaults, {
        vendorNpmFiles: [
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'zone.js/dist/**/*.+(js|js.map)',
            'es6-shim/es6-shim.js',
            'reflect-metadata/**/*.+(js|js.map)',
            'rxjs/**/*.+(js|js.map)',

            'lodash/lodash.js',
            'd3/d3.js',
            'moment/moment.js',

            '@angular/**/*.+(js|js.map)'
        ]
    });
};
