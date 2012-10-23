Ext.onReady(function () {
    Ext.create('Ext.panel.Panel', {
        width: 800,
        height: 600,
        title: 'Border Layout',
        layout: 'border',
        items: [{
            title: 'South Region is resizable',
            region: 'south',
            xtype: 'panel',
            height: 200,
            split: true,
            bodyPadding : 5,
            html : 'some content here..',
            margins: '0 5 5 5'
        }, {
            title: 'West Region is collapsible',
            region: 'west',
            xtype: 'panel',
            margins: '5 5 0 5',
            width: 200,
            height : 600,
            collapsible: true,
            bodyPadding : 5,
            html : 'some content here',
            id: 'west-region-container',
            layout: 'fit'
        }, {
            title: 'Center Region',
            region: 'center',
            xtype: 'panel',
            layout: 'fit',
            bodyPadding : 5,
            html : 'some content here',
            margins: '5 5 0 0'
        }],
        renderTo: Ext.getBody()
    });
});
