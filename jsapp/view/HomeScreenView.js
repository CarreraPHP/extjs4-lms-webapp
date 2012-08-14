Ext.define('MyApp.view.HomeScreenView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.homescreenview',
    mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
    title : 'Home Screen',
    requires: [
    'MyApp.view.dBoardColumnComponent',
    'MyApp.view.dBoardPortletComponent',
    'MyApp.view.dBoardComponent'
    ],
    itemId : 'cou1',
    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Working...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },
    onPortletClose: function(portlet) {
        this.createNotification('close ', '"' + portlet.title + '" was removed', 'information', 't');
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
    },
    border: false,
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'dboard',
                border: false,
                items : [{
                    colspan: 2,
                    items: [{
                        title : lang.welcome,                        
                        tools: this.getTools(),
                        items: {
                            html : '<div class="x-welcome-note">' +
                        '<div><p><b>Sabre lms</b>,</p></div>' +
                        '<div><p>Welcome to Sabre Learning Management System. A tool to optimize learning methodolody by optimizing the methods of teaching. Sabre emphazises on "learning online", "No kid left over" concepts that are now key focus area of innovative educational systems.</p></div>' + 
                        '<div><p><b><i>So, What does Sabre have to do with institutions and corporates?</i></b></p></div>' +
                        '<div><p>Well, Sabre has can act as a respository for data that was once rubbered from our black boards. Yes, Sabre is and can be a replacement for White/Black board, Marker/Chalk, Presentations, OHB and many more that weren\'t persistance with the trainee or the trainer himself. Sabre makes learning material presistant and available forever.</p></div>' +
                        '</div>'
                        },
                        listeners: {
                            'close': Ext.bind(this.onPortletClose, this)
                        }
                    },{
                        id: 'portlet-3',
                        title: 'Portlet 3',
                        tools: this.getTools(),
                        html: '<div class="portlet-content">'+ '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, '+
                        'porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, '+
                        'lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis '+
                        'vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>'+
                        'Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing '+
                        'eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt '+
                        'diam nec urna. Curabitur velit. Lorem ipsum dolor sit amet.</p>' +'</div>',
                        listeners: {
                            'close': Ext.bind(this.onPortletClose, this)
                        }
                    }]
                },{
                    items: [{
                        title: 'profile',
                        tools: this.getTools(),
                        items: [{
                            xtype: 'propertygrid',
                            itemId: 'user-profile-grid',
                            height: 300,
                            source: {}   
                        }],
                        listeners: {
                            'close': Ext.bind(this.onPortletClose, this)
                        }
                    }]
                }]
            }]
        });

        me.callParent(arguments);
		
        me.addEvents({
            validatedrop : true,
            beforedragover : true,
            dragover : true,
            beforedrop : true,
            drop : true
        });
        me.on('drop', this.doLayout, this);
    }
});
