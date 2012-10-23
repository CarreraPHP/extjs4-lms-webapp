Ext.define('App.store.CatalogTreeStore', {
	extend: 'Ext.data.TreeStore',
	requires: [
	'App.model.CatalogTreeModel'
	],
	autoLoad: true,
	constructor: function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({			
			storeId: 'CatalogTreeStore',
			model: 'App.model.CatalogTreeModel',      
			proxy: {
				type: 'ajax',
				url: 'data/Catalog.php?page=TrainingCatalog&resType=tree',
				reader: {
					type: 'json',
					root: 'children'
				}
			},
			folderSort: true,
			sorters: [{
				property: 'text',
				direction: 'ASC'
			}]
		}, cfg)]);
	}
});
