/*
 * File: jsapp/store/courseStore.js
 */

Ext.define('MyApp.store.userAccessCourseStore', {
    extend: 'Ext.data.Store',
    requires: [
       'MyApp.model.userAccessCourseModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: false,
            model: 'MyApp.model.userAccessCourseModel',
            proxy: {
                type: 'ajax',
                method: 'GET',
                url: 'data/DataList.php',
                extraParams: {
                    module: 'accessCourse',
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