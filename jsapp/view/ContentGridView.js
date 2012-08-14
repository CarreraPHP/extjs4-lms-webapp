Ext.define('MyApp.view.ContentGridView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contentgridview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	store : 'contentStore',
	sortableColumns : false,
	coursePermission : {},
	requires : ['MyApp.view.ContentDisplayView', 'MyApp.view.ContentPdfView', 'MyApp.view.ContentImageView', 'MyApp.view.ContentFlashView'],
	initComponent : function() {
		var me = this;

		var rowEditingInstance = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit : 3,
			listeners : {
				edit : function(editor, e, opts) {
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
				}
			}
		});
		Ext.applyIf(me, {
			stripeRows : true,
			
			features : [Ext.create('Ext.grid.feature.Grouping', {
				groupHeaderTpl : lang.topic + ' : {[values.rows[0].topicname]} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
			})],
			columns : [{
				header : 'topic',
				id : 'topicname',
				dataIndex : 'topicName',
				hidden : true
			},{
				xtype : 'templatecolumn',
				tpl : '<span class="{cls}">{name}</span>',
				header : lang.contentname,
				dataIndex : 'name',
				flex : 0.5,
				field : {
					xtype : 'textfield',
					allowBlank : false
				}
			}, {
				header : lang.description,
				dataIndex : 'description',
				flex : 1,
				field : {
					xtype : 'textfield',
					allowBlank : false
				}
			}, {
				xtype : 'templatecolumn',
				tpl : '<span>{type}</span>',
				header : lang.type,
				dataIndex : 'type_id',
				flex : 0.25,
				field : {
					xtype : 'combobox',
					store : 'contentTypeStore',
					allowBlank : false,
					displayField : 'name',
					valueField : 'id',
					queryMode : 'local'
				}
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
						appViewInstance.getLayout().setActiveItem('content-fullscreen-view');
						var appArr = Ext.ComponentQuery.query('workspaceview container[region="west"]');
						var appViewInstance = appArr[0];
						var content = Ext.ComponentQuery.query('contentfullscreenview');
						var childComponent = content[0];
						childComponent.currentGrid = me.itemId;
						childComponent.SelectedRecord = rec;
						childComponent.loadRecord(rec);
						appViewInstance.hide();
						if(rowIndex == 0){
							var o = Ext.ComponentQuery.query('contentfullscreenview button[iconCls = "prev-button"]'), instance = o[0];
							instance.disable(true);
						}else{
							var o = Ext.ComponentQuery.query('contentfullscreenview button[iconCls = "prev-button"]'), instance = o[0];
							instance.enable(true);
						}
					}
				}, {
					icon : 'resources/images/icons/cog_edit.png', // Use a URL in the icon config
					tooltip : lang.edit,
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						if(me.coursePermission.update == true || rec.raw.permission.update == true) {
							rowEditingInstance.cancelEdit();
							rowEditingInstance.startEdit(rowIndex, 0);
						} else {
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
								html : lang.failure.contentUpdate
							}).show();
						}

					}
				}, {
					icon : 'resources/images/icons/delete.png',
					tooltip : lang.deleteLabel,
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						var id = rec.get('id');
						
						if(me.coursePermission.delete == true || rec.raw.permission.delete == true) {
							Ext.Ajax.request({
								url : 'data/Delete.php',
								method : 'post',
								params : {
									"id" : id,
									"module" : "content"
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
						}else {
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
								html : lang.failure.contentDelete
							}).show();
						}

						//alert("Terminate " + rec.get('id'));

					}
				}]
			}],
			selType : 'rowmodel',
			plugins : [rowEditingInstance],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				items : [{
					xtype : 'button',
					text : lang.topic,
					itemId : 'topic-button',
					iconCls : 'add-button'
				}, {
					xtype : 'tbseparator'
				}, {
					xtype : 'button',
					text : lang.content,
					itemId : 'content-button',
					iconCls : 'add-button',
					scope : this,
					handler : function(me, e, opts) {
						var grid = me.up('gridpanel');
						var store = grid.getStore();
						var recordArr = grid.getSelectionModel().selected;
						if(recordArr.length > 0) {
							var record = recordArr.items[0];
							// console.log(record);
							var rowIndex = 0;
							if(record) {
								rowIndex = grid.store.indexOf(record);

								var r = Ext.create('MyApp.model.contentModel', {
									id : 'new1',
									name : 'change here',
									description : 'change here',
									text : Base64.encode('Replace this content'),
									type_id : record.data.type_id,
									topic_id : record.data.topic_id,
									course_id : record.data.course_id,
									topicName : record.data.topicName,
									course_name : record.data.course_name,
									type : record.data.type,
									cls : record.data.cls,
									content_sort : '9999',
									topic_sort : record.data.topic_sort
								});
								store.insert(rowIndex + 1, r);
								rowEditingInstance.startEdit(rowIndex + 1, 0);
							}
						} else {
							Ext.create('Ext.ux.window.Notification', {
								hideDuration : 500,
								autoHideDelay : 7000,
								slideInAnimation : 'bounceOut',
								slideBackAnimation : 'easeIn',
								cls : 'ux-notification-light',
								stickOnClick : true,
								stickWhileHover : true,
								title : 'Content',
								position : 't',
								spacing : 20,
								html : 'Select the row after which the new topic has to be added.'
							}).show();
						}
					}
				}, '->', {
					xtype : 'button',
					text : lang.refresh,
					scope : this,
					iconCls : 'refresh-button',
					handler : function() {
						// do refresh
						this.getStore().load();
					}
				},{
					xtype : 'button',
					text : lang.forum,
					scope : 'this',
					iconCls : 'forum-button',
					itemId : 'forumButton'
				}]
			}],
			//features: [{ftype:'grouping'}],
			height : 200,
			width : 400,
			sortable : true,
			sorters : [{
				property : 'topic_sort',
				direction : 'ASC'
			}, {
				property : 'content_sort',
				direction : 'ASC'
			}]
		});
		me.callParent(arguments);
	}
});
