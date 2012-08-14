/*
 * File: jsapp/view/loginView.js
 *
 */

Ext.define('MyApp.view.loginView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.loginview',
	frame : true,
	itemId : '',
	layout : {
		align : 'stretch',
		type : 'hbox'
	},

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'container',
				flex : 0.3
			}, {
				xtype : 'container',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				flex : 1,
				items : [{
					xtype : 'container',
					flex : 1
				}, {
					xtype : 'form',
					border : 4,
					frame : true,
					bodyBorder : true,
					bodyPadding : 10,
					title : lang.Login,
					flex : 1,
					items : [{
						xtype : 'fieldset',
						padding : 10,
						title : lang.Enteryourcredentials,
						items : [{
							xtype : 'textfield',
							fieldLabel : lang.username,
							anchor : '100%',
							name : 'username',
							enableKeyEvents : true,
							allowBlank : false
						}, {
							xtype : 'textfield',
							inputType : 'password',
							fieldLabel : lang.password,
							anchor : '100%',
							name : 'password',
							enableKeyEvents : true,
							allowBlank : false
						}]
					}],
					dockedItems : [{
						xtype : 'toolbar',
						dock : 'bottom',
						layout : {
							pack : 'end',
							type : 'hbox'
						},
						items : [{
							xtype : 'button',
							itemId: 'login',
							text : lang.login,
							iconCls : 'submit-button',
							disabled : true,
							formBind : true
						}, {
							xtype : 'button',
							itemId: 'register',
							iconCls : 'register-button',
							text : lang.register,
							disabled : true,
							formBind : true
						}]
					}]
				}, {
					xtype : 'container',
					flex : 1
				}]
			}, {
				xtype : 'container',
				maintainFlex : true,
				flex : 0.3
			}]
		});

		me.callParent(arguments);
	}
});
