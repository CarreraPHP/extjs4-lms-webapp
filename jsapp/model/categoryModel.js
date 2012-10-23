Ext.define('MyApp.model.categoryModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'instanceid',
            type: 'string',
			mapping: 'id'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'path',
            type: 'string'
        },{
            name: 'parent_id',
            type: 'int'
        },{
            name: 'actual_parent_id',
            type: 'int'
        },{
            name: 'parent_name',
            type: 'string'
        },{
            name: 'actual_parent_name',
            type: 'string'
        }
    ]
});
