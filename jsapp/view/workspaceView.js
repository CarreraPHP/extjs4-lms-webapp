/*
* File: jsapp/view/ui/workspaceView.js
*/
//Ext.require('Ext.chart.*');

Ext.define('MyApp.view.workspaceView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.workspaceview',
    mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
    requires : ['MyApp.view.CategoryTreeView'],
    layout : {
        type : 'border'
    },
    border : false,
    initComponent : function() {
        var me = this;
        Ext.applyIf(me, {
            items : [{
                xtype : 'container',
                itemId : 'wkview-container',
                layout : 'card',
                region : 'center',
                border : false,
                activeItem : 'content-panel',
                items : [{
                    xtype : 'tabpanel',
                    itemId : 'content-panel',
                    tabPosition : 'bottom',
                    border : false,
                    activeCard : 'home-screen',
                    items : [{
                        xtype : 'tabpanel',
                        itemId : 'home-screen',
                        border : false,
                        title : 'Home',
                        items : [{
                            xtype: 'homescreenview',
                            itemId: 'home-screen-card'
                        }]
                    }]
                }, {
                    xtype : 'addcategoryview'
                }, {
                    xtype : 'addcourseview'
                }, {
                    xtype : 'addtopicview',
                    itemId : 'ws-add-topic'
                },{
                	xtype : 'courseaccessview',
                	itemId : 'course-access-view'
                },{
                	xtype : 'contentfullscreenview',
                	itemId : 'content-fullscreen-view'
                },{
                	xtype : 'forumthreadview',
                	itemId : 'forum-thread-view'
                },{
                	xtype : 'replyforumview',
                	itemId : 'reply-forum-view'
                }]
            }, {
                xtype : 'tabpanel',
                width : 250,
                collapsible : true,
                frameHeader : false,
                headerPosition : 'left',
                hideCollapseTool : true,
                preventHeader : true,
                activeTab : 0,
                region : 'west',
                split : true,
                items : [Ext.create('MyApp.view.CategoryTreeView', {
                    // store : 'categoryTreeStore'
                    store : Ext.create('MyApp.store.categoryTreeStore', {
                    	autoLoad: false
                    })
                }), {
                    xtype : 'panel',
                    layout : {
                        type : 'fit'
                    },
                    title : lang.allcourses,
                    items : [{
                        xtype : 'dataview',
                        itemId : 'allcoursedataview',
                        tpl : ['<tpl for=".">', '<div class="product">{name}</div>', '</tpl>'],
                        emptyText : 'No Course available to you',
                        itemSelector : '.product',
                        singleSelect : true,
                        store : Ext.create('MyApp.store.courseStore')
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});
