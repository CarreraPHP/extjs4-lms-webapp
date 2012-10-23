Ext.onReady(function () {
	var model = Ext.define('Ext.custom.data.Model', {
		extend: 'Ext.data.Model',
		fields: [{
			name: 'id',
			type: 'int'
		},{
			name: 'name',
			type: 'string'
		},{
			name: 'leaf',
			type: 'boolean'
		},{
			name: 'expanded',
			type: 'boolean'
		},{
			name: 'parent',
			type: 'int'
		}]
	});

	var store = Ext.create('Ext.data.TreeStore', {
		autoLoad: true,
		storeId: 'CatalogTreeStore',
		model: model,
		proxy: {
			type: 'ajax',
			url: '../../../data/Catalog.php?page=TrainingCatalog&resType=tree',
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
	});

	Ext.create('Ext.tree.Panel', {
		title: 'Tree Layout',
		width: 450,
		height: 600,
		store: store,
		rootVisible: false,
		displayField : 'name',
		renderTo: Ext.getBody()
	});
});