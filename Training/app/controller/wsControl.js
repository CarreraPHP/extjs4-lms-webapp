/*
 * File: MyApp/controller/wsControl.js
 */
Ext.define('App.controller.wsControl', {
    extend : 'Ext.app.Controller',
    models : ['CatalogTreeModel'],
    stores : ['CatalogTreeStore'],
    views : ['workspaceView', 'DayOneView'],
    refs:[{
        ref : 'panel',
        selector : 'workspaceview'
    },{
        ref: 'iframePage',
        selector: 'workspaceview #dataDisplay'
    },{
        ref: 'htmlSourcePage',
        selector: 'workspaceview #htmlSource'
    },{
        ref: 'jsSourcePage',
        selector: 'workspaceview #jsSource'
    },{
        ref: 'phpSourcePage',
        selector: 'workspaceview #phpSource'
    }],
    init : function() {

        this.control({
            'abviewport #tree-Panel' : {
                select : this.OnTreeSelect
            },
            'workspaceview #view-demo' : {
                toggle : this.borderLayoutSource
            },
            'workspaceview #view-html' : {
                toggle : this.borderLayoutSource
            },
            'workspaceview #view-js' : {
                toggle : this.borderLayoutSource
            },
            'workspaceview #view-php' : {
                toggle : this.borderLayoutSource
            }
            
        });
    },
    OnTreeSelect : function(me, record, index, opts){
        var panel = this.getPanel();
        var iframeUrl = "";
				
        iframeUrl += (record.data.parent.indexOf(" ") != -1) 
        ? record.data.parent.replace(/ /g, "/") + "/" 
        : record.data.parent + "/";
				
        iframeUrl += (record.data.name.indexOf(" ") != -1)
        ? record.data.name.replace(/ /g, "_") + "/"
        : record.data.name + "/";
        
        this.getIframePage().el.dom.src = "example.php?source=" + iframeUrl + "index.html";
        this.getHtmlSourcePage().el.dom.src = "source.php?source=" + iframeUrl + "index.html&type=html";
        this.getJsSourcePage().el.dom.src = "source.php?source=" + iframeUrl + "app.js&type=js";
        this.getPhpSourcePage().el.dom.src = "source.php?source=" + iframeUrl + "data.php&type=php";
    },
    borderLayoutSource : function(me, pressed, opts){
        var panel = this.getPanel();        
        if(me.pressed){
            switch(me.text){
                case 'html':
                    panel.getLayout().setActiveItem('htmlSource');
                    break;
                case 'js':
                    panel.getLayout().setActiveItem('jsSource');
                    break;
                case 'php':
                    panel.getLayout().setActiveItem('phpSource');
                    break;
                case 'demo':
                    panel.getLayout().setActiveItem('dataDisplay');
                    break;
            }
            Ext.each(me.up('toolbar').query('button'), function(cur){
                if(cur != me){
                    cur.toggle(false, true); 
                }
            });
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