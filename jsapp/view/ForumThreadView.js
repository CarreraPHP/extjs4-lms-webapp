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
	autoScroll : false,
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
				xtype : 'panel',
				height : 208,
				width : 665,
				flex : 0.25,
				itemId : 'forumThread',
				bodyPadding : 5,
				region : 'center',
				split : true,
				autoScroll : true,
				layout : 'fit',
				tpl : ['<div><b><span>{name}</span><span style="padding-left:960px;">{created_date}</span><br /><span>{username}</span></b></div><hr /><br /><div>{description}</div>']
			}, {
				xtype : 'panel',
				border : true,
				height : 276,
				bodyPadding : 5,
				autoScroll : true,
				title : 'Forum Reply',
				id : 'replyPanel',
				flex : 1,
				layout : {
					type : 'fit'
				},
				viewConfig : {
					loadMask : false
				},
				
				items : [{
					xtype : 'dataview',
					autoScroll : true,
					itemId : 'replyThread',
					tpl : ['<tpl for=".">', '<div class="userList"><b><span>{user_email}</span></b><br /><span style="padding-left:1140px;">{created_date}</span><br /><br /><span style="padding-left:40px;">{content_text}</span><hr /></div>', '</tpl>'],
					itemSelector: '.userList',
					singleSelect : true,
					emptyText : 'No Users available Here',
					store : Ext.create('MyApp.store.commentStore')

				}]
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
					xtype : 'container',
					itemId : 'title',
					tpl : ['<div><b>{name}</b></div>']
				}, '->', {
					xtype : 'button',
					text : 'Reply Thread',
					iconCls : 'reply-button'
					
				}, {
					xtype : 'tbseparator'
				}, {
					xtype : 'button',
					text : lang.refresh,
					scope : this,
					iconCls : 'refresh-button',
					handler : function() {
						// do refresh
						var o = Ext.ComponentQuery.query('contentforumview #forumTopic'), grid = o[0];
						var index = grid.getStore().indexOf(me.SelectedRecord);
						var rec = grid.getStore().getAt(index);
						me.SelectedRecord = rec;
						me.loadRecord(rec);
						var o = Ext.ComponentQuery.query('forumthreadview #replyThread'), panel = o[0];
						//console.log(panel);
						panel.getStore().load();

					}
				}]
			},{
				xtype : 'toolbar',
				dock : 'bottom',
				layout : {
					pack : 'end'	
				},
				items : [{
					xtype : 'button',
					disabled : true,
					text : lang.deleteLabel,
					iconCls : 'delete-button',
					itemId : 'delete-reply'
				}]
				
			}]

		});

		me.callParent(arguments);
	}
});
