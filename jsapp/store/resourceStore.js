Ext.define('MyApp.store.resourceStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.resourceModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	storeId: 'ResourceStore',
            model: 'MyApp.model.resourceModel',
            data: [
                [
                    1,
                    'html'
                ],
                [
                    2,
                    'pdf'
                ],
                [
                    3,
                    'image'
                ]
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'array'
                }
            }
        }, cfg)]);
    }
});