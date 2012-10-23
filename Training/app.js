
Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    views: [ 'applicationBase' ],
    appFolder: 'app',
    autoCreateViewport: true,
    name: 'App',
    controllers: ['wsControl'],
    launch: function() {
    	
    }
});

