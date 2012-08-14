/*
 * File: jsapp/model/courseModel.js
 */

Ext.define('MyApp.model.searchcontentModel', {
    extend: 'Ext.data.Model',
    fields: [
           {name: 'id', mapping: 'id'},
            {name: 'name', mapping: 'name'},
            {name: 'description', mapping: 'description'},
         	{name: 'text', type: 'string'},
         	{name: 'type_id', type: 'int'},
         	{name: 'type', type: 'string'},
         	{name: 'topic_id', type: 'int'},
         	{name: 'topic_name', type: 'string'},
        	{name: 'topic_description', type: 'string'},
        	{name: 'course_name', type: 'string'},
        	{name: 'course_description', type: 'string'},
        	{name: 'course_id', type: 'string'}

    ]
});
