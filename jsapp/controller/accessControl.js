/*
 * File: jsapp/controller/abControl.js
 * 'userAccessModel',
 * 'userAccessStore',
 */

Ext.define('MyApp.controller.accessControl', {
	extend : 'Ext.app.Controller',

	models : ['userAccessCategoryModel', 'userRoleModel', 'newRuleCategoryModel', 'newRuleCourseModel'],
	stores : ['userAccessCategoryStore', 'userRoleStore', 'newRuleCategoryStore', 'newRuleCourseStore'],
	/*views : ['UserAccessView'],*/
	init : function() {
		this.control({
			'#userlist' : {
				select : this.onUserSelect
			},
			'#rolelist' : {
				select : this.onRoleSelect
			},
			"useraccessview button[iconCls='user-add-category']" : {
				click : this.onAddCategory
			},
			"useraccessview button[iconCls='user-add-course']" : {
				click : this.onAddCourse
			},
			"useraccessview button[iconCls='edit-permission']" : {
				toggle : this.onEditPermission
			}
		});
	},
	onUserSelect : function(me, record, index, opts) {
		var data = record.data;
		var parentField = Ext.ComponentQuery.query('useraccessview form');
		parentField[0].setTitle(data.screenname + " Access");
		var parentField = Ext.ComponentQuery.query('useraccessview form textfield[name="first_name"]');
		parentField[0].setValue(data.first_name + ' ' + data.last_name);
		parentField = Ext.ComponentQuery.query('useraccessview form textfield[name="user_email"]');
		parentField[0].setValue(data.user_email);
		parentField = Ext.ComponentQuery.query('useraccessview form textfield[name="screenname"]');
		parentField[0].setValue(data.screenname);
		parentField = Ext.ComponentQuery.query('useraccessview form hidden[name="id"]');
		parentField[0].setValue(data.id);
		
		var o = Ext.ComponentQuery.query('#new-category-role');
		if(o.length > 0){
			var newCategoryWin = o[0];
			newCategoryWin.down('textfield[name="userName"]').setValue(data.first_name + ' ' + data.last_name);
			newCategoryWin.down('textfield[name="email"]').setValue(data.user_email);
			newCategoryWin.down('textfield[name="screenName"]').setValue(data.screenname);
		}
		var o = Ext.ComponentQuery.query('#new-course-role');
		if(o.length > 0){
			var newCourseWin = o[0];
			newCourseWin.down('textfield[name="userName"]').setValue(data.first_name + ' ' + data.last_name);
			newCourseWin.down('textfield[name="email"]').setValue(data.user_email);
			newCourseWin.down('textfield[name="screenName"]').setValue(data.screenname);
		}
		var catStore = Ext.getStore('accessCategoryStore');
		catStore.proxy.extraParams.userId = data.id;
		catStore.proxy.extraParams.moduleType = 'category';
		catStore.load();
		var catStore = Ext.getStore('accessCourseStore');
		catStore.proxy.extraParams.userId = data.id;
		catStore.proxy.extraParams.moduleType = 'course';
		catStore.load();
		

	},
	onRoleSelect : function(me, record, index, opts) {
		
		var data = record.data;
		var form = Ext.ComponentQuery.query('useraccessview #role_permission');
		form[0].setTitle(data.name +" permission");
		var parentField = Ext.ComponentQuery.query('useraccessview form textfield[name="name"]');
		parentField[0].setValue(data.name);
		var parentField = Ext.ComponentQuery.query('useraccessview form hidden[name="role_id"]');
		parentField[0].setValue(data.id);
		var roleStore = Ext.getStore('accessModuleStore');
		roleStore.proxy.extraParams.roleId = data.id;
		roleStore.load();
	},
	onEditPermission : function(me, pressed, eOpts) {
		
        if(pressed) {
        	me.up('panel').getLayout().setActiveItem(1);
        } else {
            me.up('panel').getLayout().setActiveItem(0);
        }

    },
	onAddCategory : function(me, e, opts) {
		var formValues = me.up('form').getValues();
		
		if(formValues.first_name != '') {
			
			Ext.create('Ext.window.Window', {
				title : lang.newcategoryrole,
				height : 250,
				width : 300,
				id : 'new-category-role',
				layout : 'fit',
				constrain : true,
				items : {// Let's put an empty grid in just to illustrate fit layout
					xtype : 'form',
					border : false,
					bodyPadding : 10,
					scope : this,
					items : [{
						xtype : 'combobox',
						itemId : 'access-category-combo',
						fieldLabel : lang.categoryname,
						store : 'newRuleCategoryStore',
						labelWidth : 100,
						displayField : 'name',
						valueField : 'id',
						editable : false,
						queryMode : 'local',
						name : 'categoryName',
						allowBlank : false
					}, {
						xtype : 'combobox',
						fieldLabel : lang.role,
						store : 'userRoleStore',
						itemId : 'user-role-combo',
						labelWidth : 100,
						displayField : 'name',
						editable : false,
						valueField : 'id',
						queryMode : 'local',
						allowBlank : false,
						name : 'userRole'
					}, {
						xtype : 'hidden',
						name : 'page',
						value : 'accessAddCategory'

					}, {
						xtype : 'hidden',
						name : 'type',
						value : 'Category'

					}, {
						xtype : 'textfield',
						name : 'userName',
						fieldLabel : lang.name,
						labelWidth : 100,
						value : formValues.first_name,
						readOnly : true
					}, {
						xtype : 'textfield',
						name : 'email',
						fieldLabel : lang.email,
						labelWidth : 100,
						value : formValues.user_email,
						readOnly : true
					}, {
						xtype : 'textfield',
						name : 'screenName',
						fieldLabel : lang.username,
						labelWidth : 100,
						value : formValues.screenname,
						readOnly : true
					}, {
						xtype : 'hidden',
						name : 'id',
						value : formValues.id
					}],
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
							iconCls : 'submit-button',
							text : lang.submit,
							formBind : true,
							disabled : true,
							handler : function() {

								var form = this.up('form').getForm();
								var values = this.up('form').getValues();
								
								if(form.isValid()) {
									Ext.Ajax.request({
										url : 'data/userAccessForm.php',
										method : 'post',
										params : values,
										scope : me,
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
												html : lang.failure.addCategory
											}).show();
										},
										success : function(response) {
											window.msg = Ext.decode(response.responseText);
											
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
												html : window.msg.message
											}).show();
											var catStore = Ext.getStore('accessCategoryStore');
											catStore.load();
										}
									});
								}
								this.up('form').getForm().reset();
								this.up('form').up('window').close();
							}
						}, {
							xtype : 'button',
							text : lang.cancel,
							iconCls : 'cancel-button',
							type : 'reset',
							handler : function() {
								this.up('form').getForm().reset();
								this.up('form').up('window').close();
							}
						}]

					}, {
						xtype : 'toolbar',
						dock : 'top',
						layout : {
							pack : 'end',
							type : 'hbox'
						},
						items : [{
							xtype : 'cycle',
							showText : true,
							itemId : 'userAccess',
							menu : {
								id : 'view-type-menu',
								items : [{
									text : lang.name,
									iconCls : 'list-view',
									checked : true
								}, {
									text : lang.path,
									iconCls : 'tree-view'
								}]
							},
							changeHandler : function(me, activeItem) {
								var o = Ext.ComponentQuery.query('window form combobox[itemId="access-category-combo"]'), parentField = o[0];
								//condition check is required coz, the activeItem.text can be german/tamil...
								if(activeItem.text == lang.path) {
									parentField.getStore().proxy.extraParams.displayMode = "path";
								} else {
									parentField.getStore().proxy.extraParams.displayMode = "name";
								}
								parentField.getStore().load();
							}
						}]
					}]

				}
			}).show();
		} else {
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
				html : 'Please Select User Name'
			}).show();
		}

	},
	onAddCourse : function(me, e, opts) {

		var formValues = me.up('form').getValues();
		if(formValues.first_name != '') {
			Ext.create('Ext.window.Window', {
				title : lang.newcourserole,
				height : 250,
				width : 300,
				id : 'new-course-role',
				layout : 'fit',
				constrain : true,
				items : {// Let's put an empty grid in just to illustrate fit layout
					xtype : 'form',
					border : false,
					bodyPadding : 10,
					scope : this,
					items : [{
						xtype : 'combobox',
						itemId : 'access-course-combo',
						fieldLabel : lang.coursename,
						store : 'newRuleCourseStore',
						labelWidth : 100,
						displayField : 'name',
						valueField : 'id',
						editable : false,
						queryMode : 'local',
						name : 'courseName',
						allowBlank : false
					}, {
						xtype : 'combobox',
						fieldLabel : lang.role,
						store : 'userRoleStore',
						itemId : 'user-role-combo',
						labelWidth : 100,
						editable : false,
						displayField : 'name',
						valueField : 'id',
						queryMode : 'local',
						allowBlank : false,
						name : 'userRole'
					}, {
						xtype : 'hidden',
						name : 'page',
						value : 'accessAddCourse'

					}, {
						xtype : 'hidden',
						name : 'type',
						value : 'Course'

					}, {
						xtype : 'textfield',
						name : 'userName',
						fieldLabel : lang.name,
						labelWidth : 100,
						value : formValues.first_name,
						readOnly : true
					}, {
						xtype : 'textfield',
						name : 'email',
						fieldLabel : lang.email,
						labelWidth : 100,
						value : formValues.user_email,
						readOnly : true
					}, {
						xtype : 'textfield',
						name : 'screenName',
						fieldLabel : lang.username,
						labelWidth : 100,
						value : formValues.screenname,
						readOnly : true
					}, {
						xtype : 'hidden',
						name : 'id',
						value : formValues.id
					}],
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
							iconCls : 'submit-button',
							text : lang.submit,
							formBind : true,
							disabled : true,
							handler : function() {

								var form = this.up('form').getForm();
								var values = this.up('form').getValues();
								if(form.isValid()) {
									Ext.Ajax.request({
										url : 'data/userAccessForm.php',
										method : 'post',
										params : values,
										scope : me,
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
												html : lang.failure.addCategory
											}).show();
										},
										success : function(response) {
											window.msg = Ext.decode(response.responseText);
											
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
												html : window.msg.message
											}).show();
											var catStore = Ext.getStore('accessCourseStore');
											catStore.load();
										}
									});
								}
								this.up('form').getForm().reset();
								this.up('form').up('window').close();
							}
						}, {
							xtype : 'button',
							text : lang.cancel,
							iconCls : 'cancel-button',
							type : 'reset',
							handler : function() {
								this.up('form').getForm().reset();
								this.up('form').up('window').close();
							}
						}]

					}, {
						xtype : 'toolbar',
						dock : 'top',
						layout : {
							pack : 'end',
							type : 'hbox'
						},
						items : [{
							xtype : 'cycle',
							showText : true,
							itemId : 'userAccess',
							menu : {
								id : 'view-type-menu',
								items : [{
									text : lang.name,
									iconCls : 'list-view',
									checked : true
								}, {
									text : lang.path,
									iconCls : 'tree-view'
								}]
							},
							changeHandler : function(me, activeItem) {
								var o = Ext.ComponentQuery.query('window form combobox[itemId="access-course-combo"]'), parentField = o[0];
								//condition check is required coz, the activeItem.text can be german/tamil...
								if(activeItem.text == lang.path) {
									parentField.getStore().proxy.extraParams.displayMode = "path";
								} else {
									parentField.getStore().proxy.extraParams.displayMode = "name";
								}
								parentField.getStore().load();
							}
						}]
					}]

				}
			}).show();
		} else {
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
				html : 'Please Select User Name'
			}).show();
		}

	},
	createNotification : function(title, html, type, position) {
		var iconCls = (type == 'error') ? 'ux-notification-icon-error' : 'ux-notification-icon-information';
		Ext.create('Ext.ux.window.Notification', {
			hideDuration : 500,
			autoHideDelay : 7000,
			slideInAnimation : 'bounceOut',
			slideBackAnimation : 'easeIn',
			cls : 'ux-notification-light',
			stickOnClick : true,
			stickWhileHover : true,
			iconCls : iconCls,
			title : title,
			position : position,
			spacing : 20,
			html : html
		}).show();
	}
});
