/*
 * File: jsapp/store/courseStore.js
 */

Ext.define('MyApp.store.newRuleCategoryStore', {
    extend: 'Ext.data.Store',
    requires: [
       'MyApp.model.newRuleCategoryModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: false,
            groupField: 'role_name',
            model: 'MyApp.model.newRuleCategoryModel',
            proxy: {
                type: 'ajax',
                method: 'GET',
                url: 'data/DataList.php',
                extraParams: {
                	module : 'accessAllCategories',
                    display: 'list'
                },
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});



/*storeId: 'useraccesscategorystore',*/