var _ = require("underscore");

var envs = {
    unknown: function() {
        return {};
    },
    base: function() {
        return {
            port: 80,
            staticCache: 3200,
            webroot: './public'
        };
    },
    development: function() {
        return {
            staticCache: 0
        };
    },
    production: function() {
        return {};
    }
};

var config = function() {
    var env = process.env.NODE_ENV || "development";
    if (!envs[env]) {
        env = "unknown";
    }
    console.log("Configuration: " + env);
    return _.extend(envs.base(), envs[env]());
};

module.exports = config;