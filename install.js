/*
 * File: designer.js
 */

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    views: [ 'appLogin' ],
    appFolder: 'install',
    autoCreateViewport: true,
    name: 'AL',
    controllers: [ 'alControl'],
    launch: function() {
    	
    }
});

