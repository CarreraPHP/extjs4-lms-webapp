Ext.define('MyApp.store.singleQuizStore', {
	extend : 'Ext.data.Store',
	requires : ['MyApp.model.singleQuizModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			autoLoad : false,
			autoSync : true,
			storeId : 'SabSingleQuizStore',
			model : 'MyApp.model.singleQuizModel',
			proxy : {
				type : 'ajax',
				method : 'POST',
				//url: 'data/DataList.php',
				api : {
					read : 'data/QuizData.php',
					create : 'data/DataList.php/users/create',
					update : 'data/contentUpdate.php?update=update',
					destroy : 'data/DataList.php/destroy'
				},
				extraParams : {
					module : 'quiz',
					type : 'single'
				},
				reader : {
					type : 'json',
					idProperty : 'que_id',
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