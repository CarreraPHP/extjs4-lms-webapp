
Ext.define('MyApp.store.categoryTreeStore', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'MyApp.model.categoryModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: false,
        	autoSync: false,
            storeId: 'CategoryTreeStore',
            model: 'MyApp.model.categoryModel',           
            proxy: {
                type: 'ajax',
                url: 'data/DataList.php?module=category&display=tree&type=json'                
            },
            folderSort: true,
            clearOnload: false,
            sorters: [{
                property: 'text',
                direction: 'ASC'
            }]
        }, cfg)]);
    }
});
