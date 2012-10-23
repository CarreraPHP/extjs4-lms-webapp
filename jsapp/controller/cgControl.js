Ext.define('MyApp.controller.cgControl', {
    extend : 'Ext.app.Controller',

    models : [],
    stores : [],
    refs : [{
        ref : 'contQuiz',
        selector : 'panel#content-quiz'
    }],
    /*views : ['UserAccessView'],*/ 
    init : function() {
        this.control({
            'contentgridview button[itemId="topic-button"]' : {
                click : this.addTopic
            },
            'contentgridview button[itemId="forumButton"]' : {
                click : this.forumView
            },
            'contentgridview' : {
                //selectionchange : this.onContentSelectionChange,
                itemcontextmenu : this.onContentRightClick,
                groupcontextmenu : this.onTopicRightClick
            },
            'contentforumview button[itemId="AddForum"]' : {
                click : this.addForum
            },
            'forumthreadview button[iconCls="reply-button"]' : {
                click : this.replyForum
            },
            'contentforumview #forumTopic' : {
                selectionchange : this.onForumTopicSelectionChange
            },
            'forumthreadview #replythread' : {
                itemcontextmenu : this.onForumSelect
            }
        });
    },
    addTopic : function(me, e, opts) {
        var treeInstanceArr = Ext.ComponentQuery.query('categorytreeview');
        var recordArr = treeInstanceArr[0].getSelectionModel().selected.items;

        var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');

        if(recordArr.length > 0) {
            Ext.Array.each(recordArr, function(record) {
                var data = record.data;

                if(data.leaf) {
                    if(!currCon[0].down('[itemId=ws-add-topic]')) {
                        currCon[0].add(Ext.create('MyApp.view.AddTopicView', {
                            itemId : 'ws-add-topic'
                        }));
                    }

                    var parentField = Ext.ComponentQuery.query('#ws-add-topic form textfield[name="course"]');
                    parentField[0].setValue(data.name);
                    parentField = Ext.ComponentQuery.query('#ws-add-topic form hidden[name="course_id"]');
                    parentField[0].setValue(data.id);
                    parentField = Ext.ComponentQuery.query('#ws-add-topic hidden[name="id"]');
                    parentField[0].setValue('new');
                    currCon[0].getLayout().setActiveItem('ws-add-topic');

                }
            });
        }
    },
    forumView : function(me, e, opts) {
        var treeInstanceArr = Ext.ComponentQuery.query('categorytreeview');
        var recordArr = treeInstanceArr[0].getSelectionModel().selected.items;
        var record = recordArr[0];
        var grid = me.up('contentgridview');
        var parentTab = grid.view.up('tabpanel');
        var forumComponent = parentTab.down('#' + parentTab.itemId + '-forum');
        if(!forumComponent) {
            forumComponent = Ext.create('MyApp.view.ContentForumView', {
                itemId : parentTab.itemId + '-forum',
                title : record.data.name + ' ' + lang.forum,
                closable : true,
                store : Ext.create('MyApp.store.forumStore', {
                    storeId : parentTab.itemId + '-forum-store'
                })
            });

            parentTab.add(forumComponent);
            forumComponent.store.proxy.extraParams.parent = record.data.instanceid;
            forumComponent.store.load();
        }
        parentTab.getLayout().setActiveItem(parentTab.itemId + '-forum');
        forumComponent.doLayout();
        parentTab.doLayout();

    },

    onForumSelect : function(me, record, item, index, e, opts) {
        e.preventDefault();
        x = e.browserEvent.clientX;
        y = e.browserEvent.clientY;
        e.stopEvent();
        var menu = Ext.create('Ext.menu.Menu', {
            items : [{
                text : lang.preview,
                iconCls : 'preview-button',
                itemId : 'content-preview',
                scope : this,
                handler : function() {
                    var reg = new RegExp("new");
                    var result = reg.exec(record.data.id);
                    var grid = me.up('contentgridview');
                    if(grid.coursePermission.read == true || record.raw.permission.read == true) {
                        if(!result) {
                            var o = Ext.ComponentQuery.query('#' + record.data.course_id + '-grid-panel'), grid = o[0];
                            console.log(grid.up('panel'));
                            var descpanel = grid.up('panel').down('panel[region="south"]');
                            descpanel.setAutoScroll(false);
                            descpanel.setTitle(record.data.name);
                            reg = new RegExp("\\s");
                            result = reg.exec(record.data.text);
                            if(!result) {
                                record.data.text = Base64.decode(record.data.text);
                            }
                            descpanel.tpl.overwrite(descpanel.body, record.data);
                            descpanel.expand();
                        } else {
                            // createNotification function is not accessible here as the scope is on the view.
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
                                html : lang.failure.contentselection
                            }).show();
                        }
                    } else {
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
                            html : lang.failure.contentPermission
                        }).show();
                    }
                }
            }, {
                text : lang.newTab,
                iconCls : 'newTab-button',
                itemId : 'content-newTab',
                scope : this,
                handler : function() {
                    var grid = me.up('contentgridview');
                    var parentTab = grid.view.up('tabpanel');
                    var childComponent;

                    if(grid.coursePermission.read == true || record.raw.permission.read == true) {
                        childComponent = parentTab.down('#' + parentTab.itemId + '-content-' + record.data.id);
                        //console.log(record.data.type);
                        if(!childComponent) {

                            if(record.data.type == 'HTML') {
                                childComponent = Ext.create('MyApp.view.ContentDisplayView', {
                                    itemId : parentTab.itemId + '-content-' + record.data.id,
                                    title : record.data.name,
                                    closable : true
                                });
                            } else if(record.data.type == 'PDF') {
                                childComponent = Ext.create('MyApp.view.ContentPdfView', {
                                    itemId : parentTab.itemId + '-content-' + record.data.id,
                                    title : record.data.name,
                                    closable : true
                                });
                            } else if(record.data.type == 'IMAGE') {
                                childComponent = Ext.create('MyApp.view.ContentImageView', {
                                    itemId : parentTab.itemId + '-content-' + record.data.id,
                                    title : record.data.name,
                                    closable : true
                                });
                            } else if(record.data.type == 'FLASH' || record.data.type == 'VIDEO' || record.data.type == 'AUDIO') {
                                childComponent = Ext.create('MyApp.view.ContentFlashView', {
                                    itemId : parentTab.itemId + '-content-' + record.data.id,
                                    title : record.data.name,
                                    closable : true
                                });
                            }

                            parentTab.add(childComponent);
                        }
                        if(parentTab.down('#' + parentTab.itemId + '-content-' + record.data.id)) {
                            parentTab.getLayout().setActiveItem(parentTab.itemId + '-content-' + record.data.id);
                        }

                        childComponent.loadRecord(record);
                        childComponent.doLayout();
                        parentTab.doLayout();
                    } else {
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
                            html : lang.failure.contentPermission
                        }).show();
                    }
                }
            }]
        });
        menu.showAt(e.xy);

    },

    onContentRightClick : function(me, record, item, index, e, opts) {
        var grid = me.up('panel.contentgridview');
        e.preventDefault();
        x = e.browserEvent.clientX;
        y = e.browserEvent.clientY;
        e.stopEvent();
        var menu = Ext.create('Ext.menu.Menu', {
            items : [{
                text : lang.preview,
                iconCls : 'preview-button',
                itemId : 'content-preview',
                scope : this,
                handler : function() {
                    var reg = new RegExp("new");
                    var result = reg.exec(record.data.id);
                    if(grid.coursePermission.read == true || record.raw.permission.read == true) {
                        if(!result) {
                            var o = Ext.ComponentQuery.query('#' + record.data.course_id + '-grid-panel'), grid = o[0];
                            //							console.log(grid.up('panel'));
                            var descpanel = grid.up('panel').down('panel[region="south"]');
                            descpanel.setAutoScroll(false);
                            descpanel.setTitle(record.data.name);
                            reg = new RegExp("\\s");
                            result = reg.exec(record.data.text);
                            if(!result) {
                                record.data.text = Base64.decode(record.data.text);
                            }
                            descpanel.tpl.overwrite(descpanel.body, record.data);
                            descpanel.expand();
                        } else {
                            // createNotification function is not accessible here as the scope is on the view.
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
                                html : lang.failure.contentselection
                            }).show();
                        }
                    } else {
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
                            html : lang.failure.contentPermission
                        }).show();
                    }
                }
            }, {
                text : lang.newTab,
                iconCls : 'newTab-button',
                itemId : 'content-newTab',
                scope : this,
                handler : function() {
                    var parentTab = grid.view.up('tabpanel');
                    console.log(parentTab);
                    var childComponent;
                    //					console.log(grid.coursePermission);
                    if(grid.coursePermission.read == true || record.raw.permission.read == true) {
                        childComponent = parentTab.down('#' + parentTab.itemId + '-content-' + record.data.id);
                        //console.log(record.data.type);
                        if(!childComponent) {

                            if(record.data.type == 'HTML') {
                                childComponent = Ext.create('MyApp.view.ContentDisplayView', {
                                    itemId : parentTab.itemId + '-content-' + record.data.id,
                                    title : record.data.name,
                                    closable : true
                                });
                            } else if(record.data.type == 'PDF') {
                                childComponent = Ext.create('MyApp.view.ContentPdfView', {
                                    itemId : parentTab.itemId + '-content-' + record.data.id,
                                    title : record.data.name,
                                    closable : true
                                });
                            } else if(record.data.type == 'IMAGE') {
                                childComponent = Ext.create('MyApp.view.ContentImageView', {
                                    itemId : parentTab.itemId + '-content-' + record.data.id,
                                    title : record.data.name,
                                    closable : true
                                });
                            } else if(record.data.type == 'FLASH' || record.data.type == 'VIDEO' || record.data.type == 'AUDIO') {
                                childComponent = Ext.create('MyApp.view.ContentFlashView', {
                                    itemId : parentTab.itemId + '-content-' + record.data.id,
                                    title : record.data.name,
                                    closable : true
                                });
                            }

                            parentTab.add(childComponent);
                        }
                        if(parentTab.down('#' + parentTab.itemId + '-content-' + record.data.id)) {
                            parentTab.getLayout().setActiveItem(parentTab.itemId + '-content-' + record.data.id);
                        }

                        childComponent.loadRecord(record);
                        childComponent.doLayout();
                        parentTab.doLayout();
                    } else {
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
                            html : lang.failure.contentPermission
                        }).show();
                    }
                }
            }]
        });
        menu.showAt(e.xy);
    },
    onTopicRightClick : function(view, node, group, e, opts) {
        e.preventDefault();
        x = e.browserEvent.clientX;
        y = e.browserEvent.clientY;
        // var menu = new PG.view.MenuRight();
        // menu.showAt([x, y]);

        // if you want create a menu  in here instead of add
        //menu in the view folder, you can use following code

        e.stopEvent();
        var topicStore = view.getStore();
        var index = topicStore.find("topicName", group);
        var recordArr = topicStore.getRange(index, index), record = recordArr[0];

        // console.log(view.getSelectedModel());
        // console.log(view.getSelectedNodes());
        var o = Ext.ComponentQuery.query('contentgridview'), grid = o[0];
        var permission = record.raw.permission;
        var menu = Ext.create('Ext.menu.Menu', {
            items : []
        });

        if(grid.coursePermission.update == true || permission.update == true) {
            menu.add({
                text : lang.edittopic,
                iconCls : 'edit-button',
                itemId : 'edit-topic',
                scope : this,
                handler : function() {
                    var data = record.data;
                    var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');
                    if(!currCon[0].down('[itemId=ws-add-topic]')) {
                        currCon[0].add(Ext.create('MyApp.view.AddTopicView', {
                            itemId : 'ws-add-topic'
                        }));
                    }
                    currCon[0].down('[itemId=ws-add-topic]').setTitle('Edit - Topic');
                    var parentField = Ext.ComponentQuery.query('#ws-add-topic textfield[name="name"]');
                    parentField[0].setValue(data.topicName);
                    parentField = Ext.ComponentQuery.query('#ws-add-topic textfield[name="course"]');
                    parentField[0].setValue(data.course_name);
                    parentField = Ext.ComponentQuery.query('#ws-add-topic ckeditor[name="description"]');
                    parentField[0].setValue(data.topicDescription);
                    parentField = Ext.ComponentQuery.query('#ws-add-topic hidden[name="course_id"]');
                    parentField[0].setValue(data.course_id);
                    parentField = Ext.ComponentQuery.query('#ws-add-topic hidden[name="id"]');
                    parentField[0].setValue(data.topic_id);
                    currCon[0].getLayout().setActiveItem('ws-add-topic');
                    this.createNotification("right click", "course " + record.get('name'), 'information', 't');
                }
            });
        } else {
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
                html : lang.failure.contentUpdate
            }).show();
        }
        if(grid.coursePermission['delete'] == true || permission['delete'] == true) {
            menu.add({
                text : lang.deletetopic,
                iconCls : 'delete-button',
                scope : this,
                handler : function() {
                    Ext.Ajax.request({
                        url : 'data/Delete.php',
                        method : 'post',
                        params : {
                            "id" : record.data.topic_id,
                            "module" : "topic"
                        },
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
                                html : lang.failure.deleteCategory
                            }).show();
                        },
                        success : function(response) {
                            window.msg = Ext.decode(response.responseText);
                            if(window.msg.success == false) {
                                this.createNotification("Error", "Empty Topic alone can be deleted", 'error', 't');
                            } else {
                                var treeInstanceArr = Ext.ComponentQuery.query('contentgridview');
                                treeInstanceArr[0].getStore().load();
                                //var selModel = treeInstanceArr[0].getSelectionModel();
                                //var node = selModel.getLastSelected();

                                this.createNotification("Success", record.data.name + " successfully deleted", 'information', 't');
                            }
                        }
                    });
                }
            });
        } else {
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
                html : lang.failure.contentDelete
            }).show();
        }
        menu.showAt(e.xy);

    },
    addForum : function(me, e, opts) {
        var treeInstanceArr = Ext.ComponentQuery.query('categorytreeview');
        var recordArr = treeInstanceArr[0].getSelectionModel().selected.items;

        var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');

        if(recordArr.length > 0) {
            Ext.Array.each(recordArr, function(record) {
                var data = record.data;

                if(data.leaf) {
                    if(!currCon[0].down('[itemId=ws-add-forumTopic]')) {
                        currCon[0].add(Ext.create('MyApp.view.AddForumTopicView', {
                            itemId : 'ws-add-forumTopic'
                        }));
                    }

                    var parentField = Ext.ComponentQuery.query('#ws-add-forumTopic form textfield[name="course"]');
                    parentField[0].setValue(data.name);
                    parentField = Ext.ComponentQuery.query('#ws-add-forumTopic form hidden[name="course_id"]');
                    parentField[0].setValue(data.id);
                    parentField = Ext.ComponentQuery.query('#ws-add-forumTopic hidden[name="id"]');
                    parentField[0].setValue('new');
                    currCon[0].getLayout().setActiveItem('ws-add-forumTopic');

                }
            });
        }
    },

    replyForum : function(me, e, opts) {
        var appArr = Ext.ComponentQuery.query('workspaceview container[region="center"]');
        var appViewInstance = appArr[0];
        appViewInstance.getLayout().setActiveItem('reply-forum-view');
        var o = Ext.ComponentQuery.query('forumthreadview #forumThread'), thread = o[0];
        var record = thread.ownerCt.SelectedRecord.data;
        var parentField = Ext.ComponentQuery.query('#reply-forum-view form textfield[name="forum"]');
        parentField[0].setValue(record.name);
        var parentField = Ext.ComponentQuery.query('#reply-forum-view form hidden[name="course_id"]');
        parentField[0].setValue(record.course_id);
        var parentField = Ext.ComponentQuery.query('#reply-forum-view form hidden[name="topic_id"]');
        parentField[0].setValue(record.id);

    },

    onForumTopicSelectionChange : function(model, selectedModel, opts) {
        Ext.Array.each(selectedModel, function(record, index, instance) {
            var data = record.data;

            //var menuTpl = new Ext.XTemplate(['<div class="databox"><ul>', '<li><div>{name}</div></li>', '<li><div>{description}</div></li>', '</ul></div>']);
            var o = Ext.ComponentQuery.query("#forumcontent"), pane = o[0];
            //console.log(pane.store);
            pane.store.proxy.extraParams.parent = data.course_id;
            pane.store.load();
        // console.log(pane.tpl, pane.body, pane.tpl.overwrite);
        //
        // pane.tpl.overwrite(pane.body, data);
        //pane.tpl.overwrite(pane.body, record.data);
        /*
			pane.store.proxy.extraParams.parent = record.data.id;
			pane.store.load();
			var load = pane.getStore();
			*/
        //console.log(load);

        /*
			 descpanel.setTitle(record.data.name);
			 reg = new RegExp("\\s");
			 result = re	g.exec(record.data.text);
			 if(!result) {
			 record.data.text = Base64.decode(record.data.text);
			 }

			 descpanel.expand();*/
        });

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
