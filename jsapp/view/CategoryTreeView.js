/*
 * File: jsapp/view/CategoryTreeView.js
 */

Ext.define('MyApp.view.CategoryTreeView', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.categorytreeview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	title : lang.category,
	collapsible : true,
	rootVisible : false,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			viewConfig : {
				singleSelect : true,
				singleExpand : false,
				useArrows : true
			},
			dockedItems : [{
				xtype : 'toolbar',
				items : [{
					xtype : 'button',
					text : lang.category,
					itemId: 'category-button',
					iconCls : 'add-button'
				}, {
					xtype : 'button',
					text : lang.course,
					itemId: 'course-button',
					iconCls : 'add-button'
				}, {
					xtype : 'tbseparator'
				}, {
					xtype : 'button',
					text : lang.refresh,
					itemId: 'refresh-button',
					iconCls : 'refresh-button',
					handler : function() {
						var treeInstanceArr = Ext.ComponentQuery.query('categorytreeview');
						var selModel = treeInstanceArr[0].getSelectionModel();
						var node = selModel.getLastSelected();
						node = node ? node : treeInstanceArr[0].getStore().getRootNode();
						treeInstanceArr[0].getStore().load({
							node : node							
						});
					}
				}]
			}],
			columns : [{
				xtype : 'treecolumn',
				text : lang.name,
				flex : 2,
				sortable : true,
				rootVisible : false,
				dataIndex : 'name'
			}]
		});
		me.callParent(arguments);
	}
});
