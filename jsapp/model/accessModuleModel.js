/*
 * File: jsapp/model/userRoleModel.js
 */

Ext.define('MyApp.model.accessModuleModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
		{name: 'id', type: 'int'},
		{name: 'C', type: 'string'},
		{name: 'R', type: 'string'},
		{name: 'U', type: 'string'},
		{name: 'D', type: 'string'},
		{name: 'P', type: 'string'},
	]
});
