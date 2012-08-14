/*
 * File: jsapp/store/courseStore.js
 */

Ext.define('MyApp.store.CategoryStore', {
    extend: 'Ext.data.Store',
	requires: [
       'MyApp.model.categoryModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'SabCategoryStore',
            model: 'MyApp.model.categoryModel',
            proxy: {
                type: 'ajax',
                method: 'GET',
                url: 'data/DataList.php',
                extrParams:{
                	module: 'category',
                	display: 'list'
                },             
                reader: {
                    type: 'json',
                    idProperty: 'name'
                }
            }
        }, cfg)]);
    }
});
