Ext.define('App.view.DayOneView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.dayoneview',
    //store : 'contentStore',
    sortableColumns : false,
    requires : [],
    layout : 'border',
    initComponent : function() {
        var me = this;
        Ext.applyIf(me, {
            items : [{
                xtype: 'panel',
                region : 'east',
                title : 'East Region',
                margin : '0 0 0 5',
                flex : 1,
                bodyPadding : 5,
                html : 'east region panel content here'
            },{
                xtype: 'panel',
                region : 'west',
                title : 'West Region',
                margin : '0 5 0 0',
                flex : 1,
                bodyPadding : 5,
                html : 'west region panel content here'
            },{
                xtype: 'panel',
                region : 'center',
                title : 'Center Region',
                flex : 1,
                bodyPadding : 5,
                html : 'center region panel content here'
            },{
                xtype: 'panel',
                region : 'north',
                title : 'North Region',
                margin : '0 0 5 0',
                flex : 1,
                bodyPadding : 5,
                html : 'north region panel content here'
            },{
                xtype: 'panel',
                region : 'south',
                title : 'South Region',
                margin : '5 0 0 0',
                flex : 1,
                bodyPadding : 5,
                html : 'south region panel content here'
            }]
        });
        me.callParent(arguments);
    }
});
