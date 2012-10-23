Ext.define('MyApp.view.ForumThreadView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.forumthreadview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	frame : false,
	layout : {
		align : 'stretch',
		type : 'vbox'
	},
	//bodyPadding : 5,
	autoScroll : true,
	currentGrid : '',
	loadedData : {},
	loadRecord : function(record) {
		//this.body.hide();
		loadedData = record.data;
		this.down('panel').tpl.overwrite(this.down('panel').body, loadedData);

	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
					xtype : 'dataview',
					padding: 5,
					itemId : 'replyThread',
					tpl : [
						'<tpl for=".">',
							'<div class="forum-item">',
								'<div>',
									'<div class="forum-title">&nbsp;</div>',
									'<div class="forum-date">{created_date}</div>',
								'</div>',
								'<div class="forum-desc">{content_text}</div>',
								'<div class="forum-user">{user_email}</div>',
							'</div>',
							'<div class="clear-fix"></div>',
						'</tpl>'
					],					
					itemSelector : '.forum-item',
					singleSelect : true,
					emptyText : 'No Forum Reply available Here',
					store : Ext.create('MyApp.store.commentStore'),
					listeners : {
						itemcontextmenu : function(view, record, el, index, e, eOpts) {
							e.preventDefault();
							x = e.browserEvent.clientX;
							y = e.browserEvent.clientY;
							e.stopEvent();
							var menu = Ext.create('Ext.menu.Menu', {
								items : [{
									text : lang.deleteLabel,
									iconCls : 'delete-button',
									itemId : 'forumDelete',
									scope : this,
									handler : function() {
										Ext.Ajax.request({
											url : 'data/Delete.php',
											method : 'post',
											params : {
												"id" : record.data.content_id,
												"module" : "content",
												"type" : "Forum",
												"user" : record.data.user_email
												
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
												this.store.load();
												window.msg = Ext.decode(response.responseText);
												
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
													html : window.msg.message
												}).show();
											}
										});
									}
								}]
							});
							menu.showAt(e.xy);
						}
					}

				}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				items : [{
					xtype : 'button',
					text : 'back',
					itemId : 'slideBack',
					iconCls : 'back-button',
					handler : function() {
						var appArr = Ext.ComponentQuery.query('workspaceview container[region="west"]');
						var appViewInstance = appArr[0];
						appViewInstance.show();
						var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');
						currCon[0].getLayout().setActiveItem('content-panel');
					}
				}, '->', {
					xtype : 'button',
					text : lang.refresh,
					scope : this,
					iconCls : 'refresh-button',
					handler : function() {
						// do refresh
						/*var o = Ext.ComponentQuery.query('contentforumview'), grid = o[0];
						var index = grid.getStore().indexOf(me.SelectedRecord);
						console.log(index);
						var rec = grid.getStore().getAt(index);
						me.SelectedRecord = rec;
						me.loadRecord(rec);*/
						var o = Ext.ComponentQuery.query('forumthreadview #replyThread'), panel = o[0];
						panel.getStore().load();

					}
				}]
			},{
					dock:  'top',
				xtype : 'panel',				
				itemId : 'forumThread',
				bodyPadding : 5,
				region : 'center',
				split : true,
				autoHeight: true,
				width: '100%',		
				tpl : [
					'<tpl for=".">',
						'<div class="forum-item">',
							'<div>',
								'<div class="forum-title">{name}</div>',
								'<div class="forum-date">{created_date}</div>',
							'</div>',
							'<div class="forum-desc">{description}</div>',
							'<div class="forum-user">{username}</div>',
						'</div>',
						'<div class="clear-fix"></div>',
					'</tpl>',
				]
			},{
				xtype : 'toolbar',
				dock : 'top',
				items : ['->', {
					xtype : 'tbseparator'
				},{
					xtype : 'button',
					text : 'Reply Thread',
					iconCls : 'reply-button'

				}]
			}]

		});

		me.callParent(arguments);
	}
});
