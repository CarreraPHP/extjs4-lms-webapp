/*
 * File: jsapp/store/TopicStore.js
 */

Ext.define('MyApp.store.addTopicStore', {
    extend: 'Ext.data.Store',
	requires: [
       'MyApp.model.addTopicModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'SabTopicStore',
            model: 'MyApp.model.addTopicModel',
            proxy: {
                type: 'ajax',
                url: 'data/DataList.php',
                params:{
                	module: 'topic',
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
