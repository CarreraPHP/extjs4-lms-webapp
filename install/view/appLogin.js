Ext.define('AL.view.appLogin', {
    extend : 'Ext.container.Viewport',
    alias : 'widget.applogin',
    /*mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},*/
    requires : ['AL.view.appLoginView'],
    padding : 5,
    layout : {
        type : 'vbox',
        align: 'stretch'
    },

    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items : [{
                xtype: 'container',
                html: ['<h1 style="font-size:36px;">Sabre LMS</h1>',
                '<h1 style="font-size:36px;">Sabre LMS</h1>',
                '<h1 style="font-size:36px;">Sabre LMS</h1>',
                '<h1 style="font-size:36px;">Sabre LMS</h1>'].join('<br/>')
            },
            {
                xtype : 'panel',
                itemId : 'app-login',
                activeItem : 'app-login-view-card',
                flex: 1,
                layout : {
                    type : 'card'
                },  
                dockedItems:[{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                        xtype: 'button',
                        text: 'ch',
                        handler: function(){
                            alert("Hi....");                                    
                        }
                    }]
                }],
                items : [{
                    xtype : 'apploginview',                    
                    itemId : 'app-login-view-card'                                        
                }]
            }]
        });

        me.callParent(arguments);
    }
});