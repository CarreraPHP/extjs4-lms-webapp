Ext.define('AL.view.appLoginView', {
    extend : 'Ext.container.Container',
    alias : 'widget.apploginview',

    layout : {
        type : 'vbox',
        align : 'stretch'
    },

    padding : 5,
    border : false,
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items : [{
                xtype: 'container',
                html: 'Content about this step....'
            },{
                xtype : 'container',
                itemId : 'alview-container',
                layout : 'card',
                region : 'center',
                border : false,
                activeItem : 'config-db',
                items : [{
                    xtype : 'form',
                    itemId : 'config-db',
                    autoScroll : true,
                    bodyPadding : 10,
                    title : 'Configure Database',
                    items : [{
                        xtype : 'textfield',
                        fieldLabel : 'Host Name',
                        labelWidth : 70,
                        anchor : '100%',
                        name : 'hostname',
                        allowBlank : false
                    }, {
                        xtype : 'textfield',
                        fieldLabel : 'User Name',
                        labelWidth : 70,
                        anchor : '100%',
                        name : 'username',
                        allowBlank : false
                    }, {
                        xtype : 'textfield',
                        inputType : 'password',
                        fieldLabel : 'Password',
                        anchor : '100%',
                        name : 'password',
                        labelWidth : 70,
                        allowBlank : false
                    }, {
                        xtype : 'textfield',
                        fieldLabel : 'DB Name',
                        labelWidth : 70,
                        anchor : '100%',
                        name : 'dbname',
                        allowBlank : false
                    },{
                        xtype : 'hidden',
                        name : 'module',
                        value : 'db_config'
                    },{
                        xtype : 'container',
                        bodyPadding: 5,
                        weight: 1,
                        html: '<i>Note: The DB Name filed...</i>'
                    }],
                    dockedItems : [{
                        xtype : 'toolbar',
                        dock : 'bottom',
                        weight: 0.8,
                        layout : {
                            pack : 'end'
                        },
                        items : [{
                            xtype : 'button',
                            text : 'submit',
                            itemId : 'config-db',
                            disabled : true,
							formBind : true
                        }, {
                            xtype : 'button',
                            text : 'cancel',
                            type : 'reset',
                            handler : function() {
								this.up('form').getForm().reset();
							}

                        }]
                    }]
                }]
            }],
            dockedItems : [{
                xtype : 'container',
                height : 50,
                region : 'north',
                html : 'Sabre LMS'

            }]
        });

        me.callParent(arguments);
    }
});
