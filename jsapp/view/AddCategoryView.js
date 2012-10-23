/*
 * File: jsapp/view/ui/CategoryTreeView.js
 * something
 */
Ext.define('MyApp.view.AddCategoryView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.addcategoryview',
	autoScroll : true,
	url : 'data/SaveForm.php',
	standardSubmit : true,
	title : lang.title.addCategory,
	bodyPadding : 10,

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'bottom',
				layout : {
					pack : 'end',
					type : 'hbox'
				},
				items : [{
					xtype : 'button',
					itemId : 'submit-button',
					text : lang.submit,
					formBind : true,
					disabled : true

				}, {
					xtype : 'button',
					text : lang.cancel,
					type : 'reset',
					handler : function() {
						this.up('form').getForm().reset();
						var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');
						currCon[0].getLayout().setActiveItem('content-panel');
						currCon[0].down('[itemId=ws-add-category]').setTitle(lang.title.addCategory);
					}
				}]
			}],
			items : [{
				xtype : 'textfield',
				fieldLabel : lang.name,
				labelWidth : 70,
				anchor : '100%',
				name : 'name',
				allowBlank : false
			}, {
				xtype : 'hidden',
				value : 'new',
				name : 'id'
			}, {
				xtype : 'textfield',
				fieldLabel : lang.parent,
				disabled : true,
				labelWidth : 70,
				anchor : '100%',
				name : 'parent'
			}, {
				xtype : 'hidden',
				name : 'parent_id'

			}, {
				xtype : 'hidden',
				name : 'actual_parent_id'

			}, {
				xtype : 'hidden',
				name : 'actual_parent_name'

			}, {
				xtype : 'hidden',
				name : 'parent_name'

			}, {
				xtype : 'hidden',
				name : 'page',
				value : 'Category'
			}, {
				xtype : 'ckeditor',
				fieldLabel : lang.description,
				labelWidth : 70,
				anchor : '100%',
				name : 'description'

			}]
		});

		me.callParent(arguments);
	}
});
