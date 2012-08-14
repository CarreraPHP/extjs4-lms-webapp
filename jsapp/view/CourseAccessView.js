/*
 * File: jsapp/view/loginView.js
 * developed by siva
 *
 */

Ext.define('MyApp.view.CourseAccessView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.courseaccessview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	frame : false,
	layout : {
		type : 'vbox',
		align : 'stretch'

	},
	//bodyPadding : 5,
	autoScroll : false,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				bodyPadding : 5,
				region : 'center',
				split : true,
				items : [{
					xtype : 'fieldset',
					padding : 5,
					items : [{
						xtype : 'combo',
						itemId : 'type',
						anchor : '100%',
						fieldLabel : 'Type',
						
						store : new Ext.data.SimpleStore({
							fields : ['id', 'name'],
							data : [["topic", "topic"], ["content", "content"]]
						}),
						displayField : 'name',
						valueField : 'id',
						editable : false,
						listeners : {
							select : function(combo, value) {
								
								var store = me.down('#search-course').getStore();
								store.load({
									params : {
										module : this.value + "Access"
									}
								});
							}
						}

					}, {
						xtype : 'combobox',
                        //fieldLabel : lang.topic,
                        name : 'occupationProfession',
                        itemId : 'search-course',
                        store : 'courseAccessStore',
                        allowBlank : false,
                        editable : false,
                        displayField : 'name',
                        valueField : 'id',
                        queryMode : 'local',
                        anchor : '100%'
					}, {
						xtype : 'hidden',
						name : 'course_id'
					}]

				}],
				dockedItems : [{
					xtype : 'toolbar',
					dock : 'bottom',
					layout : {
						pack : 'end'
					},
					items : [{
						xtype : 'button',
						itemId : 'access-search',
						text : 'Search',
						formBind : true
					}]
				}]

			}, {
				xtype : 'gridpanel',
				title : lang.course,
				itemId : 'access-topic-content',
				autoScroll : true,
				margin : '0 1 0 0',
				border : false,
				scope : this,
				store : Ext.create('MyApp.store.accessTCStore', {
					storeId : 'accessTCStore'
				}),
				flex : 1,
				columns : [{
					xtype : 'templatecolumn',
					tpl : '<span> {first_name} {last_name} </span>',
					header : lang.name,
					dataIndex : 'name',
					flex : 1
				}, {
					xtype : 'actioncolumn',
					header : lang.create,
					width : 80,
					dataIndex : 'C',
					renderer : function(value, metadata, record) {
						if(value == 'N') {
							this.columns[1].items[0].icon = 'resources/images/icons/cancel.png';
						} else {
							this.columns[1].items[0].icon = 'resources/images/icons/accept.png';
						}
					},
					items : [{
						tooltip : lang.change,
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var role_id = rec.data.user_role_id;
							var user_id = rec.data.user_id;
							var module_id = rec.data.module_id;
							var mod_sub_id = rec.data.module_sub_id;

							Ext.Ajax.request({
								url : 'data/DataList.php',
								method : 'GET',
								params : {
									"roleId" : role_id,
									"module_id" : module_id,
									"module_sub_id" : mod_sub_id,
									"userId" : user_id,
									"column" : 'C',
									"module" : "topicPermission"
								},
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
										html : lang.failure.deleteCategory
									}).show();
								},
								success : function(response) {
									this.up().up('gridpanel').getStore().load();
								}
							});
						}
					}]
				}, {
					xtype : 'actioncolumn',
					header : lang.read,
					width : 80,
					dataIndex : 'R',
					renderer : function(value, metadata, record) {
						if(value == 'N') {
							this.columns[2].items[0].icon = 'resources/images/icons/cancel.png';

						} else {
							this.columns[2].items[0].icon = 'resources/images/icons/accept.png';
						}
					},
					items : [{
						tooltip : lang.change,
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var role_id = rec.data.user_role_id;
							var user_id = rec.data.user_id;
							var module_id = rec.data.module_id;
							var mod_sub_id = rec.data.module_sub_id;

							Ext.Ajax.request({
								url : 'data/DataList.php',
								method : 'GET',
								params : {
									"roleId" : role_id,
									"module_id" : module_id,
									"userId" : user_id,
									"module_sub_id" : mod_sub_id,
									"column" : 'R',
									"module" : "topicPermission"
								},
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
										html : lang.failure.deleteCategory
									}).show();
								},
								success : function(response) {
									this.up().up('gridpanel').getStore().load();
								}
							});
						}
					}]
				}, {
					xtype : 'actioncolumn',
					header : lang.update,
					width : 80,
					dataIndex : 'U',
					renderer : function(value, metadata, record) {
						if(value == 'N') {
							this.columns[3].items[0].icon = 'resources/images/icons/cancel.png';
						} else {
							this.columns[3].items[0].icon = 'resources/images/icons/accept.png';
						}
					},
					items : [{
						tooltip : lang.change,
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var role_id = rec.data.user_role_id;
							var user_id = rec.data.user_id;
							var module_id = rec.data.module_id;
							var mod_sub_id = rec.data.module_sub_id;

							Ext.Ajax.request({
								url : 'data/DataList.php',
								method : 'GET',
								params : {
									"roleId" : role_id,
									"module_id" : module_id,
									"userId" : user_id,
									"module_sub_id" : mod_sub_id,
									"column" : 'U',
									"module" : "topicPermission"
								},
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
										html : lang.failure.deleteCategory
									}).show();
								},
								success : function(response) {
									this.up().up('gridpanel').getStore().load();
								}
							});
						}
					}]
				}, {
					xtype : 'actioncolumn',
					header : lang.modDelete,
					width : 80,
					dataIndex : 'D',
					renderer : function(value, metadata, record) {
						if(value == 'N') {
							this.columns[4].items[0].icon = 'resources/images/icons/cancel.png';
						} else {
							this.columns[4].items[0].icon = 'resources/images/icons/accept.png';
						}
					},
					items : [{
						tooltip : lang.change,
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var role_id = rec.data.user_role_id;
							var user_id = rec.data.user_id;
							var module_id = rec.data.module_id;
							var mod_sub_id = rec.data.module_sub_id;

							Ext.Ajax.request({
								url : 'data/DataList.php',
								method : 'GET',
								params : {
									"roleId" : role_id,
									"module_id" : module_id,
									"module_sub_id" : mod_sub_id,
									"userId" : user_id,
									"column" : 'D',
									"module" : "topicPermission"
								},
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
										html : lang.failure.deleteCategory
									}).show();
								},
								success : function(response) {
									this.up().up('gridpanel').getStore().load();
								}
							});
						}
					}]
				}/*, {
					xtype : 'actioncolumn',
					header : lang.permission,
					width : 80,
					dataIndex : 'P',
					renderer : function(value, metadata, record) {
						if(value == 'N') {
							this.columns[5].items[0].icon = 'resources/images/icons/cancel.png';
						} else {
							this.columns[5].items[0].icon = 'resources/images/icons/accept.png';
						}
					},
					items : [{
						tooltip : lang.change,
						handler : function(grid, rowIndex, colIndex) {
							var formValues = this.up().ownerCt.up('form').getValues();
							var rec = grid.getStore().getAt(rowIndex);
							var role_id = formValues.role_id;
							var module_id = rec.data.id;

							Ext.Ajax.request({
								url : 'data/DataList.php',
								method : 'GET',
								params : {
									"roleId" : role_id,
									"module_id" : module_id,
									"column" : 'P',
									"module" : "modulePermission"
								},
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
										html : lang.failure.deleteCategory
									}).show();
								},
								success : function(response) {
									this.up().up('gridpanel').getStore().load();
								}
							});
						}
					}]
				}*/]

			}]
		});

		me.callParent(arguments);
	},
	rowEditingHandler : function(editor, e, opts) {
		editor.store.load();
		Ext.create('Ext.ux.window.Notification', {
			hideDuration : 500,
			autoHideDelay : 7000,
			slideInAnimation : 'bounceOut',
			slideBackAnimation : 'easeIn',
			cls : 'ux-notification-light',
			stickOnClick : true,
			stickWhileHover : true,
			title : 'Edit',
			iconCls : 'ux-notification-icon-information',
			position : 't',
			spacing : 20,
			html : 'Row has been edited.'
		}).show();

	},
	/*changeModulePermissions : function(grid, rowIndex, colIndex) {
	 console.log(grid);
	 var formValues = this.up().ownerCt.up('form').getValues();
	 var rec = grid.getStore().getAt(rowIndex);
	 var role_id = formValues.role_id;
	 var module_id = rec.data.id;
	 Ext.Ajax.request({
	 url : 'data/DataList.php',
	 method : 'post',
	 params : {
	 "roleId" : role_id,
	 "module_id" : module_id,
	 "module" : "modulePermission"
	 },
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
	 html : lang.failure.deleteCategory
	 }).show();
	 },
	 success : function(response) {

	 }
	 });

	 }*/
});
