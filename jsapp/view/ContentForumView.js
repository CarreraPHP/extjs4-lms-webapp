Ext.define('MyApp.view.ContentForumView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.contentforumview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	title : 'content',
	layout : {
		type : 'fit'
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {

			items : [{
				xtype : 'container',
				flex : 1,
				border : false,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				items : [{
					xtype : 'gridpanel',
					title : lang.queries,
					autoScroll : true,
					margin : '0 1 0 0',
					border : true,
					itemId : 'forumTopic',
					store : 'forumStore',
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
						dataIndex : 'username',
						flex : 1,
						field : {
							xtype : 'textfield',
							allowBlank : false
						}

					}, {
						header : lang.createdDate,
						dataIndex : 'created_date',
						flex : 1,
					}, {
						header : 'course id',
						id : 'courseId',
						dataIndex : 'course_id',
						hidden : true
					}, {
						xtype : 'actioncolumn',
						header : lang.action,
						width : 45,
						items : [{
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
					}, {
						xtype : 'toolbar',
						dock : 'bottom',
						layout : {
							pack : 'start'
						},
						items : [{
							xtype : 'button',
							itemId : 'newPage',
							text : 'New Page'
						}, {
							xtype : 'button',
							itemId : 'commentReply',
							text : 'Reply'
						}]
					}]

				}, {
					xtype : 'panel',
					flex : 1,
					itemId : 'forumcontent',
					tpl : ['<tpl for="."><div class="databox"><ul>',
					'<li><div>User Id:</div><div>{name}</div></li>',
					'<li><div>Created Date:</div><div>{created_date}</div></li>',
					'<li><div>Processed Status:</div></li>',
					'</ul></div></tpl>']
				}]
			}]
		});

		me.callParent(arguments);
	}
});
