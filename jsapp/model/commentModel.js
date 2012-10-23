/*
 * File: jsapp/model/courseModel.js
 */

Ext.define('MyApp.model.commentModel', {
    extend: 'Ext.data.Model',
    fields: [
    	{name : 'content_id', type : 'int'},
        {name: 'topic_id', type: 'string'},	
        {name: 'content_text', type: 'string'},
        {name: 'created_date', type: 'string'},
        {name: 'user_email', type: 'string'}        
    ]
});
