/*
 * File: jsapp/model/courseModel.js
 */

Ext.define('MyApp.model.contentModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},	
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
		{name: 'text', type: 'string'},
        {name: 'type_id', type: 'int'},
        {name: 'topic_id', type: 'int'},
        {name: 'course_id', type: 'string'},
        {name: 'topicName', type: 'string'},
        {name: 'topicDescription', type: 'string'},
        {name: 'course_name', type: 'string'},
		{name: 'type', type: 'string'},
		{name: 'cls', type: 'string'},
		{name: 'content_sort', type: 'int'},
		{name: 'topic_sort', type: 'int'}
    ]
});
