Ext.define('MyApp.store.commentStore', {
	extend : 'Ext.data.Store',
	requires : ['MyApp.model.commentModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			autoLoad : false,
			autoSync : false,
			model : 'MyApp.model.commentModel',
			proxy : {
				type : 'ajax',
				method : 'POST',
				//url: 'data/DataList.php',
				api : {
					read : 'data/DataList.php',
					create : 'data/DataList.php/users/create',
					update : 'data/contentUpdate.php?update=update',
					destroy : 'data/DataList.php/destroy'
				},
				extraParams : {
					module : 'forumSelectedTopic',
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
						console.log("storre write");
						store.load();
					},
					update : function(store, record, operation, opts) {
						console.log("storre update");
						store.load();
					},
					add : function(store, records, index, opts) {
						console.log("storre update");
						store.load();
					}
				}
			}
		}, cfg)]);
	}
});