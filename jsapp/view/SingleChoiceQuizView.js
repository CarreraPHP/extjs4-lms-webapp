/*
 * File: jsapp/view/ui/CategoryTreeView.js
 * something
 */
Ext.define('MyApp.view.SingleChoiceQuizView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.singlechoiceview',
    autoScroll : true,
    border : true,
    frame : false,
    url : 'data/SaveForm.php',
    standardSubmit : true,
    bodyPadding : 5,
    SelectedData : {},
    data : {},
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items : [],
            dockedItems : [{
                xtype : 'toolbar',
                dock : 'bottom',
                items : [{
                    xtype : 'button',
                    itemId : 'Leave-Quiz',
                    iconCls : 'leave-quiz',
                    text : 'Leave this quiz'
                }, {
                    xtype : 'tbfill'
                }, {
                    xtype : 'button',
                    itemId : 'prev-button',
                    iconCls : 'prev-button',
                    text : 'Previous'
                                        
                }, {
                    xtype : 'tbseparator'
                }, {
                    xtype : 'button',
                    itemId : 'next-button',
                    iconCls : 'next-button',
                    text : 'Next',
                    disabled : true,
                    formBind : true
                }, {
                    xtype : 'tbseparator'
                }]
            }]
        });

        me.callParent(arguments);
    }
});
