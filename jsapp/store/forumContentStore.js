Ext.define('MyApp.store.forumContentStore', {
	extend : 'Ext.data.Store',
	requires : ['MyApp.model.forumContentModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			autoLoad : false,
			autoSync : true,
			storeId : 'SabforumStore',
			model : 'MyApp.model.forumContentModel',
			proxy : {
				type : 'ajax',
				method : 'POST',
				//url: 'data/DataList.php',
				api : {
					read : 'data/DataList.php',
					//create : 'data/DataList.php/users/create',
					update : 'data/contentUpdate.php?update=update',
					//destroy : 'data/DataList.php/destroy'
				},
				extraParams : {
					module : 'forumContent',
				},
				reader : {
					type : 'json',
					idProperty : 'id',
					root : 'data'
				},
				writer : {
					type : 'json',
					writeAllFields : true,
					root : 'data'
				},
				listeners : {
					write : function(store, operation, opts) {
						store.load();
					},
					update : function(store, record, operation, opts) {
						store.load();
					},
					add : function(store, records, index, opts) {
						store.load();
					}
				}
			}
		}, cfg)]);
	}
});