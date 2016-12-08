'use strict';

var prop = require('properties');
var Q = require('q');

function Config() {
    console.log('__dirname', __dirname);
    this._localPropertiesPath = __dirname + '/local.properties';
} 

Config.prototype.init = function() {
    var that = this;
    var deferred = Q.defer();
    Q.allSettled([this._load(this._localPropertiesPath)])
        .spread(function(localPropertiesRes) {
            // console.log('localPropertiesRes', localPropertiesRes);
            var foundLocal = (localPropertiesRes.state==='fulfilled');
            if (!foundLocal) {
                deferred.reject(localPropertiesRes.reason);
                return;
            }
            if (!localPropertiesRes.value) {
                localPropertiesRes.value = {};
            }
            that.configs = localPropertiesRes.value;
            that.configs.buildNumber = new Date().getTime();
            deferred.resolve(that.configs);
        }).done();
    return deferred.promise;
};

Config.prototype._load = function (path) {
    var deferred = Q.defer();
    prop.parse(path, {path: true, sections: true}, function(error, data) {
        // console.log('_load data', data);
        // console.log('_load error', error);
        if (error) {
            console.warn('Load File' + path + 'error!', error);
            deferred.reject(error);
            return;
        }
        deferred.resolve(data);
    });
    return deferred.promise;
};

module.exports = new Config();