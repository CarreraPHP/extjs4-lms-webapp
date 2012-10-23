/*
 * File: jsapp/model/courseModel.js
 */

Ext.define('MyApp.model.forumModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},	
        {name: 'name', type: 'string'},
        {name: 'user_email', type: 'string'},
		{name: 'description', type: 'string'},
        {name: 'created_date', type: 'string'},
        {name: 'course_id', type: 'string'}
        
        
    ]
});
