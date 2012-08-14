/*
 * File: jsapp/model/userRoleModel.js
 */

Ext.define('MyApp.model.userRoleModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
		{name: 'id', type: 'int'}
	]
});
