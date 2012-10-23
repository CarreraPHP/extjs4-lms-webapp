Ext.define('App.view.workspaceView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.workspaceview',
	layout : {
		type : 'card'
	},
	frame : false,
	loadedData : {},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : 'box',
				itemId : 'dataDisplay',
				frame : false,
				flex : 1,
				border : true,
				autoScroll : true,
				bodyPadding : 5,
				autoEl: {
					tag: 'iframe',
					src: '',
					style: {
						'border' : false
					}
				}
			},{
				xtype : 'box',
				autoEl: {
					tag: 'iframe',
					src: '',
					style: {
						'border' : false
					}
				}
			}],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				layout : {
					pack : 'end'
				},
				items : [{
					text : 'View Source',
					itemId : 'view-source',
					iconCls : 'view-source-button',
					enableToggle : true
				}]
			}]
		});
		me.callParent(arguments);
	}
});
