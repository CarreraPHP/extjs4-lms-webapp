/*
 * File: jsapp/model/userRoleModel.js
 */

Ext.define('MyApp.model.accessTCModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
        	name: 'first_name',
        	type: 'string'
        },{
        	name : 'last_name',
        	type : 'string'
        },{
        	name: 'user_id',
        	type: 'int'
        },{
        	name: 'C',
        	type: 'string'
        },{
        	name: 'R',
        	type: 'string'
        },{
        	name: 'U',
        	type: 'string'
        },{
        	name: 'D',
        	type: 'string'
        },{
        	name: 'P',
        	type: 'string'
        },{
        	name : 'user_role_id',
        	type : 'int'
        },
        {
        	name : 'module_sub_id',
        	type : 'int',
        },
        {
        	name : 'module_id',
        	type : 'int',
        }
	]
});
