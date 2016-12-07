'use strict';

var prop = require('properties');
var Q = require('q');

function Config() {
    this._localPropertiesPath = './local.properties';
} 

Config.prototype.init = function() {
    var that = this;
    var deferred = Q.defer();
    // Q.allSettled([this._load(this._localPropertiesPath)])
    //     .spread()
}