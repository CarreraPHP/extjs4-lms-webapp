/*
 * File: jsapp/view/loginView.js
 * developed by siva
 *
 */

Ext.define('MyApp.view.ContentFullScreenView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.contentfullscreenview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	frame : false,
	layout : {
		type : 'border'
	},
	//bodyPadding : 5,
	autoScroll : false,
	currentGrid: '',
	loadedData : {},
	SelectedRecord : {},
	loadRecord : function(record) {
		//this.body.hide();

		if(record.data.type == 'HTML') {
			var reg = new RegExp("\\s+");
			var result = reg.exec(record.data.text);
			if(!result) {
				record.data.text = Base64.decode(record.data.text);
			}
		} else {
			var str = record.data.text;
			if(!str.match("/")) {
				record.data.text = Base64.decode(record.data.text);
			}
		}
		loadedData = record.data;
		if(loadedData.type == 'HTML') {
			this.down('panel').getLayout().setActiveItem(1);
			this.down('panel').down('#htmlContent').tpl.overwrite(this.down('panel').down('#htmlContent').body, loadedData);
		} else if(loadedData.type == 'PDF') {
			this.down('panel').getLayout().setActiveItem(3);
			this.down('panel').down('#pdfContent').tpl.overwrite(this.down('panel').down('#pdfContent').body, loadedData);
		} else if(loadedData.type == 'IMAGE') {
			this.down('panel').getLayout().setActiveItem(2);
			this.down('panel').down('image').setSrc(loadedData.text);
		} else if(loadedData.type == 'FLASH' || loadedData.type == 'VIDEO' || loadedData.type == 'AUDIO') {
			this.down('panel').getLayout().setActiveItem(0);
			this.down('panel').down('#flashContent').removeAll();
			var child = {};
			child.xtype = 'flash';
			child.swfWidth = '100%';
			child.swfHeight = '100%';
			child.wmode = 'opaque';
			child.flashParams = {
				allowFullScreen : true
			};
			if(loadedData.type != 'FLASH') {
				child.flashVars = {
					src : loadedData.text,
					autoPlay : false,
					controlBarAutoHide : false
				};
				child.url = 'js/lib/player/SMP/for Flash Player 10.0/StrobeMediaPlayback.swf';
			} else {
				child.url = loadedData.text;
			}
			this.down('panel').down('#flashContent').add(child);

			//this.down('panel').getLayout().setActiveItem(2);
			//this.down('panel').down('image').setSrc(loadedData.text);*/
		}

		var o = Ext.ComponentQuery.query('contentfullscreenview container'), cont = o[0];
		appArr = Ext.ComponentQuery.query('#title');
		appViewInstance = appArr[0];
		appViewInstance.tpl.overwrite(appViewInstance.el, loadedData);

	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : 'panel',
				bodyPadding : 5,
				region : 'center',
				split : true,
				autoScroll : true,
				layout : 'card',
				items : [{
					xtype : 'panel',
					layout : 'fit',
					itemId : 'flashContent',
					autoScroll : true,
					bodyPadding : 5,
					items : [{
						xtype : 'flash',
						swfHeight : '100%',
						swfWidth : '100%',
						//url : 'http://localhost/sabreHcode/resources/uploads/flash/rain-anime.swf',
						wmode : 'opaque'
					}]
				}, {
					xtype : 'panel',
					itemId : 'htmlContent',
					autoScroll : true,
					bodyPadding : 5,
					tpl : ['<div>{text}</div>'],
				}, {
					xtype : 'panel',
					layout : 'fit',
					itemId : 'imageContent',
					autoScroll : false,
					bodyPadding : 5,
					items : [{
						xtype : 'image',
						maxWidth : '200',
						maxHeight : '200'
					}]
				}, {
					xtype : 'panel',
					itemId : 'pdfContent',
					autoScroll : false,
					bodyPadding : 5,
					tpl : ['<iframe width="100%" height="100%" src="{text}"></iframe>']
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
					}, {
						xtype : 'tbseparator'
					}, {
						xtype : 'button',
						text : 'prev',
						iconCls : 'prev-button',
						handler : function() {
							console.log(me.currentGrid);
							var o = Ext.ComponentQuery.query('contentgridview' + (typeof me.currentGrid != "undefined" ? '#' + me.currentGrid : '')), grid = o[0];
							var index = grid.getStore().indexOf(me.SelectedRecord);
							var storeCount = grid.getStore().getCount();
							var rIndex = index - 1;
							var pIndex = -1;
							if(rIndex == 0) {
								this.disable(true);
							}
							if(rIndex < storeCount) {
								var o = Ext.ComponentQuery.query('contentfullscreenview button[iconCls="next-button"]'), but = o[0];
								but.enable(true);
							}
							if(rIndex > pIndex) {
								var rec = grid.getStore().getAt(index - 1);
								me.SelectedRecord = rec;
								me.loadRecord(rec);
							}

						}
					}, '->', {
						xtype : 'container',
						itemId : 'title',
						tpl : ['<div><b>{name}</b></div>']
					}, '->', {
						xtype : 'button',
						text : 'next',
						iconCls : 'next-button',
						handler : function() {
							var o = Ext.ComponentQuery.query('contentgridview' + (typeof me.currentGrid != "undefined" ? '#' + me.currentGrid : '')), grid = o[0];
							var index = grid.getStore().indexOf(me.SelectedRecord);
							var storeCount = grid.getStore().getCount();
							var rIndex = index + 1;
							if(rIndex == storeCount - 1) {
								this.disable(true);
							}
							if(storeCount - 1 == 0) {
								this.disable(true);
							}
							if(rIndex < storeCount) {
								var rec = grid.getStore().getAt(index + 1);
								console.log(rec);
								me.SelectedRecord = rec;
								me.loadRecord(rec);
								var o = Ext.ComponentQuery.query('contentfullscreenview button[iconCls="prev-button"]'), but = o[0];
								but.enable(true);
							}
						}
					}, {
						xtype : 'tbseparator'
					}, {
						xtype : 'button',
						text : lang.refresh,
						scope : this,
						iconCls : 'refresh-button',
						handler : function() {
							// do refresh
							var o = Ext.ComponentQuery.query('contentgridview' + (typeof me.currentGrid != "undefined" ? '#' + me.currentGrid : '')), grid = o[0];
							var index = grid.getStore().indexOf(me.SelectedRecord);
							var rec = grid.getStore().getAt(index);
							me.SelectedRecord = rec;
							me.loadRecord(rec);
						}
					}]
				}]

			}]
		});

		me.callParent(arguments);
	}
});
