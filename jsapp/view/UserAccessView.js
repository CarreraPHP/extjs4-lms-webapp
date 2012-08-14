/*
 * File: jsapp/view/loginView.js
 * developed by siva
 *
 */

Ext.define('MyApp.view.UserAccessView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.useraccessview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	frame : false,
	itemId : 'user-access-view',
	layout : {
		type : 'card'

	},
	//bodyPadding : 5,
	autoScroll : false,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : 'panel',
				itemId : 'user-access-card',
				layout : {
					type : 'border',
					align : 'stretch'
				},
				stripeRows : true,
				items : [{
					xtype : 'panel',
					itemId : 'user-view',
					title : 'Users List',
					region : 'west',
					collapsible : true,
					collapseMode : 'mini',
					split : true,
					layout : {
						type : 'fit'
					},
					items : [{
						xtype : 'dataview',
						autoScroll : true,
						itemId : 'userlist',
						tpl : ['<tpl for=".">', '<div class="userList"><span>{screenname}</span> <br /> <span>{user_email}</span></div>', '</tpl>'],
						emptyText : 'No Users available Here',
						itemSelector : '.userList',
						singleSelect : true,
						store : Ext.create('MyApp.store.userAccessStore')
					}]
				}, {
					xtype : 'form',
					title : lang.useraccess,
					bodyPadding : 5,
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
					region : 'center',
					split : true,
					items : [{
						xtype : 'fieldset',
						padding : 5,
						items : [{
							xtype : 'textfield',
							fieldLabel : lang.name,
							labelWidth : 100,
							anchor : '100%',
							name : 'first_name',
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : lang.email,
							labelWidth : 100,
							anchor : '100%',
							name : 'user_email',
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : lang.username,
							labelWidth : 100,
							anchor : '100%',
							name : 'screenname',
							readOnly : true
						}, {
							xtype : 'hidden',
							name : 'id'
						}]
					}, {
						xtype : 'container',
						flex : 1,
						border : false,
						layout : {
							type : 'hbox',
							align : 'stretch'
						},
						items : [{
							xtype : 'gridpanel',
							title : lang.category,
							autoScroll : true,
							margin : '0 1 0 0',
							border : true,

							store : Ext.create('MyApp.store.userAccessCategoryStore', {
								storeId : 'accessCategoryStore'
							}),
							flex : 1,
							features : [Ext.create('Ext.grid.feature.Grouping', {
								groupHeaderTpl : lang.role + ' : {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
							})],
							columns : [{
								xtype : 'templatecolumn',
								tpl : '<span class="{cls}"> <b> {name}  </b> [ path : <i>"{path}"</i> &nbsp;] </span>',
								header : lang.name,
								dataIndex : 'name',
								flex : 1
							}, {
								xtype : 'templatecolumn',
								tpl : '<span>{role_name}</span>',
								header : lang.role,
								dataIndex : 'role_name',
								flex : 0.25,
								field : {
									xtype : 'combobox',
									store : 'userRoleStore',
									allowBlank : false,
									displayField : 'name',
									valueField : 'id',
									queryMode : 'local'
								}
							}, {
								xtype : 'actioncolumn',
								header : lang.action,
								width : 45,
								items : [{
									icon : 'resources/images/icons/cog_edit.png', // Use a URL in the icon config
									tooltip : lang.edit,
									handler : function(grid, rowIndex, colIndex) {
										var rowInstance = grid.ownerCt.getPlugin('CategoryRowEdit');
										rowInstance.cancelEdit();
										rowInstance.startEdit(rowIndex, 0);
									}
								}, {
									icon : 'resources/images/icons/delete.png',
									tooltip : lang.deleteLabel,
									handler : function(grid, rowIndex, colIndex) {
										Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete?', showResult);
										function showResult(btn) {
											if(btn == 'yes') {
												var rec = grid.getStore().getAt(rowIndex);
												console.log(rec);
												var id = rec.get('id');
												var mod_sub_id = rec.get('instance_id');
												var user_id = rec.get('user_id');
												Ext.Ajax.request({
													url : 'data/Delete.php',
													method : 'post',
													params : {
														"id" : id,
														"mod_sub_id" : mod_sub_id,
														"user_id" : user_id,
														"module" : "accessCategory"
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
														window.msg = Ext.decode(response.responseText);
														if(window.msg.success == true) {
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
																html : rec.get('name') + " successfully deleted"
															}).show();
															//console.log(grid.getStore());
															grid.getStore().load();
														}
													}
												});
											}
										};
									}
								}]
							}],
							selType : 'rowmodel',
							plugins : [Ext.create('Ext.grid.plugin.RowEditing', {
								pluginId : 'CategoryRowEdit',
								clicksToEdit : 2,
								listeners : {
									edit : Ext.bind(this.rowEditingHandler, this)
								}
							})],
							dockedItems : [{
								xtype : 'toolbar',
								dock : 'top',
								layout : {
									pack : 'end'
								},
								items : [{
									xtype : 'button',
									itemId : 'AddCategory',
									text : lang.rule,
									iconCls : 'user-add-category'
								}]
							}]

						}, {
							xtype : 'gridpanel',
							title : lang.course,
							autoScroll : true,
							margin : '0 0 0 1',
							border : true,
							flex : 1,

							store : Ext.create('MyApp.store.userAccessCategoryStore', {
								storeId : 'accessCourseStore'
							}),
							features : [Ext.create('Ext.grid.feature.Grouping', {
								groupHeaderTpl : lang.role + ' : {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
							})],
							columns : [{
								xtype : 'templatecolumn',
								tpl : '<span class="{cls}"><b>{name}</b> [ path : <i>"{path}"</i> &nbsp;] </span>',
								header : lang.name,
								dataIndex : 'name',
								flex : 1,
							}, {
								xtype : 'templatecolumn',
								tpl : '<span>{role_name}</span>',
								header : lang.role,
								dataIndex : 'role_name',
								flex : 0.25,
								field : {
									xtype : 'combobox',
									store : 'userRoleStore',
									allowBlank : false,
									displayField : 'name',
									valueField : 'id',
									queryMode : 'local'
								}
							}, {
								xtype : 'actioncolumn',
								header : lang.action,
								width : 60,
								items : [{
									icon : 'resources/images/icons/cog_edit.png', // Use a URL in the icon config
									tooltip : lang.edit,
									handler : function(grid, rowIndex, colIndex) {
										var courseRowInstance = grid.ownerCt.getPlugin('CourseRowEdit');
										courseRowInstance.cancelEdit();
										courseRowInstance.startEdit(rowIndex, 0);
									}
								}, {
									icon : 'resources/images/icons/delete.png',
									tooltip : lang.deleteLabel,
									handler : function(grid, rowIndex, colIndex) {
										Ext.MessageBox.confirm('Confirm', 'Are you sure you want  delete?', showResult);
										function showResult(btn) {
											if(btn == 'yes') {
												var rec = grid.getStore().getAt(rowIndex);
												var id = rec.get('id');
												var mod_sub_id = rec.get('instance_id');
												var user_id = rec.get('user_id');
												Ext.Ajax.request({
													url : 'data/Delete.php',
													method : 'post',
													params : {
														"id" : id,
														"mod_sub_id" : mod_sub_id,
														"user_id" : user_id,
														"module" : "accessCategory"
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
														window.msg = Ext.decode(response.responseText);
														if(window.msg.success == true) {
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
																html : rec.get('name') + " successfully deleted"
															}).show();
															//console.log(grid.getStore());
															grid.getStore().load();
														}
													}
												});
											}
										};
									}
								}]
							}],
							selType : 'rowmodel',
							plugins : [Ext.create('Ext.grid.plugin.RowEditing', {
								pluginId : 'CourseRowEdit',
								clicksToEdit : 2,
								listeners : {
									edit : Ext.bind(this.rowEditingHandler, this)
								}
							})],
							dockedItems : [{
								xtype : 'toolbar',
								dock : 'top',
								layout : {
									pack : 'end'
								},
								items : [{
									xtype : 'button',
									itemId : 'AddCourse',
									text : lang.rule,
									iconCls : 'user-add-course'
								}]
							}]
						}]
					}]

				}]

			}, {
				xtype : 'panel',
				itemId : 'role-permission',
				layout : {
					type : 'border',
					align : 'stretch'
				},
				items : [{
					xtype : 'panel',
					itemId : 'role-view',
					title : 'Role List',
					region : 'west',
					collapsible : true,
					collapseMode : 'mini',
					split : true,
					layout : {
						type : 'fit'
					},
					items : [{
						xtype : 'dataview',
						autoScroll : true,
						itemId : 'rolelist',
						tpl : ['<tpl for=".">', '<div class="rolelist"><span>{name}</span></div>', '</tpl>'],
						emptyText : 'No Role available Here',
						itemSelector : '.rolelist',
						singleSelect : true,
						store : Ext.create('MyApp.store.userRoleStore')
					}]
				}, {
					xtype : 'form',
					itemId : 'role_permission',
					region : 'center',
					split : true,
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
					title : lang.rolePermission,
					bodyPadding : 5,
					border : true,
					items : [{
						xtype : 'fieldset',
						padding : 5,
						items : [{
							xtype : 'textfield',
							fieldLabel : lang.name,
							labelWidth : 100,
							anchor : '100%',
							name : 'name',
							readOnly : true
						}, {
							xtype : 'hidden',
							name : 'role_id',

						}]
					}, {
						xtype : 'gridpanel',
						title : lang.module,
						autoScroll : true,
						margin : '0 1 0 0',
						border : true,
						scope : this,
						store : Ext.create('MyApp.store.accessModuleStore', {
							storeId : 'accessModuleStore'
						}),
						flex : 1,
						columns : [{
							xtype : 'templatecolumn',
							tpl : '<span class="{cls}"> {name} </span>',
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
											"column" : 'C',
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
											"column" : 'R',
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
											"column" : 'U',
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
											"column" : 'D',
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
						}, {
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
						}]

					}]

				}]
			}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				layout : {
					pack : 'end'
				},
				items : [{
					xtype : 'button',
					itemId : 'filePermission',
					text : lang.permission,
					iconCls : 'edit-permission',
					enableToggle : true,
				}]
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
