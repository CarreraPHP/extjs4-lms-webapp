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
				autoEl: {
					tag: 'iframe',
					src: '',
					style: {
						'border' : 0
					}
				}
			},{
				xtype : 'box',
                                itemId: 'htmlSource',
				autoEl: {
					tag: 'iframe',
					src: '',
					style: {
						'border' : 0
					}
				}
			},{
				xtype : 'box',
                                itemId: 'jsSource',
				autoEl: {
					tag: 'iframe',
					src: '',
					style: {
						'border' : 0
					}
				}
			},{
				xtype : 'box',
                                itemId: 'phpSource',
				autoEl: {
					tag: 'iframe',
					src: '',
					style: {
						'border' : 0
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
					text : 'demo',
					itemId : 'view-demo',
					iconCls : 'view-source-button',
					enableToggle : true
				}, '|',{
                                        xtype: 'tbtext',
					text : 'Source : '
				},{
					text : 'html',
					itemId : 'view-html',
					iconCls : 'view-source-button',
					enableToggle : true
				},{
					text : 'js',
					itemId : 'view-js',
					iconCls : 'view-source-button',
					enableToggle : true
				},{
					text : 'php',
					itemId : 'view-php',
					iconCls : 'view-source-button',
					enableToggle : true
				}]
			}]
		});
		me.callParent(arguments);
	}
});
