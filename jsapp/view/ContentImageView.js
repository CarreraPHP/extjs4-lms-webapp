Ext.define('MyApp.view.ContentImageView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.contentimageview',
	title : 'Image - Content',
	activeItem : 0,
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	layout : {
		type : 'card'
	},
	loadedData : {},
	loadRecord : function(record) {
		var str = record.data.text;
		if(!str.match("/")) {
			record.data.text = Base64.decode(record.data.text);
		}

		loadedData = record.data;

		var id = this.down('form').down('hidden[name="id"]');
		id.setValue(loadedData.id);
		var contentType = this.down('form').down('hidden[name="contentType"]');
		contentType.setValue(loadedData.type);
		var course_name = this.down('form').down('textfield[name="course_name"]');
		course_name.setValue(loadedData.course_name);
		var TopicName = this.down('form').down('textfield[name="topicName"]');
		TopicName.setValue(loadedData.topicName);
		var contentName = this.down('form').down('hidden[name="contentName"]');
		contentName.setValue(loadedData.name);
		this.down('panel').down('image').setSrc(loadedData.text);
		//this.body.slideIn('l', {
		//  duration: 250
		//});
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'panel',
				layout : 'fit',
				autoScroll : false,
				bodyPadding : 5,
				items : [{
					xtype : 'image',
					maxWidth : '200',
					maxHeight : '200'
				}],
				dockedItems : [{
					xtype : 'toolbar',
					layout : {
						align : 'middle',
						pack : 'end',
						type : 'hbox'
					},
					items : [{
						xtype : 'button',
						text : lang.edit,
						iconCls : 'edit-button',
						handler : function() {
							this.up('panel').up('panel').getLayout().setActiveItem(1);
							// console.log();
						}
					}]
				}]
			}, {
				xtype : 'form',
				autoScroll : true,
				bodyPadding : 5,
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

							if(form.isValid()) {
								form.submit({
									scope : this,
									url : 'data/SaveForm.php',
									method : 'post',
									//waitMsg: 'Uploading your pdf...',
									success : function(form, result) {
										var topPanel = this.up('form').up('panel');
										var values = Ext.decode(result.response.responseText);
										var text = values.url;
										topPanel.down('panel').down('image').setSrc(loadedData.text);
										topPanel.getLayout().setActiveItem(0);
										topPanel.down('panel').doLayout();
										var record = topPanel.up('panel').down('contentgridview').getStore().load();
									},
									failure : function(form, result) {
										Ext.create('Ext.ux.window.Notification', {
											hideDuration : 500,
											autoHideDelay : 7000,
											slideInAnimation : 'bounceOut',
											slideBackAnimation : 'easeIn',
											cls : 'ux-notification-light',
											stickOnClick : true,
											stickWhileHover : true,
											iconCls : 'ux-notification-icon-error',
											title : lang.selection,
											position : 't',
											spacing : 20,
											html : 'Images only can be uploaded..'
										}).show();
									}
								});
							}
						}
					}, {
						xtype : 'button',
						text : lang.cancel,
						type : 'reset',
						handler : function() {
							var values = this.up('form').getValues();
							//this.up('form').getForm().reset();
							//console.log(Ext.getStore(values.course_id + '-grid-panelstore'));
							var record = this.up('form').up('panel').up('panel').down('contentgridview').getStore().load();
							//var Description = this.up('form').down('ckeditor[name="description"]');
							//Description.setValue(record.data.text);
							//this.up('form').loadRecord(record);

							this.up('form').up('panel').getLayout().setActiveItem(0);
							this.up('form').up('panel').down('panel').doLayout();
						}
					}]
				}],
				items : [{
					xtype : 'textfield',
					fieldLabel : 'Course Name',
					anchor : '100%',
					disabled : true,
					name : 'course_name'
				}, {
					xtype : 'textfield',
					fieldLabel : 'Topic Name',
					anchor : '100%',
					disabled : true,
					name : 'topicName'
				}, {
					xtype : 'filefield',
					allowBlank : false,
					id : 'image-file',
					anchor : '100%',
					emptyText : 'Select an image',
					fieldLabel : 'Image',
					name : 'image-path',
					buttonText : 'Browse',
					buttonConfig : {
						iconCls : 'upload-icon'
					}
				}, {
					xtype : 'hiddenfield',
					name : 'page',
					fieldLabel : 'Label',
					anchor : '100%',
					value : 'Image_Content'
				}, {
					xtype : 'hiddenfield',
					name : 'id',
					fieldLabel : 'Label',
					anchor : '100%'
				}, {
					xtype : 'hiddenfield',
					name : 'contentName',
					fieldLabel : 'Label',
					anchor : '100%'
				}, {
					xtype : 'hiddenfield',
					name : 'contentType',
					fieldLabel : 'Label',
					anchor : '100%'
				}],
			}]
		});

		me.callParent(arguments);
	}
});
