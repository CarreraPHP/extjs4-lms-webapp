/*
 * File: app.js
 */

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    views: [ 'applicationBase' ],
    appFolder: 'jsapp',
    autoCreateViewport: true,
    name: 'MyApp',
    controllers: [ 'abControl', 'wsControl', 'accessControl'],
    launch: function() {
    	
    }
});

