/*
 * File: jsapp/view/ui/CategoryTreeView.js
 */
Ext.define('MyApp.view.AddCourseView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.addcourseview',
	autoScroll : true,
	url : 'data/SaveForm.php',
	title : lang.title.addCourse,
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
					text : lang.submit,
					itemId :'submit-button',
					formBind : true, //only enabled once the form is valid
					disabled : true
					
				}, {
					xtype : 'button',
					text : lang.cancel,
					type : 'reset',
					handler : function() {
						this.up('form').getForm().reset();
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
				value: 'new',
				name : 'id'
			}, {
				xtype : 'textfield',
				fieldLabel : lang.category,
				disabled : true,
				labelWidth : 70,
				anchor : '100%',
				name : 'category'
			}, {
				xtype : 'hidden',
				name : 'category_id'
			},{
				xtype : 'hidden',
				name : 'actual_category_id'
			},{
				xtype : 'hidden',
				name : 'actual_category_name'
			},{
				xtype : 'hidden',
				name : 'category_name'
			},{
				xtype : 'hidden',
				name : 'page',
				value : 'Course'
			}, {
				xtype : 'ckeditor',
				fieldLabel : lang.description,
				name : 'description',
				labelWidth : 70,
				anchor : '100%'
			}]
		});

		me.callParent(arguments);
	}
});
