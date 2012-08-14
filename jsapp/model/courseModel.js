/*
 * File: jsapp/model/courseModel.js
 */

Ext.define('MyApp.model.courseModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'path', type: 'string'},
        {name: 'leaf', type: 'boolean'},
        {name: 'category_id', type: 'string'},
		{name: 'actual_category_id',type: 'string'},
		{name: 'category_name', type: 'string'},
		{name: 'actual_category_name', type: 'string'}
    ]
});
