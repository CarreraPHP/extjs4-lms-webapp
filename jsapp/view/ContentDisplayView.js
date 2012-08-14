Ext.define('MyApp.view.ContentDisplayView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.contentdisplayview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	title : 'content',
	activeItem : 0,
	layout : {
		type : 'card'
	},
	loadedData : {},
	loadRecord : function(record) {
		//this.body.hide();
		var reg = new RegExp("\\s+");
		var result = reg.exec(record.data.text);
		if(!result){
			record.data.text = Base64.decode(record.data.text);
		}
		loadedData = record.data;
		
		var id = this.down('form').down('hidden[name="id"]');
		id.setValue(loadedData.id);
		var Description = this.down('form').down('ckeditor[name="description"]');
		Description.setValue(loadedData.text);
		this.down('panel').tpl.overwrite(this.down('panel').body, loadedData);
		//this.body.slideIn('l', {
		//  duration: 250
		//});
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'panel',
				autoScroll : true,
				bodyPadding : 5,
				data : {
					text : 'some content'
				},
				tpl : ['<div>{text}</div>'],
				// tpl : ['<iframe src="{text}"></iframe>'],
				dockedItems : [{
					xtype : 'toolbar',
					layout : {
						align : 'middle',
						pack : 'end',
						type : 'hbox'
					},
					items : [{
						xtype : 'button',
						text : 'edit',
						handler : function() {
							this.up('panel').up('panel').getLayout().setActiveItem(1);
							// console.log();
						}
					}]
				}]
			}, {
				xtype : 'form',
				autoScroll: true,
				bodyPadding: 5,
				dockedItems : [{
					xtype : 'toolbar',
					dock : 'bottom',
					layout : {
						align : 'middle',
						pack : 'end'
					},
					items : [{
						xtype : 'button',
						text : 'submit',
						handler : function() {
							var form = this.up('form').getForm();
							var values = this.up('form').getValues();
							var id = loadedData.id;
							values.description = Base64.encode(values.description);
							Ext.Ajax.request({
								url : 'data/SaveForm.php',
								method : 'post',
								params : values,
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
										html : 'Content text updated failed.'
									}).show();
								},
								success : function(response) {
									this.up('form').up('panel').down('panel').tpl.overwrite(this.up('form').up('panel').down('panel').body, {
										text : Base64.decode(values.description)
									});
									this.up('form').up('panel').getLayout().setActiveItem(0);

									Ext.create('Ext.ux.window.Notification', {
										hideDuration : 500,
										autoHideDelay : 7000,
										slideInAnimation : 'bounceOut',
										slideBackAnimation : 'easeIn',
										cls : 'ux-notification-light',
										stickOnClick : true,
										stickWhileHover : true,
										title : 'Category',
										position : 't',
										spacing : 20,
										iconCls : 'ux-notification-icon-information',
										html : 'Content text sucessfully Updated.'
									}).show();

								}
							});
						}
					}, {
						xtype : 'button',
						text : lang.cancel,
						type : 'reset',
						handler : function() {
							var values = this.up('form').getValues();
							//this.up('form').getForm().reset();
							//console.log(Ext.getStore(values.course_id + '-grid-panelstore'));
							var record = this.up('form').up('panel').up('panel').down('contentgridview').getStore().getById(values.id);
							var Description = this.up('form').down('ckeditor[name="description"]');
							Description.setValue(record.data.text);
							//this.up('form').loadRecord(record);
							this.up('form').up('panel').getLayout().setActiveItem(0);
						}
					}]
				}],
				items : [{
					xtype : 'ckeditor',
					labelWidth : 0,
					anchor : '100%',
					width: 300,
					height: 500,
					name : 'description'
				}, {
					xtype : 'hiddenfield',
					name : 'page',
					fieldLabel : 'Label',
					anchor : '100%',
					value : 'content'
				},{
					xtype : 'hiddenfield',
					name : 'id',
					fieldLabel : 'Label',
					anchor : '100%'
				},{
					xtype : 'hiddenfield',
					name : 'course_id',
					fieldLabel : 'Label',
					anchor : '100%'
				}],
			}]
		});

		me.callParent(arguments);
	}
});
