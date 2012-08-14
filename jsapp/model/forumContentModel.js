/*
 * File: jsapp/model/courseModel.js
 */

Ext.define('MyApp.model.forumContentModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},	
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {name : 'text', type : 'string'},
        {name : 'type_id', type : 'int'},
        {name: 'topic_id', type: 'string'},
        {name: 'course_id', type: 'string'},
        
    ]
});
