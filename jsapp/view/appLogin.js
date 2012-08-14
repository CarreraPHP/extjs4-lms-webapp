Ext.define('MyApp.view.appLogin', {
	extend : 'Ext.form.Panel',
	alias : 'widget.applogin',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	requires : ['AL.view.appLoginView', 'AL.view.appModuleView'],
	padding : 5,
	layout : {
		type : 'border'
	},

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'container',
				itemId : 'app-login',
				activeItem : 'app-login-view-card',
				layout : {
					type : 'card'
				},
				region : 'center',
				split : true,
				items : [{
					xtype : 'apploginview',
					itemId : 'app-login-view-card',
					width : 150
				}, {
					xtype : 'appmoduleview',
					itemId : 'app-module-view-card'
				}]
			}]
		});

		me.callParent(arguments);
	}
});