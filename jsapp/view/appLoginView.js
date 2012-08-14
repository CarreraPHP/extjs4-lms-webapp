Ext.define('MyApp.view.appLoginView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.apploginview',
	height : 500,
	layout : {
		type : 'fit'
	},
	title : lang.title.addTopic,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				autoScroll : true,
				bodyPadding : 10,
				items : [{
					xtype : 'textfield',
					fieldLabel : lang.name,
					labelWidth : 70,
					anchor : '100%',
					name : 'name',
					allowBlank : false
				}, {
					xtype : 'hiddenfield',
					name : 'course_id'
				}, {
					xtype : 'hiddenfield',
					name : 'page',
					value : 'topic'
				},{
					xtype : 'hiddenfield',
					name : 'id',
					value : 'new'
				}, {
					xtype : 'textfield',
					name : 'course',
					fieldLabel : lang.course,
					anchor : '100%',
					disabled : true,
					labelWidth : 70,
					anchor : '100%',

				}, {
					xtype : 'ckeditor',
					fieldLabel : lang.description,
					labelWidth : 70,
					anchor : '100%',
					name : 'description'
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
					text : lang.submit,
					formBind : true, //only enabled once the form is valid
					disabled : true,
					handler : function() {
						var form = this.up('form').getForm();
						var values = this.up('form').getValues();
						Ext.Ajax.request({
							url : 'data/SaveForm.php',
							method : 'post',
							params : values,
							scope : this,
							failure : function(response) {
								Ext.create('Ext.ux.window.Notification', {
									hideDuration : 500,
									autoHideDelay : 7000,
									slideInAnimation : 'bounceOut',
									slideBackAnimation : 'easeIn',
									cls : 'ux-notification-light',
									stickOnClick : true,
									stickWhileHover : true,
									title : 'Selection',
									position : 't',
									spacing : 20,
									html : lang.failure.addTopic
								}).show();
							},
							success : function(response) {
								var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');
								currCon[0].getLayout().setActiveItem('content-panel');
								var contentListArr = Ext.ComponentQuery.query('#' + values.course_id + '-grid-panel');
								contentListArr[0].getStore().load();

								Ext.create('Ext.ux.window.Notification', {
									hideDuration : 500,
									autoHideDelay : 7000,
									slideInAnimation : 'bounceOut',
									slideBackAnimation : 'easeIn',
									cls : 'ux-notification-light',
									stickOnClick : true,
									stickWhileHover : true,
									title : 'Category',
									position : 't',
									spacing : 20,
									iconCls : 'ux-notification-icon-information',
									html : lang.success.addTopic
								}).show();
								this.up('form').getForm().reset();
							}
						});
					}
				}, {
					xtype : 'button',
					text : lang.cancel,
					type : 'reset',
					handler : function() {
						this.up('form').getForm().reset();
						var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');
						currCon[0].getLayout().setActiveItem('content-panel');
					}
				}]
			}]
		});

		me.callParent(arguments);
	}
});
