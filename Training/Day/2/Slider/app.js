Ext.onReady(function () {
    
    Ext.create('Ext.slider.Single', {
        width: '100%',
        minValue: 0,
        maxValue: 100,
        useTips: true,
        increment: 5,
        renderTo: Ext.getBody()
    });
    Ext.create('Ext.slider.Multi', {
        width: '100%',
        minValue: 0,
        values: [25, 50, 75],
        increment: 5,
        maxValue: 100,
        renderTo: Ext.getBody()
    });
});