/*
 * File: jsapp/view/loginView.js
 * developed by siva
 *
 */

Ext.define('MyApp.view.advancesearchView', {
	extend : 'Ext.container.Container',
	alias : 'widget.advancesearchview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	frame : false,
	itemId : '',
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	autoScroll : false,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				title : lang.advancedsearch,
				frame : false,
				width : 750,
				height : 180,
				bodyPadding : 10,
				layout : {
					type : 'table',
					columns : 3,
					border : true,
					align : 'stretch'
				},
				defaults : {
					bodyStyle : 'padding:20px'
				},

				items : [{
					height : 20,
					xtype : 'textfield',
					fieldLabel : lang.topic,
					width : 500,
					name : 'searchkey',
					allowBlank : false,
					flex : 1,
					colspan : 3
				}, {
					xtype : 'checkboxgroup',
					fieldLabel : 'Content on',
					allowBlank : false,
					msgTarget : 'side',
					autoFitErrors : false,
					width : 700,
					layout : 'column',
					defaultType : 'container',
					items : [{
						width : 100,
						items : [{
							xtype : 'component',
							html : 'Course',
							cls : 'x-form-check-group-label'
						}, {
							xtype : 'checkboxfield',
							boxLabel : 'name',
							name : 'course-name'
						}, {
							xtype : 'checkboxfield',
							boxLabel : 'description',
							name : 'course_description'
						}]
					}, {
						width : 100,
						items : [{
							xtype : 'component',
							html : 'topic',
							cls : 'x-form-check-group-label'
						}, {
							xtype : 'checkboxfield',
							boxLabel : 'name',
							name : 'topic-name'
						}, {
							xtype : 'checkboxfield',
							boxLabel : 'description',
							name : 'topic-description'
						}]
					}, {
						width : 100,
						items : [{
							xtype : 'component',
							html : 'content',
							cls : 'x-form-check-group-label'
						}, {
							xtype : 'checkboxfield',
							boxLabel : 'name',
							name : 'content-name'
						}, {
							xtype : 'checkboxfield',
							boxLabel : 'description',
							name : 'content-description'
						}, {
							xtype : 'checkboxfield',
							boxLabel : 'text',
							name : 'content-text'
						}]
					}]
				}],

				dockedItems : [{
					xtype : 'toolbar',
					dock : 'bottom',
					items : [{
						xtype : 'button',
						itemId : 'advsearch',
						text : 'Search'
					}, {
						xtype : 'button',
						itemId : 'advreset',
						text : 'Reset',
						handler : function() {
							this.up('form').getForm().reset();
						}
					}]
				}]

			}, {
				xtype : 'gridpanel',
				flex : 1,
				store : 'searchcontentStore',
				padding : '5 0 0 0',
				columns : [{
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
					header : lang.contentdescription,
					dataIndex : 'description',
					flex : 1,
					field : {
						xtype : 'textfield',
						allowBlank : false
					}
				}, {
					header : lang.contenttext,
					dataIndex : 'text',
					flex : 1,
					field : {
						xtype : 'textfield',
						allowBlank : false
					}
				}, {
					header : lang.topicname,
					dataIndex : 'topic_name',
					flex : 1,
					field : {
						xtype : 'textfield',
						allowBlank : false
					}
				}, {
					header : lang.topicdescription,
					dataIndex : 'topic_description',
					flex : 1,
					field : {
						xtype : 'textfield',
						allowBlank : false
					}
				}, {
					header : lang.coursename,
					dataIndex : 'course_name',
					flex : 1,
					field : {
						xtype : 'textfield',
						allowBlank : false
					}
				}, {
					header : lang.coursedescription,
					dataIndex : 'course_description',
					flex : 1,
					field : {
						xtype : 'textfield',
						allowBlank : false
					}
				}, {
					xtype : 'actioncolumn',
					header : lang.action,

					items : [{
						icon : 'resources/images/icons/door_open.png', // Use a URL in the icon config
						tooltip : lang.open,
						handler : function(grid, rowIndex, colIndex) {
							var o = Ext.ComponentQuery.query('#content-panel'), parentContainer = o[0];
							var record = grid.getStore().getAt(rowIndex);
							var re = /cou([0-9]+)/ig, result = re.exec(record.data.course_id);
							
							if(result) {
								var selObj = parentContainer.down('#' + record.data.course_id + '-tab-panel');
								if(selObj == null) {
									var child = Ext.create('MyApp.view.ContentGridView', {
										region : 'center',
										split : false,
										border : true,
										itemId : record.data.course_id + '-grid-panel',
										store : Ext.create('MyApp.store.contentStore', {
											storeId : this.itemId + 'store'
										}),
										closable : false
									});

									child.store.proxy.extraParams.parent = record.data.course_id;
									child.store.load();

									parentContainer.add(Ext.create('Ext.tab.Panel', {
										items : [{
											xtype : 'panel',
											title : 'content list',
											layout : {
												align : 'stretch',
												type : 'border',
												padding : 5
											},
											flex : 1,
											items : [child, {
												xtype : 'panel',
												title : 'Content Details',
												region : 'south',
												autoScroll : true,
												height : 200,
												border : true,
												preventHeader : false,
												animCollapse : true,
												collapseMode : 'mini',
												collapsible : true,
												collapsed : true,
												split : true,
												tpl : ['<div>', '<div class="contDetailsOdd">' + lang.course + ': {course_name} </div>', '<div class="contDetailsEven">' + lang.topic + ': {topicName} </div>', '<div class="contDetailsOdd">' + lang.description + ': <br/> {description} </div>', '<div class="contDetailsEven">' + lang.preview + ': {text} </div>',
												/*'<div> Preview: <br/> {text} </div>',*/
												'</div>'],
												html : 'description'
											}]
										}],
										border : false,
										itemId : record.data.course_id + '-tab-panel',
										title : record.data.course_name,
										closable : true
									}));
									selObj = child;
								}
								//console.log(parentContainer);
								parentContainer.getLayout().setActiveItem(record.data.course_id + '-tab-panel'); o = Ext.ComponentQuery.query('workspaceview container[region=center]'), currConPanel = o[0];
								currConPanel.getLayout().setActiveItem('content-panel'); o = Ext.ComponentQuery.query('#application-base'), currCon = o[0];
								currCon.getLayout().setActiveItem('ws-view-card');

								var courseTabPanel = parentContainer.down('#' + record.data.course_id + '-tab-panel');
								
								if(courseTabPanel) {
									var selectedContentPanel = courseTabPanel.down('#' + record.data.course_id + '-tab-panel-content-' + record.data.id);
									if(!selectedContentPanel) {
										if(record.data.type == 'HTML') {
											selectedContentPanel = Ext.create('MyApp.view.ContentDisplayView', {
												itemId : courseTabPanel.itemId + '-content-' + record.data.id,
												title : record.data.name,
												closable : true
											});
										} else if(record.data.type == 'PDF') {
											selectedContentPanel = Ext.create('MyApp.view.ContentPdfView', {
												itemId : courseTabPanel.itemId + '-content-' + record.data.id,
												title : record.data.name,
												closable : true
											});
										} else if(record.data.type == 'IMAGE') {
											selectedContentPanel = Ext.create('MyApp.view.ContentImageView', {
												itemId : courseTabPanel.itemId + '-content-' + record.data.id,
												title : record.data.name,
												closable : true
											});
										} else if(record.data.type == 'FLASH') {
											selectedContentPanel = Ext.create('MyApp.view.ContentFlashView', {
												itemId : courseTabPanel.itemId + '-content-' + record.data.id,
												title : record.data.name,
												closable : true
											});
										} else if(record.data.type == 'VIDEO') {
											selectedContentPanel = Ext.create('MyApp.view.ContentFlashView', {
												itemId : courseTabPanel.itemId + '-content-' + record.data.id,
												title : record.data.name,
												closable : true
											});
										} else if(record.data.type == 'AUDIO') {
											selectedContentPanel = Ext.create('MyApp.view.ContentFlashView', {
												itemId : courseTabPanel.itemId + '-content-' + record.data.id,
												title : record.data.name,
												closable : true
											});
										}
										courseTabPanel.add(selectedContentPanel);										
									}
									
									if(courseTabPanel.down('#' + courseTabPanel.itemId + '-content-' + record.data.id)){
										courseTabPanel.getLayout().setActiveItem(courseTabPanel.itemId + '-content-' + record.data.id);
									}
									
									selectedContentPanel.loadRecord(record);
									selectedContentPanel.doLayout();
									courseTabPanel.doLayout();
								}

								parentContainer.doLayout();
								selObj.doLayout();
								currConPanel.doLayout();
							} else {
								this.createNotification(lang.selection, lang.failure.courseselection, 'error', 't');
							}

						}
					}]
				}],
				dockedItems : [{
					xtype : 'pagingtoolbar',
					store : 'searchcontentStore', // same store GridPanel is using
					dock : 'bottom',
					displayInfo : true
				}]
			}]

		});

		me.callParent(arguments);
	}
});
