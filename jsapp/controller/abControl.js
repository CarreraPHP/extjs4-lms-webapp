/*
 * File: jsapp/controller/abControl.js
 */

Ext.define('MyApp.controller.abControl', {
    extend : 'Ext.app.Controller',

    models : ['menuModel', 'searchModel', 'searchcontentModel', 'userAccessModel'],
    stores : ['menuStore', 'searchStore', 'searchcontentStore', 'userAccessStore'],
    views : ['applicationBase', 'AddCategoryView', 'AddTopicView', 'AddCourseView', 'loginView', 'advancesearchView', 'UserAccessView'],
    init : function() {
        // console.log(this);
        this.checkSession();

        this.control({
            // 'abviewport dataview' : {
            // itemclick : this.onAddCategoryViewPanel
            // },
            "#application-base" : {
                afterlayout : this.onapplicationBaseCardChange
            },
            "abviewport #search-combo" : {
                select : this.onSearchComboSelect
            },
            "abviewport button[itemId='logout']" : {
                click : this.onLogout
            },
            'advancesearchview button[itemId="advsearch"]' : {
                click : this.advanceSearch
            },
            'advancesearchview gridpanel' : {
                selectionchange : this.onContentSelectionChange
            },
            "abviewport button[itemId='advancedSearch']" : {
                toggle : this.onSearch
            },
            "abviewport button[itemId='userAccess']" : {
                toggle : this.onUserAccess
            },
            "loginview button[itemId='register']" : {
                click : this.onRegister
            },
            "loginview button[itemId='login']" : {
                click : this.onLoginSubmit,
                beforeactivate : this.onViewportActivate
            },
            "loginview textfield[name='username']" : {
                keypress : this.onloginEnter
            },
            "loginview textfield[name='password']" : {
                keypress : this.onloginEnter
            }
        });
    },
    catWin : null,
    onSearchComboSelect : function(combo, recordArray, opts) {
        this.createNotification("development", "combo select", 'information', 't');

        Ext.Array.each(recordArray, function(record, index, countriesItSelf) {
            // console.log(record);

            // console.log(Ext.ComponentQuery.query('#' + record.data.id + '-tab-panel'));

            // var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');
            // var courseTabPanel = currCon.down('#' + record.data.id + '-tab-panel');

            var parentContainer = Ext.ComponentQuery.query('#content-panel');

            var re = /cou([0-9]+)/ig, result = re.exec(record.data.id);

            if(result) {
                var selObj = parentContainer[0].down('#' + record.data.id + '-tab-panel');

                if(selObj == null) {
                    var child = Ext.create('MyApp.view.ContentGridView', {
                        region : 'center',
                        split : false,
                        border : true,
                        itemId : record.data.id + '-grid-panel',
                        store : Ext.create('MyApp.store.contentStore', {
                            storeId : this.itemId + 'store'
                        }),
                        closable : false
                    });
                    child.store.proxy.extraParams.parent = record.data.id;
                    child.store.load();

                    parentContainer[0].add(Ext.create('Ext.tab.Panel', {
                        items : [{
                            xtype : 'panel',
                            title : 'content list',
                            layout : {
                                align : 'stretch',
                                type : 'border',
                                padding : 5
                            },
                            flex : 1,
                            items : [child, {
                                xtype : 'panel',
                                region : 'south',
                                height : 200,
                                border : true,
                                preventHeader : true,
                                animCollapse : true,
                                collapseMode : 'mini',
                                collapsible : true,
                                collapsed : true,
                                split : true,
                                tpl : ['<div>', '<div> Course: {course_name} </div>', '<div> Topic: {topicName} </div>', '<div> title: {name} </div>', '<div> Description: {description} </div>',
                                /*'<div> Preview: <br/> {text} </div>',*/
                                '</div>'],
                                html : 'description'
                            }]
                        }],
                        border : false,
                        itemId : record.data.id + '-tab-panel',
                        title : record.data.name,
                        closable : true
                    }));
                    selObj = child;
                }
                parentContainer[0].getLayout().setActiveItem(record.data.id + '-tab-panel');

                var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');
                currCon[0].getLayout().setActiveItem('content-panel');

                parentContainer[0].doLayout();
                selObj.doLayout();
            } else {
                this.createNotification(lang.selection, lang.failure.courseselection, 'error', 't');
            }

        // if(!courseTabPanel){
        // // courseTabPanel = Ext
        // }

        }, this);

        combo.reset();
    },
    advanceSearch : function(me, e, opts) {
        var form = me.up('form').getForm();
        var values = me.up('form').getValues();
        var gridpanel = me.up('form').up('container').down('gridpanel');
        if(form.isValid()) {

            var store = gridpanel.getStore();
            store.proxy.extraParams = values;
            store.load({
                params : {
                    start : 0,
                    limit : 10
                }
            });
        }
    },
    onContentSelectionChange : function(model, selectedModel, opts) {
        Ext.Array.each(selectedModel, function(record, index, instance) {
            var reg = new RegExp("new");
            var result = reg.exec(record.data.id);

        });
    },
    onapplicationBaseCardChange : function(me, layout, opts) {
    	
    	// console.log(me);

        var selItem = layout.getActiveItem();
        var northArr = Ext.ComponentQuery.query('abviewport toolbar[region="north"]'), northRegion = northArr[0];

        if(selItem.itemId != 'login-view-card') {

            northRegion.down('button[iconCls="logout-button"]').show();
            if(window.user.data[0].role_id == 1) {
                northRegion.down('button[iconCls="user-access"]').show();
            }
            northRegion.down('button[itemId="advancedSearch"]').show();
            northRegion.down('combo[itemId="search-combo"]').show();
            northRegion.down('tbseparator').show();

        } else {
            northRegion.down('button[iconCls="logout-button"]').hide();
            northRegion.down('button[iconCls="user-access"]').hide();
            northRegion.down('button[itemId="advancedSearch"]').hide();
            northRegion.down('combo[itemId="search-combo"]').hide();
            northRegion.down('tbseparator').hide();

        }
        northRegion.doLayout();
    },
    onLogout : function() {
        Ext.Ajax.request({
            url : 'data/session/User.php',
            method : 'post',
            type : 'json',
            params : {
                "type" : "logout"
            },
            scope : this,
            failure : function(response) {
                this.createNotification(lang.logout, lang.failure.logout, 'error', 't');
            },
            success : function(response) {
            	window.location = "index.php";
               /* var logResponse = Ext.decode(response.responseText);
                if(logResponse.success) {
                    window.user = '';
                    var appArr = Ext.ComponentQuery.query('abviewport container[region="center"]');
                    var appViewInstance = appArr[0];
                    appViewInstance.getLayout().setActiveItem('login-view-card');
                    
                    var userProfileGrid = appViewInstance.down('#user-profile-grid');
                    userProfileGrid.setSource({});
                    
                    this.createNotification(lang.logout, logResponse.message, 'information', 't');

                    var appArr = Ext.ComponentQuery.query('#login-detail-label');

                    var appViewInstance = appArr[0];
                    appViewInstance.tpl.overwrite(appViewInstance.el, {
                        screenname : window.user ? lang.welcome + ', ' + window.user.data[0].screenname : lang.guest
                    });
                    var northArr = Ext.ComponentQuery.query('abviewport container[region="north"]'), northRegion = northArr[0];

                    northRegion.doLayout();
                }*/
            }
        });
    },
    onSearch : function(me, pressed, opts) {

        var appArr = Ext.ComponentQuery.query('abviewport container[region="center"]');
        var appViewInstance = appArr[0];
        if(pressed) {
            appViewInstance.getLayout().setActiveItem('advancesearch-view-card');
            var getForm = appViewInstance.getLayout().getActiveItem('advancesearch-view-card');
        } else {
            appViewInstance.getLayout().setActiveItem('ws-view-card');
        }

    },
    onUserAccess : function(me, pressed, eOpts) {
        var appArr = Ext.ComponentQuery.query('abviewport container[region="center"]');
        var appViewInstance = appArr[0];
        if(pressed) {
            appViewInstance.getLayout().setActiveItem('useraccess-view-card');
        } else {
        	console.log(appViewInstance.getLayout().setActiveItem('ws-view-card'));
            appViewInstance.getLayout().setActiveItem('ws-view-card');
        }

    },
    checkSession : function() {
        Ext.Ajax.request({
            url : 'data/session/User.php',
            method : 'GET',
            params : {
                module : 'session'
            },
            type : 'json',
            scope : this,
            failure : function(response) {
                Ext.Msg.alert('No New Record Insert', Ext.emptyFn);
            },
            success : function(response) {
                window.user = Ext.decode(response.responseText);

                if(window.user.success) {
                    if(window.user.data) {
                        var appArr = Ext.ComponentQuery.query('abviewport container[region="center"]');
                        var appViewInstance = appArr[0];
                        appViewInstance.getLayout().setActiveItem('ws-view-card');
                        
                        var userProfileGrid = appViewInstance.down('#user-profile-grid');
                        
                        userProfileGrid.setSource((window.user.data[0]) ? this.formatUserData(window.user.data[0]) : {});
                        
                        //console.log(window.user.data[0]);

                        appArr = Ext.ComponentQuery.query('#login-detail-label');
                        appViewInstance = appArr[0];
                        appViewInstance.tpl.overwrite(appViewInstance.el, {
                            screenname : window.user ? lang.welcome + ', ' + window.user.data[0].screenname : lang.guest
                        });
                        
                        var northArr = Ext.ComponentQuery.query('abviewport container[region="north"]'), northRegion = northArr[0];
                        northRegion.doLayout();
                    }
                }
            }
        });
    },
    onloginEnter : function(me, e, opts) {
        if(e.getKey() == e.ENTER) {
            this.onLoginSubmit(me, e, opts);
        }
    },
    onRegister : function(me, e, opts) {
        var form = me.up('form').getForm();
        var values = me.up('form').getValues();
        Ext.Msg.prompt('Confirm Password', 'Please enter confirm password:', function(btn, text) {
            if(btn == 'ok') {
                if(values.password == text) {
                    Ext.Ajax.request({
                        url : 'data/session/User.php',
                        method : 'post',
                        type : 'json',
                        params : {
                            "username" : values.username,
                            "password" : values.password,
                            "type" : "register"
                        },
                        scope : me,
                        failure : function(response) {
                            Ext.Msg.alert('No New Record Insert', Ext.emptyFn);
                        },
                        success : function(response) {
                            window.user = Ext.decode(response.responseText);
                            if(window.user.success) {
                                if(window.user.data) {
                                    var appArr = Ext.ComponentQuery.query('abviewport container[region="center"]'), appViewInstance = appArr[0];
                                    appViewInstance.getLayout().setActiveItem('ws-view-card');
                                                                        
                                    var userProfileGrid = appViewInstance.down('#user-profile-grid');
                                    userProfileGrid.setSource(window.user.data);

                                    var appArr = Ext.ComponentQuery.query('#login-detail-label'), appViewInstance = appArr[0];
                                    appViewInstance.tpl.overwrite(appViewInstance.el, {
                                        screenname : window.user ? lang.welcome + ', ' + window.user.data[0].screenname : lang.guest
                                    });
                                    var northArr = Ext.ComponentQuery.query('abviewport container[region="north"]'), northRegion = northArr[0];
                                    northRegion.doLayout();
                                }

                                this.createNotification(lang.login, lang.success.login, 'information', 't');
                            } else {
                                this.createNotification(lang.login, lang.failure.login, 'error', 't');
                            }
                        }
                    });
                } else {
                    this.createNotification(lang.register, lang.failure.register, 'error', 't');
                }
            }
        });
    },
    onLoginSubmit : function(me, e, opts) {
        var form = me.up('form').getForm();
        var values = me.up('form').getValues();
        if(form.isValid()) {
            Ext.Ajax.request({
                url : 'data/session/User.php',
                method : 'post',
                type : 'json',
                params : {
                    "username" : values.username,
                    "password" : values.password,
                    "type" : "login"
                },
                scope : this,
                failure : function(response) {
                    Ext.Msg.alert('No New Record Insert', Ext.emptyFn);
                },
                success : function(response) {
                    window.user = Ext.decode(response.responseText);
                    console.log(window.user);
                    if(window.user.success) {
                        if(window.user.data) {
                            var appArr = Ext.ComponentQuery.query('abviewport container[region="center"]'), appViewInstance = appArr[0];
                            appViewInstance.getLayout().setActiveItem('ws-view-card');
                                                        
                            var userProfileGrid = appViewInstance.down('#user-profile-grid');
                            userProfileGrid.setSource((window.user.data[0]) ? this.formatUserData(window.user.data[0]) : {});

                            var appArr = Ext.ComponentQuery.query('#login-detail-label'), appViewInstance = appArr[0];
                            appViewInstance.tpl.overwrite(appViewInstance.el, {
                                screenname : window.user ? lang.welcome + ', ' + window.user.data[0].screenname : lang.guest
                            });
                            var northArr = Ext.ComponentQuery.query('abviewport container[region="north"]'), northRegion = northArr[0];
                            northRegion.doLayout();
                        }

                        this.createNotification(lang.login, lang.success.login, 'information', 't');
                    } else {
                        this.createNotification(lang.login, lang.failure.login, 'error', 't');
                    }
                }
            });

        }
    },
    formatUserData : function(user) {
    	console.log(user);
    	var userData = '{"' + lang.firstname + '" : "' + user.first_name + '", "' + lang.lastname + '" : "' + user.last_name + '", "' + lang.email + '" : "' + user.user_email + '", "' + lang.username + '" : "' + user.screenname + '", "' + lang.role + '" : "' + user.role_name + '"}';
        var user = Ext.decode(userData);
        return user;
    },
    onViewportActivate : function(abstractcomponent, options) {
        var layoutInstance = abstractcomponent.getLayout();
    //console.log(layoutInstance);
    // layoutInstance.setActiveItem('wscard');
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
