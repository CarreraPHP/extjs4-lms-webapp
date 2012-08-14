Ext.define('MyApp.view.ContentFlashView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.contentflashview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	title : 'Flash - Content',
	activeItem : 0,
	layout : {
		type : 'card'
	},
	loadedData : {},
	loadRecord : function(record) {
		var str = record.data.text;
		if(!str.match("/")) {
			record.data.text = Base64.decode(record.data.text);
		}
		//record.data.text = Base64.decode(record.data.text);
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
		this.down('panel').removeAll();
		var child = {};
		child.xtype = 'flash';
		child.swfWidth = '100%';
		child.swfHeight = '100%';
		child.wmode = 'opaque';
		child.flashParams = {allowFullScreen: true};
		if(loadedData.type != 'FLASH'){
			child.flashVars = {src : loadedData.text, autoPlay : false, controlBarAutoHide: false};
			child.url = 'js/lib/player/SMP/for Flash Player 10.0/StrobeMediaPlayback.swf';
		}else{
			child.url = loadedData.text;
		}
		this.down('panel').add(child);
		//this.body.slideIn('l', {
		//  duration: 250
		//});
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'panel',
				layout: 'fit',
				autoScroll : true,
				bodyPadding : 5,
				items : [{
					xtype : 'flash',
					swfHeight: '100%',
					swfWidth: '100%',
					
					url: 'http://localhost/sabreHcode/resources/uploads/flash/rain-anime.swf',
					wmode: 'opaque'
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
										topPanel.down('panel').removeAll();
										var child = {};
										child.xtype = 'flash';
										child.swfWidth = '100%';
										child.swfHeight = '100%';
										child.wmode = 'opaque';
										child.flashParams = {allowFullScreen: true};
										if(loadedData.type != 'FLASH'){
											console.log(loadedData.type);
											child.flashVars = {src : loadedData.text, autoPlay : false, controlBarAutoHide: false};
											child.url = 'js/lib/player/SMP/for Flash Player 10.0/StrobeMediaPlayback.swf';
										}else{
											child.url = loadedData.text;
										}
										topPanel.down('panel').add(child);

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
											html : 'Flash only can be uploaded..'
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
					anchor : '100%',
					allowBlank : false,
					itemId : 'flash-file',
					emptyText : 'Select Upload File',
					fieldLabel : 'Upload File',
					name : 'flash-path',
					buttonText : 'Browse',
					buttonConfig : {
						iconCls : 'upload-icon'
					}
				}, {
					xtype : 'hiddenfield',
					name : 'page',
					fieldLabel : 'Label',
					anchor : '100%',
					value : 'Flash_Content'
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
