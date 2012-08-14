/*
 * File: jsapp/model/userRoleModel.js
 */

Ext.define('MyApp.model.courseAccessModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'id',
            type: 'int'
        },
        {
        	name : 'course_id',
        	type : 'string'
        }
	]
});
