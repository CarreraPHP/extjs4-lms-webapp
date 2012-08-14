/*
 * File: jsapp/store/courseStore.js
 */

Ext.define('MyApp.store.addCourseStore', {
    extend: 'Ext.data.Store',
	requires: [
       'MyApp.model.addCourseModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'SabCourseStore',
            model: 'MyApp.model.addCourseModel',
            proxy: {
                type: 'ajax',
                url: 'data/DataList.php',
                params:{
                	module: 'course',
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
