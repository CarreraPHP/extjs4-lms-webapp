/*
 * File: jsapp/store/courseStore.js
 */

Ext.define('MyApp.store.newRuleCourseStore', {
    extend: 'Ext.data.Store',
    requires: [
       'MyApp.model.newRuleCourseModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: false,
            groupField: 'role_name',
            model: 'MyApp.model.newRuleCourseModel',
            proxy: {
                type: 'ajax',
                method: 'GET',
                url: 'data/DataList.php',
                extraParams: {
                	module : 'accessAllCourse',
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