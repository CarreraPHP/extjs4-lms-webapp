Ext.define('MyApp.view.ContentQuizView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.contentquizview',
    mixins : {
        moduleLayout : 'MyApp.mixin.ModuleLayout'
    },
    layout : {
        type : 'card'
    },
    SelectedRecord : {},
    autoScroll : false,
    itemId : 'single-choice',
    initComponent : function() {
        var me = this;
        Ext.applyIf(me, {
            items : [],
            dockedItems : [{
                xtype : 'toolbar',
                dock : 'top',
                pack : 'start',
                items : [{
                    xtype : 'button',
                    text : 'Back',
                    iconCls : 'back-button'
					
                }]
            }]
        });

        me.callParent(arguments);
    }
});
