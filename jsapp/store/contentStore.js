Ext.define('MyApp.store.contentStore', {
	extend : 'Ext.data.Store',
	requires : ['MyApp.model.contentModel'],
	selectedCourse : 'cou10',
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			autoLoad : false,
			autoSync : true,
			remoteFilter : true,
			groupField : 'topic_sort' ,
			storeId : 'SabContentStore',
			model : 'MyApp.model.contentModel',
			remoteGroup : false,
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
					module : 'content',
					parent : me.selectedCourse
				},
				reader : {
					type : 'json',
					idProperty : 'id',
					successProperty : 'success',
					messageProperty : 'message',
					totalProperty : 'total',
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
