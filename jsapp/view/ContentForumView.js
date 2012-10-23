Ext.define('MyApp.view.ContentForumView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contentforumview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	title : 'content',
	layout : {
		type : 'fit',
		align : 'stretch'
	},
	store : 'forumStore',
	border: true,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {				
				autoScroll : true,				
				flex : 1,
				columns : [{
					header : lang.topicname,
					dataIndex : 'name',
					flex : 1,
					field : {
						xtype : 'textfield',
						allowBlank : false
					}
				}, {
					header : lang.createdBy,
					dataIndex : 'user_email',
					flex : 1,
				}, {
					header : lang.createdDate,
					dataIndex : 'created_date',
					flex : 1
				}, {
					xtype : 'actioncolumn',
					header : lang.action,
					width : 100,
					items : [{
						icon : 'resources/images/icons/monitor.png', // Use a URL in the icon config
						tooltip : lang.view,
						handler : function(grid, rowIndex, colIndex, item, e, record) {
							var rec = grid.getStore().getAt(rowIndex);
							var appArr = Ext.ComponentQuery.query('workspaceview container[region="center"]');
							var appViewInstance = appArr[0];
							appViewInstance.getLayout().setActiveItem('forum-thread-view');
							var appArr = Ext.ComponentQuery.query('workspaceview container[region="west"]');
							var appViewInstance = appArr[0];
							var content = Ext.ComponentQuery.query('forumthreadview');
							var childComponent = content[0];
							childComponent.currentGrid = me.itemId;
							childComponent.SelectedRecord = rec;
							childComponent.loadRecord(rec);
							appViewInstance.hide();
							var forum = Ext.ComponentQuery.query('forumthreadview #replyThread');
							var reply = forum[0];
							reply.store.proxy.extraParams.parent = rec.data.id;
							reply.store.load();
						}
					}, {
						icon : 'resources/images/icons/cog_edit.png', // Use a URL in the icon config
						tooltip : lang.edit,
						handler : function(grid, rowIndex, colIndex) {
							var rowInstance = grid.ownerCt.getPlugin('ForumRowEdit');
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
									var id = rec.get('id');
									Ext.Ajax.request({
										url : 'data/Delete.php',
										method : 'post',
										params : {
											"id" : id,
											"module" : "topic"
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
					pluginId : 'ForumRowEdit',
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
						itemId : 'AddForum',
						text : lang.forum,
						iconCls : 'user-add-category'
					}]
				}]

			});

		me.callParent(arguments);
	}
});
