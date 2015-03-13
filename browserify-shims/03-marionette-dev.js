var
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    Radio = require('backbone.radio');

window.Backbone = Backbone;

if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}

Radio.DEBUG = true;
