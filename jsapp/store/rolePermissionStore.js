/*
 * File: jsapp/store/courseStore.js
 */

Ext.define('MyApp.store.filePermissionStore', {
	extend : 'Ext.data.Store',
	requires : ['MyApp.model.rolePermissionModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			autoLoad : false,
			autoSync : true,
			remoteFilter : true,
			model : 'MyApp.model.rolePermissionModel',
			proxy : {
				type : 'ajax',
				method : 'POST',
				//url: 'data/DataList.php',
				api : {
					read : 'data/DataList.php',
					create : 'data/DataList.php/users/create',
					update : 'data/contentUpdate.php?update=CategoryUpdate',
					destroy : 'data/DataList.php/destroy'
				},
				extraParams : {
					module : 'rolePermission',
					display : 'list'
				},
				reader : {
					type : 'json',
					idProperty: 'id',
					successProperty : 'success',
					messageProperty : 'message',
					totalProperty : 'total',
					root : 'data'
				},
				writer : {
					type : 'json',
					writeAllFields : true,
					root : 'data'
				}
				/*listeners : {
					write : function(store, operation, opts) {
						console.log("store write");
						store.load();
					},
					update : function(store, record, operation, opts) {
						console.log(store);
						console.log("store update");
						store.load();
					},
					add : function(store, records, index, opts) {
						console.log("storre update");
						store.load();
					}
				}*/
			}
		}, cfg)]);
	}
});

/*storeId: 'useraccesscategorystore',*/