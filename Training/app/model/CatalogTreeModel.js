Ext.define('App.model.CatalogTreeModel', {
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
		name: 'parent_id',
		type: 'int'
	},{
		name: 'parent',
		type: 'string'
	}]
});