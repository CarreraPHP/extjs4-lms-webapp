Ext.define('MyApp.view.dBoardColumnComponent', {
    extend: 'Ext.container.Container',
    alias: 'widget.dboardcolumn',
    defaultType: 'dboardportlet',
    border: false,
    layout: {
        type: 'anchor'
    },
    cls: 'x-portal-column',
    autoHeight: true,
    initComponent : function() {
        var me = this;
        me.callParent(arguments);
    }
});