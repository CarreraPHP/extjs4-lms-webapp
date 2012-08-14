/*
 * File: jsapp/model/courseModel.js
 */

Ext.define('MyApp.model.searchModel', {
    extend: 'Ext.data.Model',
    fields:  [
            {name: 'id', mapping: 'id'},
            {name: 'name', mapping: 'name'},
            {name: 'description', mapping: 'description'}
        ]
});
